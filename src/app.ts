import './db/mongoose';
import express from 'express';
import userRouter from './routers/user';
import taskRouter from './routers/task';

const app = express();

// Middlewares
app.use(express.json()); // Auto Parse Incoming JSON to JS Object

app.use(userRouter);
app.use(taskRouter);

export default app;
