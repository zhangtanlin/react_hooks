/**
 * 导出商店
 * @requires reducer     引入操作函数
 * @requires createStore 创建商店
 */
import { createStore } from 'redux';
import reducer from '../reducer/index';

const store = createStore(reducer);

export default store;
