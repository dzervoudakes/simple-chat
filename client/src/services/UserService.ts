/**
 * Service class that controls interactions with the '/users' API.
 * @packageDocumentation
 */
import axios from 'axios';

import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, AuthPayload } from '@src/types';

type UserRequest = Omit<ApiRequest<AuthPayload>, 'jwt'>;

export class UserService {
  static createUser({ data, source }: UserRequest): ApiResponse {
    return axios.post(`${API_BASE_URL}/users`, data, {
      cancelToken: source.token
    });
  }
}

export default UserService;
