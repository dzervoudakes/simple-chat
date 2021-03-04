import { Channel, ChannelType } from '@src/models';

export class ChannelDao {
  public async getChannels(): Promise<ChannelType[]> {
    const result = await Channel.find({});
    return result;
  }
}

export default ChannelDao;
