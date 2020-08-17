import React, { useState, useEffect } from 'react';
import './index.scss';

/**
 * 接口
 * @param {object}   Props          父组件参数
 * @param {array}    Props.visible  父组件参数-是否显示/关闭弹出框
 * @param {array}    Props.title    父组件参数-弹出框标题
 * @param {function} Props.onChange 父组件参数-改变弹出框状态方法
 * @param {function} Props.children 父组件参数-当前组件的子组件
 */
interface Props {
  readonly visible?: boolean,
  readonly title?: string,
  onChange: {
    (): void
  },
  children?: React.ReactNode;
}

// 弹出框
function Popup(props: Props) {
  /**
   * 定义
   * @param visible 是否显示弹出框
   * @param title   弹出框标题
   */
  const [visible, setVisible] = useState(props.visible);
  const [title] = useState(props.title || '提示');
  const [children] = useState(props.children);
  /**
   * 操作
   * @param {boolean} visible 监听父组件传递的 visible 状态
   */
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  /**
   * 切换弹出框是否显示
   */
  const popupChange = (e: any) => {
    setVisible(!visible);
    props.onChange();
  }
  // 返回
  return (
    <div className={`popup ${visible ? 'show' : 'hide'}`}>
      <div className="maskLyer" onClick={popupChange}></div>
      <div className="popupBox">
        <div className="titleBox">
          <div className="message">{title}</div>
          <div className="btn icon-error" onClick={popupChange} />
        </div>
        <div className="contentBox">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Popup;
