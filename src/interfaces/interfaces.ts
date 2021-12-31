import { Model, Document, Types } from 'mongoose';

// User Interface
interface IUser {
  name: string;
  email: string;
  age: number;
  password: string;
  tokens: {token: string}[];
  avatar?: Buffer,
  tasks?: ITaskDocument;
};

// User Public Profile (sensetive data is optional because we want to delete them before sending to the user)
interface PublicProfile {
  name: string;
  email: string;
  age: number;
  password?: string;
  tokens?: {token?: string}[];
  avatar?: Buffer,
};

// Instance methods go here
interface IUserDocument extends IUser, Document {
  genAuthToken: () => Promise<string>;
  getPublicProfile: () => PublicProfile;
};

// Model methods go here (Statics)
interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
};

// JsonWebToken Payload Interface
interface JwtPayload {
  _id: string;
  iat: number,
  exp: number,
};

// Task Interface
interface ITask {
  description: string,
  compeleted: boolean,
  owner: Types.ObjectId;
};

interface ITaskDocument extends ITask, Document {
};

interface ITaskModel extends Model<ITaskDocument> {
};

export {
  IUser,
  IUserDocument,
  IUserModel,
  ITask,
  ITaskDocument,
  ITaskModel,
  PublicProfile,
  JwtPayload,
};
