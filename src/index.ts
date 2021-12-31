// To-Do 
// 1-Add support for sending Welcome and Goodbye email to user
// 2-Write a Front-end for this app


import './db/mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routers/user';
import taskRouter from './routers/task';

const app = express();
const port = process.env.PORT;

const publicDirectory = path.join(__dirname, './public');

// Middlewares
app.use(express.static(publicDirectory)); // Render Static Files
app.use(express.json()); // Auto Parse Incoming JSON to JS Object
app.use(express.urlencoded({ extended: false })); // Parses data sent via forms from the Frontend
app.use(cookieParser());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is Up on Port ${port}`);
});
