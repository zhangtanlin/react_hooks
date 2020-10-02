import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={gqlClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
