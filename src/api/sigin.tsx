// 导入
import request from '../utils/axios';
import '../constants/mock/test';

/**
 * 登陆-手机号密码
 * @param param          body 参数
 * @param param.phone    body 参数手机号
 * @param param.password body 参数密码
 */
export const ApiSignInByPhone = (data: any) => request.post('/api/Home/loginByPassword', data);
