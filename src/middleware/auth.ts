import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IUserDocument, JwtPayload } from '../interfaces/interfaces';
import userModel from '../models/user';

// Declare Exrpess.Request Interface for using req.user and req.token in auth middleware
declare global {
  namespace Express {
    interface Request {
      user: IUserDocument & { _id: any; };
      token: string;
    }
  }
};

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: string | undefined = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decodedData = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await userModel.findOne({ _id: decodedData._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please Authenticate.' });
  }
};

export default auth;
