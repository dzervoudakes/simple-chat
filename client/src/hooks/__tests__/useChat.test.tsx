import React from 'react';
import noop from 'lodash/noop';
import { renderHook } from '@testing-library/react-hooks';
import { ChatContext } from '@src/context';
import { Message } from '@src/types';
import { useChat } from '..';

describe('useChat', () => {
  const message: Message = {
    username: 'test',
    userId: '12345',
    recipient: 'all',
    channel: 'general',
    text: 'i am a message'
  };

  const TestComponent: React.FC = ({ children }) => (
    <ChatContext.Provider value={{ chat: { general: [message] }, updateChat: noop }}>
      {children}
    </ChatContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useChat('general'), { wrapper: TestComponent });
    const { messages } = result.current;

    expect(messages[0].text).toBe('i am a message');
  });
});
