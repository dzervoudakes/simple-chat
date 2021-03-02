import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from '@src/types';

export class AuthService {
  static generateToken({ data, source, jwt }: ApiRequest<AuthPayload>): ApiResponse {
    return axios.post(`${API_BASE_URL}/auth`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      data
    });
  }
}

export default AuthService;
