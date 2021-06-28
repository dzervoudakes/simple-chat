/**
 * Reusable mock data for unit testing.
 * @packageDocumentation
 */

/**
 * Mock user data.
 */
export const mockUserOne = {
  username: 'username1',
  _id: 'userid1'
};

export const mockUserTwo = {
  username: 'username2',
  _id: 'userid2'
};

/**
 * Mock message data, with and without metadata from the database.
 */
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

/**
 * Mock channel data.
 */
export const mockChannel = {
  name: 'general',
  description: 'test description',
  _id: '11221'
};

/**
 * Mock chat orchestration.
 */
export const mockChat = { 11221: [publicMessage], 67890: [privateMessage] };

/**
 * Mock api responses.
 */
export const mockGetChatSuccess = {
  data: {
    channels: [mockChannel],
    chat: mockChat,
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

/**
 * Mock context.
 */
export const mockAuthContext = {
  user: { username: 'test', id: '12345', jwt: 'jwt' },
  setUser: jest.fn()
};

export const mockChatContext = {
  channels: [mockChannel],
  chat: mockChat,
  chatDispatch: jest.fn(),
  loading: false,
  error: false,
  users: [mockUserOne]
};
