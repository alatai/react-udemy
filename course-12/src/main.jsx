import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 整个应用程序都被包装在StrictMode中，StrictMode实际上在幕后调用每个组件函数两次
  // 可以帮助开发者捕捉问题
  // 因为应用程序应该以完全相同的方式工作
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
