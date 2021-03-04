import React from 'react';
import noop from 'lodash/noop';
import { renderHook } from '@testing-library/react-hooks';
import { ChatContext } from '@src/context';
import { useChat } from '..';

describe('useChat', () => {
  const message = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message'
  };

  const user = {
    username: 'test',
    _id: '12345'
  };

  const TestComponent: React.FC = ({ children }) => (
    <ChatContext.Provider
      value={{
        channels: ['general'],
        chat: { general: [message] },
        updateChat: noop,
        users: [user]
      }}
    >
      {children}
    </ChatContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useChat('general'), { wrapper: TestComponent });
    const { channels, messages, users } = result.current;

    expect(channels?.[0]).toBe('general');
    expect(messages[0].text).toBe('i am a message');
    expect(users?.[0].username).toBe('test');
  });
});
