import React, { useState, useEffect } from 'react';
import './index.scss';
import emitter from '../../utils/events';

let timer: any = null;

// 详情页
function Alert() {
  /**
   * 定义
   * @param visible      是否显示 toast
   * @param info         toast 的信息
   * @param info.message toast 的文本
   * @param info.type    toast 的类型
   */
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({
    message: '提示',
    type: 'danger',
  });
  /**
   * 监听 toast
   * @function emitter events 导出的监听方法
   * @function timer   定时器
   */
  useEffect(() => {
    emitter.on('toast', (data) => {
      if (timer) clearTimeout(timer);
      setInfo(data);
      setVisible(true);
      timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
    });
    const remove = () => {
      emitter.removeListener('toast', () => { });
      clearTimeout(timer);
    };
    return remove;
  }, []);

  return (
    <div className={`toastBox ${visible ? 'show' : 'hide'}`}>
      <div className={`toast ${info.type}`}>
        <div className="message">
          {info.message}
        </div>
        <div className="btn icon-error" />
      </div>
    </div>
  );
}

export default Alert;
