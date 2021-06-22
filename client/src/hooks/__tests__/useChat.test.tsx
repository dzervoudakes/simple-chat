import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ChatContext } from '@src/context';
import { useChat } from '..';

describe('useChat', () => {
  const message = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message',
    _id: '67890',
    createdAt: '2021-02-28T22:31:02.589Z'
  };

  const user = {
    username: 'test',
    _id: '12345'
  };

  const TestComponent: React.FC = ({ children }) => (
    <ChatContext.Provider
      value={{
        channels: [{ name: 'general', _id: '12345' }],
        chat: { general: [message] },
        chatDispatch: jest.fn(),
        loading: false,
        error: false,
        users: [user]
      }}
    >
      {children}
    </ChatContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useChat('general'), { wrapper: TestComponent });
    const { channels, loading, error, messages, users } = result.current;

    expect(channels?.[0].name).toBe('general');
    expect(loading).toBe(false);
    expect(error).toBe(false);
    expect(messages[0].text).toBe('i am a message');
    expect(users?.[0].username).toBe('test');
  });
});
