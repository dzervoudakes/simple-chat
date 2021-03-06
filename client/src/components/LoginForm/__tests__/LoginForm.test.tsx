import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, WithStylesProvider } from '@src/context';
import { AuthService, UserService } from '@src/services';
import LoginForm from '..';

const mockHistoryPush = jest.fn();

jest.mock('@src/services/AuthService');
jest.mock('@src/services/UserService');
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Record<string, unknown>),
  useHistory: () => ({
    push: mockHistoryPush
  })
}));

jest.mock('axios', () => ({
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn()
    }))
  },
  isCancel: jest.fn().mockImplementation(() => false)
}));

describe('LoginForm', () => {
  const user = { username: 'TestUser', _id: '12345' };
  const token = 'jwt';

  const TestComponent: React.FC<{ isSignUp?: boolean }> = ({ isSignUp = false }) => (
    <MemoryRouter initialEntries={['/']}>
      <WithStylesProvider>
        <AuthProvider>
          <LoginForm isSignUp={isSignUp} />
        </AuthProvider>
      </WithStylesProvider>
    </MemoryRouter>
  );

  beforeEach(() => {
    AuthService.generateToken = jest
      .fn()
      .mockResolvedValueOnce({ data: { user, token } });
    UserService.createUser = jest.fn().mockResolvedValueOnce({ data: { user, token } });
  });

  it('renders', () => {
    const { getByPlaceholderText } = render(<TestComponent />);

    expect(getByPlaceholderText('NewUser123')).toBeInTheDocument();
    expect(getByPlaceholderText('ilovesecurity123')).toBeInTheDocument();
  });

  it('calls the auth service to generate a token', async () => {
    const spy = jest.spyOn(AuthService, 'generateToken');
    const { getByText, getByPlaceholderText } = render(<TestComponent />);

    fireEvent.change(getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(getByText('Log in'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { username: 'TestUser', password: 'TestPassword' }
        })
      );
      expect(mockHistoryPush).toHaveBeenCalledWith('/channels/general');
    });
  });

  it('calls the user service to create a new user', async () => {
    const spy = jest.spyOn(UserService, 'createUser');
    const { getByText, getByPlaceholderText } = render(<TestComponent isSignUp />);

    fireEvent.change(getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(getByText('Sign up'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { username: 'TestUser', password: 'TestPassword' }
        })
      );
      expect(mockHistoryPush).toHaveBeenCalledWith('/channels/general');
    });
  });

  it('displays error messaging for empty fields', async () => {
    const { getByText } = render(<TestComponent />);

    fireEvent.click(getByText('Log in'));

    await waitFor(() => {
      expect(getByText('Please enter your username.')).toBeInTheDocument();
      expect(getByText('Please enter your password.')).toBeInTheDocument();
    });
  });

  it('displays error messaging for invalid fields', async () => {
    const { getByText, getByPlaceholderText } = render(<TestComponent />);

    fireEvent.change(getByPlaceholderText('NewUser123'), {
      target: { value: 'user' }
    });
    fireEvent.change(getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'pw' }
    });
    fireEvent.click(getByText('Log in'));

    await waitFor(() => {
      expect(
        getByText('Username must be between 8 and 30 characters.')
      ).toBeInTheDocument();
      expect(
        getByText('Password must be between 8 and 30 characters.')
      ).toBeInTheDocument();
    });
  });
});
