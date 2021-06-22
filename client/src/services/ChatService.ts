/**
 * Service class that controls interactions with both the '/chat' orchestration layer and the '/messages' API.
 * @packageDocumentation
 */
import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse, Message } from '@src/types';

type NewMessage = Omit<Message, '_id' | 'createdAt'>;

export class ChatService {
  /**
   * Retrieve full initial Chat experience, including channels, users, and conversation lists preconfigured from the service.
   */
  static getChat({
    userId,
    source,
    jwt
  }: ApiRequest<void> & { userId: string }): ApiResponse {
    return axios.get(`${API_BASE_URL}/chat?searchId=${userId}`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }

  static createMessage({ data, source, jwt }: ApiRequest<NewMessage>): ApiResponse {
    return axios.post(`${API_BASE_URL}/messages`, data, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default ChatService;
