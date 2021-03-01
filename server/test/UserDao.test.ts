import mongoose, { Mongoose } from 'mongoose';
import { UserDao } from '@src/daos';
import { User } from '@src/models';

describe('UserDao', () => {
  let connection: Mongoose;

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('gets a list of users', async () => {
    const userDao = new UserDao();
    const mockUser = { username: 'User1', password: 'passworddd' };

    await User.create(mockUser);
    const result = await userDao.getUsers();

    expect(result[0].username).toEqual(mockUser.username);
    expect(result[0].password).toEqual(mockUser.password);
  });

  it('gets user by username and password', async () => {
    const userDao = new UserDao();
    const mockUser = { username: 'User2', password: 'passworddd' };

    await User.create(mockUser);
    const result = await userDao.getUser(mockUser);

    expect(result?.username).toEqual(mockUser.username);
    expect(result?.password).toEqual(mockUser.password);
  });

  it('gets creates a new user', async () => {
    const userDao = new UserDao();
    const mockUser = { username: 'User3', password: 'passworddd' };

    const result = await userDao.createUser(mockUser);

    expect(result?.username).toEqual(mockUser.username);
    expect(result?.password).toEqual(mockUser.password);
  });
});