import Mock from 'mockjs';
import { GetUrlQuery } from '../../utils/tools';

/**
 * 数组测试
 * @link 参考文档 http://mockjs.com/examples.html
 */
export const getArray = Mock.mock(RegExp('/getArray.*'), 'post', (options: any) => {
  let pageSize = 5; 
  let currentPage = 1; 
  try {
    const tempBody = JSON.parse(options.body);
    pageSize = Number(tempBody.pageSize); 
    currentPage = Number(tempBody.currentPage);
  } catch (error) {
  } finally {
    return Mock.mock({
      [`list|${pageSize}`]: [{
        'id|+1': Number(pageSize * (currentPage-1)) + 1,
        name: '@CNAME',
        image: "@dataImage('75x75')",
      }],
      'total|110': 110,
    });
  }
});

/**
 * 对象测试
 * @link 参考文档 http://mockjs.com/examples.html
 * @param queryId 获取地址栏 id 值
 */
export const getDetail = Mock.mock(RegExp('/getDetail.*'), 'get', (options: any) => {
  const queryId = GetUrlQuery(options.url, 'id');
  return Mock.mock({
    guid: '@guid',
    id: Number(queryId),
    title: '@title()',
    paragraph: '@cparagraph',
    image: "@image('200x100', '#4A7BF7', 'Hello')",
    address: '@county(true)',
    date: '@date("yyyy-MM-dd")',
    time: '@time("HH:mm:ss")',
    url: '@url',
    email: '@email',
    ip: '@ip',
    regexp: /[a-z][A-Z][0-9]/,
    'string|9': '*',
    'string|6-11': '*',
    'number|+10': 5,
    'number|1-10': 5,
  });
});
