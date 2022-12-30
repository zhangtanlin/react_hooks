import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import ReactPaginate from 'react-paginate';
import Select from '../../../../components/Select'
import Popup from '../../../../components/Popup'
import Player from '../Player';
/**
 * api 接口
 * @requires ApiGetList 请求列表
 */
import {
  ApiGetList,
} from '../../../../api/home';

/**
 * 定义数据结构
 * @param ListItem 列表里每一项的数据结构
 */
interface ListItem {
  readonly id: number,
  readonly name: string,
  readonly image: string
}

// 首页
function Home() {
  /**
   * 定义
   * @param history       路由
   * @param pageSizes     分页-每页显示的条数列表
   * @param values        分页-当前选中/默认的数据
   * @param pageCount     分页-总页数
   * @param total         分页-总条数
   * @param inputNum      分页-页码文本框绑定的值
   * @param list          列表
   * @param detailVisible 弹出框-是否显示
   * @param detailInfo    弹出框-详情
   */
  const navigate = useNavigate();
  const [pageSizes] = useState([
    { label: '5条每/页', value: 5 },
    { label: '10条每/页', value: 10 },
    { label: '15条每/页', value: 15 },
    { label: '20条每/页', value: 20 }
  ])
  const [values, setValues] = useState({
    pageSize: 5,
    currentPage: 0,
  });
  const [pageCount, setPageCount] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [inputNum, setInputNum] = useState<number>(0);
  const [list, setList] = useState<ListItem[]>([]);
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [detailInfo, setDetailInfo] = useState<ListItem>();
  /**
   * 操作数据
   * @function getList 获取列表
   */
  useEffect(() => {
    function getList() {
      const obj = {
        pageSize: values.pageSize,
        currentPage: Number(values.currentPage) + 1,
      };
      ApiGetList(obj).then((res: any) => {
        if (res.status === 200) {
          if (
            Array.isArray(res.data.list) &&
            res.data.list.length
          ) {
            let arr: ListItem[] = [];
            res.data.list.map((element: ListItem) => {
              const temp: ListItem = {
                id: Number(element.id) || 0,
                name: String(element.name) || '',
                image: String(element.image) || ''
              }
              arr.push(temp);
              return temp;
            })
            setList(arr);
          }
          setPageCount(Math.ceil(res.data.total / values.pageSize) || 0);
          setTotal(Number(res.data.total) || 0);
        }
      });
    }
    getList();
  }, [values]);
  /**
   * 分页
   * @function onChangePage   react-paginate 插件改变页码事件
   * @function onChangeInput  文本框输入事件
   * @function changePagesize 切换每页显示的条数
   */
  const onChangePage = (pageObj: any) => {
    const obj = { ...values, currentPage: pageObj.selected };
    setValues(obj);
  };
  const onChangeInput = (event: any) => {
    setInputNum(event.target.value);
  };
  const changePagesize = (data: any) => {
    const obj = { ...values, currentPage: 0, pageSize: Number(data.value) };
    setValues(obj);
  }
  /**
   * 获取当前行
   * @param data 当前行信息
   * @function setDetailInfo 设置选中的当前行数据
   * @function showPopup     显示/隐藏弹出框
   */
  const getDetail = (data: ListItem) => {
    setDetailInfo(data);
    showPopup();
  };
  /**
   * 改变弹出框状态
   * @function showPopup 显示/隐藏弹出框
   */
  const showPopup = () => {
    setDetailVisible(!detailVisible);
  };
  /**
   * 弹出框内容
   */
  const content = () => {
    return <Player />
  }
  // 跳转登陆
  const toSign = () => {
    navigate('/');
  }
  // 跳转上传
  const toUpload = () => {
    navigate('/upload');
  }
  // 返回
  return (
    <>
      <div className="home">
        {/* 查询行 */}
        <div className="header">
          <div className="list">
            <input type="text" className="calendarInput" />
          </div>
        </div>
        <div className="content">
          {
            list.length ? (
              list.map(element => (
                <div
                  key={element.id}
                  className="listBox"
                  onClick={() => getDetail(element)}
                >
                  <div className="item">
                    {element.id}
                  </div>
                  <div className="item">
                    {element.name}
                  </div>
                  <div className="item">
                    <img src={element.image} alt="" />
                  </div>
                </div>
              ))
            ) : (<div className="listBox">暂无数据</div>)
          }
        </div>
        {/* 分页 */}
        <div className="paginateBox">
          <div className="paginateLeft">
            <div className="paginateLeftText">
              共
              {total}
              条
            </div>
            <Select
              options={pageSizes}
              position='bottom'
              onChange={(data) => changePagesize(data)}
            ></Select>
          </div>
          <ReactPaginate
            previousLabel={<i className="icon icon-left" />}
            nextLabel={<i className="icon icon-left" />}
            breakLabel="..."
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            onPageChange={onChangePage}
            containerClassName="paginate"
            activeClassName="paginateActive"
            previousClassName="paginatePrevious"
            nextClassName="paginateNext"
            forcePage={values.currentPage}
          />
          <div className="paginateRight">
            跳转到第
            <input
              className="input"
              type="tel"
              name="currentPage"
              onChange={onChangeInput}
            />
            页
            <button
              type="button"
              className="goBtn"
              onClick={() => onChangePage({ selected: Number(inputNum) })}
            >GO</button>
          </div>
        </div>
      </div>
      {/* 跳转登陆 */}
      <button onClick={toSign}>点击跳转登陆界面</button>
      {/* 跳转上传 */}
      <button onClick={toUpload}>点击跳转上传界面</button>
      <div>{JSON.stringify(detailInfo)}</div>
      {/* 详情 */}
      <Popup
        visible={detailVisible}
        onChange={() => showPopup()}
      >
        {content()}
      </Popup>
    </>

  );
}

export default Home;
