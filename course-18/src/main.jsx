import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 在严格模式下运行，因此每个组件在开发过程中都会被React渲染两次
  // 帮助捕捉潜在的bug和错误
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
