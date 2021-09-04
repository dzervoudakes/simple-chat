import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatContext } from '@src/context';
import { mockChatContext } from '@src/test';
import Skeleton from '..';

describe('Skeleton', () => {
  const text = 'hi there';
  const TestComponent: React.FC = () => {
    const [loading, setLoading] = useState(true);

    return (
      <ChatContext.Provider value={{ ...mockChatContext, loading }}>
        <Skeleton>{text}</Skeleton>
        <button
          type="button"
          onClick={() => {
            setLoading(false);
          }}
        >
          click me
        </button>
      </ChatContext.Provider>
    );
  };

  it('renders children when no longer loading', () => {
    render(<TestComponent />);

    expect(screen.queryByText(text)).toBeNull();

    fireEvent.click(screen.getByText('click me'));
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
