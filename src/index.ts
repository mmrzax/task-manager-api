import './db/mongoose';
import express from 'express';
import userRouter from './routers/user';
import taskRouter from './routers/task';

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(express.json()); // Auto Parse Incoming JSON to JS Object

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is Up on Port ${port}`);
});
