import { Schema, model } from 'mongoose';

export interface UserType {
  username: string;
  password: string;
}

export const UserSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true, maxlength: 30, minlength: 8 },
  password: { type: String, required: true, maxlength: 30, minlength: 8 }
});

export const User = model('User', UserSchema);

export default User;
