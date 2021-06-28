/**
 * Reusable mock data for unit testing.
 * @packageDocumentation
 */

export const mockUserOne = {
  username: 'username1',
  _id: 'userid1'
};

export const mockUserTwo = {
  username: 'username2',
  _id: 'userid2'
};

export const publicMessage = {
  username: 'test',
  senderId: '12345',
  recipientId: null,
  channel: 'general',
  text: 'i am a message',
  _id: '19283',
  createdAt: '2021-02-28T22:31:02.589Z'
};

export const publicMessageWithoutMeta = {
  ...publicMessage,
  _id: undefined,
  createdAt: undefined
};

export const privateMessage = {
  username: 'test',
  senderId: '12345',
  recipientId: '67890',
  channel: null,
  text: 'i am a private message',
  _id: '31892',
  createdAt: '2021-02-28T22:31:02.589Z'
};

export const privateMessageWithoutMeta = {
  ...privateMessage,
  _id: undefined,
  createdAt: undefined
};

export const mockChannel = {
  name: 'general',
  description: 'test description',
  _id: '11221'
};

export const mockGetChatSuccess = {
  data: {
    channels: [mockChannel],
    chat: { '11221': [publicMessage], '67890': [privateMessage] },
    users: [mockUserOne, mockUserTwo]
  }
};

export const mockGetChatSuccessEmpty = {
  data: {
    channels: [mockChannel],
    chat: {},
    users: []
  }
};
