import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, Message } from '@src/types';

export class MessageService {
  static createMessage({ data, source, jwt }: ApiRequest<Message>): ApiResponse {
    return axios.post(`${API_BASE_URL}/messages`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      data
    });
  }

  static getMessages({
    userId,
    source,
    jwt
  }: ApiRequest<void> & { userId: string }): ApiResponse {
    return axios.get(`${API_BASE_URL}/messages?searchId=${userId}`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default MessageService;
