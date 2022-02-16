import request from 'supertest';
import app from '../app';
import userModel from '../models/user';
import { userOneId, userOne, configDatabase, closeDatabase } from './fixtures/db';

beforeEach(configDatabase);
afterAll(closeDatabase);

// Test Create User
test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'mmrza',
      email: 'mmrza@example.com',
      password: '20212022'
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await userModel.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'mmrza',
      email: 'mmrza@example.com'
    },
    token: user?.tokens[0].token,
  });
  expect(response.body.user.password).not.toBe('20212022');
});


// Test Login User
test('Should login existing user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Assert that the database was changed correctly
  const user = await userModel.findById(response.body.user._id);
  expect(response.body.token).toBe(user?.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: 'incorrectpass',
    })
    .expect(400);
});


// Test Get Profile
test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});


// Test Delete User
test('Should Delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  
  // Assert that the database was changed correctly
  const user = await userModel.findById(userOne._id);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

// Test Upload avatar image
test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'src/tests/fixtures/profile-pic.jpg')
    .expect(200);
  const user = await userModel.findById(userOneId);
  expect(user?.avatar).toEqual(expect.any(Buffer));
});

// Test update user
test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Alex',
    })
    .expect(200);
  const user = await userModel.findById(userOneId);
  expect(user?.name).toEqual('Alex');
});
test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'New York',
    })
    .expect(400);
});
