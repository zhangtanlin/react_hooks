/**
 * 导入
 * @requires encryptionParam 加密
 */
import axios from 'axios';
import { api } from '../config';
import { encryptionParam } from './tools';

// 设置参数
const instance = axios.create({
  timeout: 1000,
  baseURL: api,
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'mikeymike',
  //     password: 'rapunz3l'
  //   }
  // },
});

// 请求之前
instance.interceptors.request.use((config: any) => {
  encryptionParam({ "data": "data" });
  return config;
}, (error: any) => Promise.reject(error));

/**
 * 请求之后
 * @error 任何超出2xx范围的状态码都会触发此函数（做一些响应错误）
 */
instance.interceptors.response.use((response: any) => response, (error: any) => Promise.reject(error));

// 导出
export default instance;
