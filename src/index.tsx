import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

/**
 * redux
 * @requires Provider redux 导出的方法
 * @requires store    redux 商店
 */
import store from './redux/store';
/**
 * 全局引入graph
 */
import { ApolloProvider } from '@apollo/client';
import gqlClient from './utils/gqlClient'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={gqlClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

/**
 * 如果你想让你的应用程序离线工作并加载得更快,
 * 你可以改变下面的 unregister() 为 register().
 * 请注意,这会带来一些陷阱.
 * 学习更多相关服务提供者:(https://cra.link/PWA).
 */
serviceWorkerRegistration.register();

/**
 * 测量应用程序性能
 * 和(src/reportWebVitals.ts)文件配合使用.
 * 如果想开始测量应用程序性能,请传递一个函数用来记录结果,
 * 例如:reportWebVitals(console.log),或者发送一个到分析端点,
 * 查看更多请参考文档(https://bit.ly/CRA-vitals)
 */
reportWebVitals();
