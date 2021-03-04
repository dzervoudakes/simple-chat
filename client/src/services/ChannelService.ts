import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse } from '@src/types';

export class ChannelService {
  static getChannels({ source, jwt }: ApiRequest<void>): ApiResponse {
    return axios.get(`${API_BASE_URL}/channels`, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default ChannelService;
