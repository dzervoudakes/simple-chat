import { Schema, model } from 'mongoose';

export interface MessageType {
  username: string;
  senderId: string;
  recipientId: string | null;
  channel: string | null;
  text: string;
}

export const MessageSchema = new Schema<MessageType>(
  {
    username: { type: String, required: true },
    senderId: { type: String, required: true },
    recipientId: { type: String, required: false, default: null },
    channel: { type: String, required: false, default: null },
    text: { type: String, required: true }
  },
  { timestamps: {} }
);

export const Message = model('Message', MessageSchema);

export default Message;
