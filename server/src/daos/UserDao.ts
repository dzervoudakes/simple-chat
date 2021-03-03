import { User, UserType } from '@src/models';

export class UserDao {
  public async getUsers(): Promise<UserType[]> {
    // exclude passwords from the response ... because security
    const result = await User.find({}, { password: 0 });
    return result;
  }

  public async getUser({ username, password }: UserType): Promise<UserType | null> {
    const result = await User.findOne({ username, password });
    return result;
  }

  public async createUser(user: UserType): Promise<UserType> {
    const result = await User.create(user);
    return result;
  }
}

export default UserDao;
