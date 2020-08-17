/**
 * 操作函数
 * @requires combineReducers  可以导入多个巴拉巴拉
 * @requires userInfoReducer  用户信息
 * @requires randomNumReducer 随机数
 * @requires uploadReducer    上传信息
 */
import { combineReducers } from 'redux';
import userInfoReducer from './userInfoReducer';
import randomNumReducer from './randomNumReducer';
import uploadReducer from './uploadReducer';

const reducers = combineReducers({
  userInfoReducer,
  randomNumReducer,
  uploadReducer
});

export default reducers;
