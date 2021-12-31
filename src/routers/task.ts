import { Router } from 'express';
import { Types } from 'mongoose';
import taskModel from '../models/task';
import auth from '../middleware/auth';

const router = Router();

// Create a new task
router.post('/tasks', auth, async (req, res) => {
  const task = new taskModel({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  try {
    //const tasks = await taskModel.find({ owner: req.user._id });
    const match: { compeleted? : boolean } = {};
    const options: {
      limit?: number,
      skip?: number,
      sort?: { [key: string]: number },
    } = {};
    options.sort = {};
    if (req.query.compeleted) {
      match.compeleted = req.query.compeleted === 'true';
    }
    if (typeof req.query.limit === 'string') {
      options.limit = parseInt(req.query.limit);
    }
    if (typeof req.query.skip === 'string') {
      options.skip = parseInt(req.query.skip);
    }
    if (typeof req.query.sortBy === 'string') {
      const queryParts = req.query.sortBy.split(':'); // [ 'createdAt', '1' ]
      options.sort[queryParts[0]] = queryParts[1] === 'desc' ? -1 : 1;
    }
    await req.user.populate({
      path: 'tasks',
      match,
      options,
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// Fetch a Task by Task ID
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// Update a User Task By Task ID
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'compeleted'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid Updates!' });
  }
  try {
    const task: { [key: string]: any } | null = await taskModel.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => task[update] = req.body[update]);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

// Delete a User Task By Task ID
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    //const task = await taskModel.findByIdAndDelete(req.params.id);
    const task = await taskModel.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
