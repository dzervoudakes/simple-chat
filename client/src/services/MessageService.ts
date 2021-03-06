import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { Message } from '@src/context';
import { ApiRequest, ApiResponse } from './types';

const BASE_URL = `${API_BASE_URL}/messages`;

export class MessageService {
  static createMessage({
    data,
    source,
    jwt
  }: ApiRequest<Omit<Message, '_id'>>): ApiResponse {
    return axios.post(BASE_URL, data, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }

  static getMessages({
    userId,
    source,
    jwt
  }: ApiRequest<void> & { userId: string }): ApiResponse {
    return axios.get(`${BASE_URL}?searchId=${userId}`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default MessageService;
