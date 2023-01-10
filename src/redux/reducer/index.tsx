// 可以导入多个需要操作的模块
import { combineReducers } from 'redux';
// 用户信息
import userInfoReducer from './userInfoReducer';
// 随机数
import randomNumReducer from './randomNumReducer';
// 上传信息
import uploadReducer from './uploadReducer';
// 页面
import pageReducer from './page';

const reducers = combineReducers({
  userInfoReducer,
  randomNumReducer,
  uploadReducer,
  pageReducer,
});

export default reducers;
