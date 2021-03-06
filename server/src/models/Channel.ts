import { Document, Schema, model } from 'mongoose';

export interface ChannelType {
  name: string;
  description: string;
}

export interface ChannelDocument extends ChannelType, Document {}

export const ChannelSchema = new Schema<ChannelDocument>({
  name: { type: String, required: true, unique: true, maxlength: 30, minlength: 3 },
  description: { type: String, required: true, maxlength: 160, minlength: 8 }
});

export const Channel = model('Channel', ChannelSchema);

export default Channel;
