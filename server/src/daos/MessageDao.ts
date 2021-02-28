import { Message, MessageType } from '@src/models';

export class MessageDao {
  public async getMessages(id?: string): Promise<MessageType[]> {
    // return all messages where the user is either the sender or the recipient of a private message,
    // as well as all public messages
    const result = await Message.find({
      $or: [{ userId: id }, { recipient: id }, { recipient: 'all' }]
    });
    return result;
  }

  public async createMessage(message: MessageType): Promise<MessageType> {
    const result = await Message.create(message);
    return result;
  }
}

export default MessageDao;
