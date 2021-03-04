import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Message } from '@src/types';
import { ChatContext, ChatProvider } from '..';

describe('ChatContext', () => {
  const publicMessage: Message = {
    username: 'test',
    senderId: '12345',
    recipientId: null,
    channel: 'general',
    text: 'i am a message'
  };

  const privateMessage: Message = {
    username: 'test',
    senderId: '12345',
    recipientId: '67890',
    channel: null,
    text: 'i am a private message'
  };

  const TestComponent: React.FC = () => (
    <ChatContext.Consumer>
      {({ chat, updateChat }) => (
        <>
          <div>Message: {chat.general?.[0]?.text}</div>
          <div>Message: {chat.general?.[1]?.text}</div>
          <div>Message: {chat['67890']?.[0]?.text}</div>
          <button type="button" onClick={() => updateChat(publicMessage)}>
            update public chat
          </button>
          <button
            type="button"
            onClick={() => updateChat({ ...publicMessage, text: 'i am another message' })}
          >
            update public chat again
          </button>
          <button type="button" onClick={() => updateChat(privateMessage)}>
            update private chat
          </button>
        </>
      )}
    </ChatContext.Consumer>
  );

  const Wrapper: React.FC = () => (
    <ChatProvider>
      <TestComponent />
    </ChatProvider>
  );

  it('updates the current message list for a public channel', () => {
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a message')).toBeNull();
    expect(queryByText('Message: i am another message')).toBeNull();

    fireEvent.click(getByText('update public chat'));
    fireEvent.click(getByText('update public chat again'));

    expect(getByText('Message: i am a message')).toBeInTheDocument();
    expect(getByText('Message: i am another message')).toBeInTheDocument();
  });

  it('updates the current message list for a private conversation', () => {
    const { getByText, queryByText } = render(<Wrapper />);

    expect(queryByText('Message: i am a private message')).toBeNull();

    fireEvent.click(getByText('update private chat'));
    expect(getByText('Message: i am a private message')).toBeInTheDocument();
  });
});
