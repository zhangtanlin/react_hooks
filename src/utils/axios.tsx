/**
 * 导入
 * @requires encryptParam 加密
 */
import axios from 'axios';
import { apiGithub, } from '../config';
import Const from './const';
import { cryptoAesEncrypt } from './encrypt_decrypt';
import { localGet, localSet } from './storage';
import { RandomId } from './tools';

// 设置参数
const instance = axios.create({
  timeout: 1000,
  baseURL: apiGithub,
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 9000,
  //   auth: {
  //     username: 'mikeymike',
  //     password: 'rapunz3l'
  //   }
  // },
});

// 获取设备唯一值
const getAuthId = () => {
  let _oauth_id = localGet(Const.authId);
  if (!_oauth_id) {
    const _randomId = RandomId(false, 16);
    _oauth_id = `${_randomId}_${new Date().getTime()}}`;
    localSet(Const.authId, _oauth_id);
  }
  return _oauth_id;
}

// 请求之前
instance.interceptors.request.use((config: any) => {
  try {
    const defaultParams = {
      auth_id: getAuthId(),
      version: Const.version,
      ...config.data || {},
    };
    if (config?.data) {
      config.data = JSON.stringify({
        ...defaultParams,
        ...config.data,
      });
    } else {
      config.data = JSON.stringify({
        ...defaultParams,
      });
    };
    config.data = cryptoAesEncrypt(config.data);
    return config;
  } catch (error) {
    console.log('请求参数加密失败');
  }
}, (error: any) => Promise.reject(error));

/**
 * 请求之后
 * @error 任何超出2xx范围的状态码都会触发此函数（做一些响应错误）
 */
instance.interceptors.response.use((response: any) => response, (error: any) => Promise.reject(error));

// 导出
export default instance;

// 