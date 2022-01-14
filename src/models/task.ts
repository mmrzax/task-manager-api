import { Schema, model } from 'mongoose';
import { ITask, ITaskModel } from '../types/interfaces';

const taskSchema = new Schema<ITask, ITaskModel>({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  compeleted: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const taskModel = model<ITask, ITaskModel>('Task', taskSchema);

export default taskModel;
