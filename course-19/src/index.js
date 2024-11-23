import React from 'react'
import ReactDOM from 'react-dom/client'
// 为了向React应用提供Redux store，通常会进入这个index.js文件
// 不是redux，而是react redux，在这里导入的是Provider组件
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // 用Provider组件包装所有根组件（因为整个应用都需要访问Store）
  // Provider有一个store属性必须设定
  <Provider store={store}>
    <App />
  </Provider>
)
