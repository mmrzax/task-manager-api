import { Types, connection } from 'mongoose';
import { sign } from 'jsonwebtoken';
import userModel from '../../models/user';
import taskModel from '../../models/task';

const userOneId = new Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'John',
  email: 'john@example.com',
  password: '12345678',
  tokens: [{
    token: sign({ _id: userOneId }, process.env.JWT_SECRET!),
  }],
};

const userTwoId = new Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Milad',
  email: 'milad@example.com',
  password: '12345678',
  tokens: [{
    token: sign({ _id: userTwoId }, process.env.JWT_SECRET!),
  }],
};

const taskOne = {
  _id: new Types.ObjectId(),
  description: 'first task',
  compeleted: false,
  owner: userOne._id,
};

const taskTwo = {
  _id: new Types.ObjectId(),
  description: 'second task',
  compeleted: true,
  owner: userOne._id,
};

const taskThree = {
  _id: new Types.ObjectId(),
  description: 'third task',
  compeleted: true,
  owner: userTwo._id,
};

const configDatabase = async () => {
  await userModel.deleteMany();
  await taskModel.deleteMany();
  await new userModel(userOne).save();
  await new userModel(userTwo).save();
  await new taskModel(taskOne).save();
  await new taskModel(taskTwo).save();
  await new taskModel(taskThree).save();
};

const closeDatabase = () => {
  connection.close();
};

export {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  configDatabase,
  closeDatabase,
};
