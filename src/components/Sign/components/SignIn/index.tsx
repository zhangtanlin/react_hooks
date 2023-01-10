import React, { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
/**
 * api
 * @function ApiSignInByPhone 手机号和密码登陆 api
 */
import { ApiSignInByPhone } from '../../../../api/sigin'
/**
 * 定义数据类型
 * @interface randomNumInterface redux 定义 randomNumReducer 数据类型
 */
interface randomNumInterface {
  randomNumReducer: number
}
// 登陆
function SignIn() {
  /**
   * 定义
   * @param navigate 路由
   * @function randomNumReducer redux 使用 state 获取 randomNumReducer 的值
   * @function randomNum        redux 获取 randomNumReducer 的值
   * @function dispatch         redux 设置 randomNumReducer 的值
   * @param {object} values 登陆参数
   */
  const navigate = useNavigate();
  const randomNumReducer = (state: randomNumInterface) => state.randomNumReducer;
  const randomNum = useSelector(randomNumReducer);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    phone: '13111111111',
    password: 'q123456'
  })
  /**
   * 登陆-提交
   * @param home 跳转首页
   */
  const loginByPassword = async () => {
    console.log('values', values);
    const signInByPhone = await ApiSignInByPhone(values);
    console.log('signInByPhone', signInByPhone);
    if (signInByPhone) {
      navigate('/home');
    } else {
      console.log('账号登录失败');
    }
  };
  /**
   * 获取随机数
   * @param newRandomNum 0-1的随机数
   * @function dispatch redux 调用 SET_RANDOMNUM 设置值
   */
  const getRandom = () => {
    const newRandomNum = Math.random();
    dispatch({
      type: 'SET_RANDOMNUM',
      payload: newRandomNum,
    });
  };
  /**
   * 跳转posys页面
   */
  const toPosts = () => {
    navigate('/posts');
  };
  // 返回
  return (
    <div className="signIn">
      <div className="row">
        <label htmlFor="signInPhone">手机号</label>
        <input
          id="signInPhone"
          type="tel"
          placeholder="请输入手机号"
          onChange={({ target }) => {
            const obj = { ...values, phone: target.value }
            setValues(obj)
          }}
        />
      </div>
      <div className="row">
        <label htmlFor="signInPassword">密码</label>
        <input
          id="signInPassword"
          type="password"
          placeholder="请输入密码"
          onChange={({ target }) => {
            const obj = { ...values, password: target.value }
            setValues(obj)
          }}
        />
      </div>
      <button type="button" onClick={loginByPassword}>登陆,跳转首页</button>
      <button type="button" onClick={getRandom}>获取随机数</button>
      <button type="button" onClick={toPosts}>跳转posts</button>
      <p>{JSON.stringify(randomNum)}</p>
    </div>
  );
}

export default SignIn;
