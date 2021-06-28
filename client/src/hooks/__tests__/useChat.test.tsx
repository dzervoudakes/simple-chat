import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ChatContext } from '@src/context';
import { mockChatContext } from '@src/test';
import { useChat } from '..';

describe('useChat', () => {
  const TestComponent: React.FC = ({ children }) => (
    <ChatContext.Provider value={mockChatContext}>{children}</ChatContext.Provider>
  );

  it('returns the current username', () => {
    const { result } = renderHook(() => useChat('11221'), { wrapper: TestComponent });
    const { channels, loading, error, messages, users } = result.current;

    expect(channels?.[0].name).toBe('general');
    expect(channels?.[0].description).toBe('test description');
    expect(loading).toBe(false);
    expect(error).toBe(false);
    expect(messages[0].text).toBe('i am a message');
    expect(users?.[0].username).toBe('username1');
  });
});
