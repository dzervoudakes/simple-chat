import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from './types';

export class AuthService {
  static generateToken({
    data,
    source
  }: Omit<ApiRequest<AuthPayload>, 'jwt'>): ApiResponse {
    return axios.post(`${API_BASE_URL}/auth`, {
      cancelToken: source.token,
      data
    });
  }
}

export default AuthService;
