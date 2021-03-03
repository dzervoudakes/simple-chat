import mongoose, { Mongoose } from 'mongoose';
import { MessageDao } from '@src/daos';
import { Message, MessageType } from '@src/models';

describe('MessageDao', () => {
  let connection: Mongoose;

  const mockMessage: MessageType = {
    username: 'testuser',
    userId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message'
  };

  beforeAll(async () => {
    connection = await mongoose.connect(process.env.MONGO_URL || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it('gets a list of messages', async () => {
    const messageDao = new MessageDao();

    await Message.create(mockMessage);
    const result = await messageDao.getMessages();

    expect(result[0].username).toEqual(mockMessage.username);
    expect(result[0].text).toEqual(mockMessage.text);
  });

  it('gets creates a new message', async () => {
    const messageDao = new MessageDao();

    const result = await messageDao.createMessage(mockMessage);

    expect(result?.username).toEqual(mockMessage.username);
    expect(result?.text).toEqual(mockMessage.text);
  });
});
