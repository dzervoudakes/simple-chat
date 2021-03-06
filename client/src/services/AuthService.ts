/**
 * Service class that controls interactions with the '/auth' API.
 * @packageDocumentation
 */
import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from './types';

export class AuthService {
  static generateToken({
    data,
    source
  }: Omit<ApiRequest<AuthPayload>, 'jwt'>): ApiResponse {
    return axios.post(`${API_BASE_URL}/auth`, data, {
      cancelToken: source.token
    });
  }
}

export default AuthService;
