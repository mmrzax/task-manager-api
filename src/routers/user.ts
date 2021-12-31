import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import userModel from '../models/user';
import auth from '../middleware/auth';
// Import JS Modules
//const sendWelcomeEmail = require('../emails/welcome');
//const sendCancelationEmail = require('../emails/cancelation');

const router = Router();

// Signup User
router.post('/users', async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    //sendWelcomeEmail(user.email, user.name);
    const token = await user.genAuthToken();
    res.status(201).cookie('auth_token', token);
    //res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
router.post('/users/login', async (req, res) => {
  const credentials = Object.keys(req.body);
  const allowedCredentials = ['email', 'password'];
  const isValidOperation = credentials.every((credential) =>
    allowedCredentials.includes(credential),
  );
  if (
    !isValidOperation ||
    credentials.length !== allowedCredentials.length
  ) {
    return res.status(400).send('Unable to login');
  }
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.genAuthToken();
    res.cookie('auth_token', token);
    //res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// Logout User
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Logout all sessions from a User
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Fetch User Profile
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// Update User Profile
router.patch('/users/me',auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }
  try {
    const user: { [key: string]: any } = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// Delete User Profile
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    //sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

// Upload User Avatar
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Format must be jpg, jpeg or png'));
    }
    callback(null, true);
  },
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req: Request, res: Response) => {
  const buffer = await sharp(req.file?.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send();
}, (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send({ error: error.message });
});

// Delete User Avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Fetch User Avatar
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

export default router;
