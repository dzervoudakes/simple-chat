import { Document, Schema, model } from 'mongoose';

export interface UserType {
  username: string;
  password: string;
}

export interface UserDocument extends UserType, Document {}

export const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength: 128, minlength: 8 }
});

export const User = model('User', UserSchema);

export default User;
