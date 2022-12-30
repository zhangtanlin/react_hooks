# 开始创建 React App

这个项目是用[Create React App](https://github.com/facebook/create-react-app)创建的.

## Available Scripts

在项目根目录,可以运行:

### `npm start`

开发模式下应用在浏览器的打开地址[http://localhost:3000](http://localhost:3000) to view it in the browser.<br/>
编辑之后页面重载,可以看到一下错误的格式和打印.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

### 创建app使用
```bash
  # 先要安装react脚手架
  # npm i -g create-react-app
  create-react-app my-app --template typescript
```

### 注意
- 因为项目里面的加解密使用了nodejs的一些方法,所以一定要引入nodejs:
```bash
  npm i --save-dev @types/node
```
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

创建应用文档[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

react开发文档[React documentation](https://reactjs.org/).
