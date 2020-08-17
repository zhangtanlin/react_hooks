/**
 * 验证随机小数
 * @param state  默认值（状态值）
 * @param action 操作（赋值操作）
 * @interface randomNumInterface 定义数据类型
 * @function  randomNumReducer   操作方法
 */
interface randomNumInterface {
  type: string,
  payload: number
}
const randomNumReducer = (state:number = 0, action: randomNumInterface) => {
  switch (action.type) {
  case 'SET_RANDOMNUM':
    return action.payload || 0;
  default:
    return state;
  }
};

export default randomNumReducer;
