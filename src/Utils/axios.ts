import axios from 'axios';
import Environment from '../config/environment';
import { store } from '../Redux/store';

const AxiosInstance = axios.create({
  baseURL: ' https://api.trello.com/1',
});

AxiosInstance.interceptors.request.use(async (config) => {
  const state = store.getState();

  config.params['token'] = state.user.token;
  config.params['key'] = Environment['TRELLO_API_KEY'];
  return config;
});

export default AxiosInstance;
