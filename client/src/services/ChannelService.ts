import axios from 'axios';
import { API_BASE_URL } from '@src/constants';
import { ApiRequest, ApiResponse } from './types';

const BASE_URL = `${API_BASE_URL}/channels`;

export class ChannelService {
  static getChannels({ source, jwt }: ApiRequest<void>): ApiResponse {
    return axios.get(BASE_URL, {
      cancelToken: source.token,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

export default ChannelService;
