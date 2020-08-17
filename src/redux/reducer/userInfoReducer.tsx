/**
 * 验证用户信息
 * @param {*} state  默认值（状态值）
 * @param {*} action 操作（赋值操作）
 * @interface userInfoInterface 定义数据类型
 * @function  userInfoReducer   操作方法
 */
interface userInfoInterface {
  type: string,
  payload: number
}
const userInfoReducer = (state = {}, action: userInfoInterface) => {
  switch (action.type) {
  case 'SET_USERINFO':
    return Object.assign(
      state,
      action.payload,
    );
  default:
    return state;
  }
};

export default userInfoReducer;
