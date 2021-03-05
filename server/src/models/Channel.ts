import { Document, Schema, model } from 'mongoose';

export interface ChannelType {
  name: string;
  description: string;
}

export interface ChannelDocument extends ChannelType, Document {}

export const ChannelSchema = new Schema<ChannelDocument>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true }
});

export const Channel = model('Channel', ChannelSchema);

export default Channel;
