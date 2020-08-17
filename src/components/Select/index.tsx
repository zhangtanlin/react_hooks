import React, { useState, useEffect } from 'react';
import './index.scss';

/**
 * 接口
 * @param {object}   Option         下拉框每项数据的格式
 * @param {object}   Props          父组件参数
 * @param {array}    Props.options  父组件参数-下拉框列表
 * @param {array}    Props.position 父组件参数-下拉框位置{'top':'表示在文本框下面'，'bottom':'表示在文本框上面'}
 * @param {function} Props.onChange 父组件参数-获取子组件返回值的方法
 */
interface Option {
  label: string,
  value: (number | undefined),
}
interface Props {
  readonly options?: Option[],
  readonly position?: string,
  readonly onChange: {
    (x?: Option): void
  }
}

// 下拉框
function Select(props: Props) {
  /**
   * 定义
   * @param {array}   optionList  下拉框数据数组
   * @param {string}  optionPosi  下拉框位置
   * @param {boolean} optionShow  是否显示下拉框
   * @param {object}  selectedObj 下拉框选中的对象
   */
  const [optionList] = useState(props.options || [{ label: '请选择', value: undefined }])
  const [optionPosi] = useState(props.position || 'top')
  const [optionShow, setOptionShow] = useState(false)
  const [selectedObj, setSelected] = useState(optionList[0])
  /**
   * 操作
   * @function addEventListener 监听点击 document 关闭下拉框的 option 列表
   */
  useEffect(() => {
    document.addEventListener('click', () => {
      setOptionShow(false);
    })
    return () => {
      document.removeEventListener('click', () => { })
    }
  });
  /**
   * 打开/关闭 options 列表
   * @param {boolean} optionShow 是否显示 options 下拉菜单
   * @function stopImmediatePropagation react 的阻止事件冒泡的方法
   */
  const showHideOption = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    setOptionShow(!optionShow);
  }
  /**
   * 点击选择下拉列表
   * @param e   事件参数
   * @param obj 选中的下拉框对象数据
   * @function stopImmediatePropagation react 的阻止事件冒泡的方法
   * @function setSelected              设置 select 选中的选项
   * @function showHideOption           隐藏下拉框
   */
  const onChange = (e: any, obj: Option) => {
    e.nativeEvent.stopImmediatePropagation();
    setSelected(obj);
    showHideOption(e);
    props.onChange(obj);
  }
  /**
   * 列表循环
   * @param {array} list 需要循环的数组
   * @description 注意 map 循环之前需要使用 (list as Option[]) 的写法。
   */
  const listDom = (list: Option[]) => {
    return (
      list.length ?
        (
          (list as Option[]).map((element: Option) => (
            <li
              className={`list ${element.value === selectedObj.value ? 'active' : ''}`}
              onClick={(e) => onChange(e, element)}
              key={element.label}
            >{element.label}</li>
          ))
        ) : (
          <li className='list'>请选择</li>
        )
    )
  }
  // 返回
  return (
    <div className='selectBox'>
      <div
        className="selectText"
        onClick={(e) => showHideOption(e)}
      >{selectedObj.label}</div>
      <div
        className={`optionBox ${optionShow ? 'show' : 'hide'}`}
        style={{ [optionPosi]: '100%' }}
      >
        <ul className={`listBox`}>
          {listDom(optionList)}
        </ul>
      </div>
    </div>
  );
}

export default Select;
