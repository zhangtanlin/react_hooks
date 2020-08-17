import React, { useState } from 'react';
import './index.scss';
/**
 * 导入自定义组件
 * @param SignIn 登陆组件
 */
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
/**
 * 登陆
 */
function Sign() {
  // 显示登陆还是注册
  const [inOrUp, setInOrUp] = useState(1);
  // 返回
  return (
    <div className="signBox">
      <div className="sign">
        <div className="header">
          <div className={`list ${inOrUp ? 'active' : null}`} onClick={() => { setInOrUp(1); }}>登陆</div>
          <div className={`list ${inOrUp ? null : 'active'}`} onClick={() => { setInOrUp(0); }}>注册</div>
        </div>
        <div className="content">
          <div className={`list ${inOrUp ? 'active' : null}`}>
            <SignIn />
          </div>
          <div className={`list ${inOrUp ? null : 'active'}`}>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
