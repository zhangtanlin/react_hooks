import React from 'react';
import './index.scss';
// redux
import { useSelector } from 'react-redux';
// toast
import emitter from '../../../../utils/events';
// 注册
function SignUp() {
  /**
   * redux
   * @interface randomNumInterface 定义 randomNumReducer 数据类型
   * @function  randomNumReducer   使用 state 获取 randomNumReducer 的值
   * @function  randomNum          获取 randomNumReducer 的值
   * @function  dispatch           设置 randomNumReducer 的值
   */
  interface randomNumInterface {
    randomNumReducer: number
  }
  const randomNumReducer = (state: randomNumInterface) => state.randomNumReducer;
  const randomNum = useSelector(randomNumReducer);
  // 测试toast
  const testToast = () => {
    emitter.emit('toast', {
      message: '测试toast',
      type: 'danger',
    });
  };
  // 返回
  return (
    <div className="signUp">
      <button type="button" onClick={testToast}>测试toast</button>
      <p>{randomNum}</p>
    </div>
  );
}

export default SignUp;
