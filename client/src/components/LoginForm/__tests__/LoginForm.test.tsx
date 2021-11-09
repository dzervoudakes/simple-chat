import { render, fireEvent, screen, waitFor } from '@testing-library/react';
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

  interface TestComponentProps {
    isSignUp?: boolean;
  }

  const TestComponent: React.FC<TestComponentProps> = ({ isSignUp = false }) => (
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
    render(<TestComponent />);

    expect(screen.getByPlaceholderText('NewUser123')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ilovesecurity123')).toBeInTheDocument();
  });

  it('calls the auth service to generate a token', async () => {
    const spy = jest.spyOn(AuthService, 'generateToken');
    render(<TestComponent />);

    fireEvent.change(screen.getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(screen.getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { username: 'TestUser', password: 'TestPassword' }
        })
      );
      expect(mockHistoryPush).toHaveBeenCalledWith('/channels');
    });
  });

  it('calls the user service to create a new user', async () => {
    const spy = jest.spyOn(UserService, 'createUser');
    render(<TestComponent isSignUp />);

    fireEvent.change(screen.getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(screen.getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { username: 'TestUser', password: 'TestPassword' }
        })
      );
      expect(mockHistoryPush).toHaveBeenCalledWith('/channels');
    });
  });

  it('displays error messaging for empty fields', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(screen.getByText('Please enter your username.')).toBeInTheDocument();
      expect(screen.getByText('Please enter your password.')).toBeInTheDocument();
    });
  });

  it('displays error messaging for invalid fields', async () => {
    render(<TestComponent />);

    fireEvent.change(screen.getByPlaceholderText('NewUser123'), {
      target: { value: 'user' }
    });
    fireEvent.change(screen.getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'pw' }
    });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(
        screen.getByText('Username must be between 8 and 30 characters.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must be between 8 and 30 characters.')
      ).toBeInTheDocument();
    });
  });

  it('displays error messaging for API errors', async () => {
    AuthService.generateToken = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: { error: 'Invalid credentials.' } } });
    render(<TestComponent />);

    fireEvent.change(screen.getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(screen.getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
    });
  });

  it('displays error messaging for duplicate username', async () => {
    AuthService.generateToken = jest
      .fn()
      .mockRejectedValueOnce({ response: { data: { error: 'E11000 username' } } });
    render(<TestComponent />);

    fireEvent.change(screen.getByPlaceholderText('NewUser123'), {
      target: { value: 'TestUser' }
    });
    fireEvent.change(screen.getByPlaceholderText('ilovesecurity123'), {
      target: { value: 'TestPassword' }
    });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(screen.getByText('Username already exists.')).toBeInTheDocument();
    });
  });
});
