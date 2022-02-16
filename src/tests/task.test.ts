import request from 'supertest';
import app from '../app';
import taskModel from '../models/task';
import {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  configDatabase,
  closeDatabase
} from './fixtures/db';

beforeEach(configDatabase);
afterAll(closeDatabase);

// Test create task
test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'testing ...',
    })
    .expect(201);
  // assert that the new task was saved
  const task = await taskModel.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task?.compeleted).toEqual(false);
});

// Test Get tasks
test('Should fetch user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
    expect(response.body.length).toEqual(2);
});

// Test Delete Tasks
test('Should not delete other users tasks', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
    const task = await taskModel.findById(taskOne._id);
    expect(task).not.toBeNull();
});