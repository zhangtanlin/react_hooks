// 导入
import request from '../utils/axios';
import '../constants/mock/test';

/**
 * 首页-获取列表
 * @param param quere 参数（待定）
 */
export const ApiGetList = (data: any) => request.post('/getArray', data);

/**
 * 首页-获取详情
 * @param param quere 参数（待定）
 */
export const ApiGetDetail = (param: any) => request.get('/getDetail', param);
