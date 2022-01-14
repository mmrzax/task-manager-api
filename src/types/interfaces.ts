import { Model, Document, Types } from 'mongoose';

// User Interface
export interface IUser {
  name: string;
  email: string;
  age: number;
  password: string;
  tokens: {token: string}[];
  avatar?: Buffer,
  tasks?: ITaskDocument;
};

// User Public Profile (sensetive data is optional because we want to delete them before sending to the user)
export interface PublicProfile {
  name: string;
  email: string;
  age: number;
  password?: string;
  tokens?: {token?: string}[];
  avatar?: Buffer,
};

// Instance methods go here
export interface IUserDocument extends IUser, Document {
  genAuthToken: () => Promise<string>;
  getPublicProfile: () => PublicProfile;
};

// Model methods go here (Statics)
export interface IUserModel extends Model<IUserDocument> {
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
};

// Task Interface
export interface ITask {
  description: string,
  compeleted: boolean,
  owner: Types.ObjectId;
};

export interface ITaskDocument extends ITask, Document {
};

export interface ITaskModel extends Model<ITaskDocument> {
};

// JsonWebToken Payload Interface
export interface JwtPayload {
  _id: string;
  iat: number,
  exp: number,
};
