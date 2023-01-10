import React, { useState, useEffect } from 'react';
import './index.scss';
import { useQuery, gql } from '@apollo/client';
import gqlClient from '../../utils/gqlClient'

// gql 查询语句
const GET_POSTERS = gql`
  query {
    postsFindAll {
      id
      account
      password
    }
  }
  `;

// posts页面
function Home() {
  /**
   * 定义
   * @param loading 是否获取数据中
   * @param error   错误信息
   * @param data    列表
   * @param list    graphql获取列表写法二
   */
  const { data } = useQuery(GET_POSTERS);
  const [list, setList] = useState([]);
  /**
   * 操作数据
   * @function getList 获取列表
   */
  useEffect(() => {
    const getData = async () => {
      const { data } = await gqlClient.query({
        query: gql`
          query {
            postsFindAll {
              id
              account
              password
            }
          }
        `
      });
      setList(data.postsFindAll);
    };
    getData();
  }, []);
  // 返回
  return (
    <>
      <div className="posts">
        <p>
          {JSON.stringify(data)}
        </p>
        <p>
          {JSON.stringify(list)}
        </p>
      </div>
    </>

  );
}

export default Home;
