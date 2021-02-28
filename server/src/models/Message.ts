import { Document, Schema, model } from 'mongoose';

export type Room = 'general' | 'work' | 'random';

export interface MessageType {
  username: string;
  userId: string;
  recipient: string | 'all';
  room: Room | null;
  text: string;
}

export interface MessageDocument extends MessageType, Document {}

export const MessageSchema = new Schema<MessageDocument>(
  {
    username: { type: String, required: true },
    userId: { type: String, required: true },
    recipient: { type: String, required: false, default: 'all' },
    room: {
      type: String,
      required: false,
      default: null,
      enum: ['general', 'work', 'random', null]
    },
    text: { type: String, required: true }
  },
  { timestamps: {} }
);

export const Message = model('Message', MessageSchema);

export default Message;
