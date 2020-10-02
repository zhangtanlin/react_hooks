import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
/**
 * 引入路由配置文件及相关组件
 * @requires routes   路由配置文件
 * @requires Sign     路由-登陆注册
 * @requires Home     路由-首页
 * @requires Toast    轻提示
 * @requires Calendar 日历
 */
import routes from './constants/routes';
import Sign from './pages/Sign';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Posts from './pages/Posts';
import Toast from './components/Toast';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.sign} component={Sign} />
        <Route path={routes.home} component={Home} />
        <Route exact path={routes.upload} component={Upload} />
        <Route path={routes.posts} component={Posts} />
      </Switch>
      <Toast />
    </Router>
  );
}

export default App;
