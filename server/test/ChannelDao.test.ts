import mongoose, { Mongoose } from 'mongoose';

import { ChannelDao } from '@src/daos';
import { Channel, ChannelType } from '@src/models';

describe('ChannelDao', () => {
  let connection: Mongoose;

  const mockChannel: ChannelType = {
    name: 'channel name',
    description: 'channel description'
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

  it('gets a list of channels', async () => {
    const channelDao = new ChannelDao();

    await Channel.create(mockChannel);
    const result = await channelDao.getChannels();

    expect(result[0].name).toEqual(mockChannel.name);
    expect(result[0].description).toEqual(mockChannel.description);
  });
});
