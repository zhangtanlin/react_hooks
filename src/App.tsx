import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/**
 * 引入路由配置文件及相关组件
 * @requires routes   路由配置文件
 * @requires Sign     路由-登陆注册
 * @requires Home     路由-首页
 * @requires Toast    轻提示
 * @requires Calendar 日历
 */
import routes from './constants/routes';
import Sign from './components/Sign';
import Home from './pages/Home';
import Upload from './components/Upload';
import Posts from './components/Posts';
import Toast from './components/Toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.sign} element={<Sign />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.upload} element={<Upload />} />
        <Route path={routes.posts} element={<Posts />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
