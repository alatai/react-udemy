import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import RoutLayout from './pages/RootLayout'
import Error from './pages/Error'
import ProductDetail from './pages/ProductDetail'

// 调用createBrowserRouter函数，并向这个函数传递一个路由定义对象数组
// 每个对象都代表一个路径
const router = createBrowserRouter([
  // 使用根路径，并添加一个element
  // 该element实际上加载了应该包装在其他路由周围的包装器
  // 该路由充当父路由（并充当其他路由的包装器）
  {
    path: '/',
    element: <RoutLayout />,
    // 根路径可能会抛出错误，因为实际上当我们输入不存在的URL时
    // react-router-dom包将生成错误，并且该错误将自动冒泡到根路由
    errorElement: <Error />,
    // 必须为这个特殊的路由添加children属性
    children: [
      {
        // 没有指定Path，应该加载主页的路径与我们在父路由上的路由相同
        // path: '',
        // 可以指定index属性,将此路由转换为index路由
        // 如果父路由的路径
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products', // 关键属性（URL域名之后的部分）
        element: <ProductsPage />, // 当该路径时活动的时候应该加载的JSX代码
      },
      {
        path: 'products/:id', // 动态路由
        element: <ProductDetail />,
      },
    ],
  },
])

const App = () => {
  // Link仅在RouterProvider内部时才有效
  // （即不在其同一层或将其包装）
  return <RouterProvider router={router} />
}

export default App

/*
应用程序越复杂，可能就越希望能够链接到网站和Web应用程序的某些部分。
而不是强迫用户总是从起始页开始，然后手动导航到不同区域，如果用户可以链接到
某些页面，如果可以提供一个URL，在访问时加载网站的某个部分。。。 

Single-Page Application Routing
Multiple Pages In Single-Page Apps
不会从后端获取新页面，仍然可以使用不同的URL指向不同的页面

What is a Routing?
（要理解路由，重要的是要记住网络通常是如何工作的）
不同的HTML文件用于不同的路径，这就是如何构建一个多页面应用
为不同的路径获取不同的内容，缺点是总是必须获取新的内容
一个新的HTTP请求被发送，一个新的响应被接收，这可能会破坏用户流
它可能带来一些滞后并减慢网站，因此导致次优的用户体验

When building complex user interfaces, we typically build
Single Page Application(SPAs)
只需要发送一个初始的HTML请求，然后下载这个带有一堆额外JavaScript的HTML文件
之后在客户端上运行的额外JavaScript代码实际上会负责调整用户在屏幕上看到的内容
（可以支持URL中的路径更改并根据路径加载不同的内容）

通过添加客户端React代码，它会监视当前活动的URL
并在URL更改时触发，然后在URL更改时在屏幕上显示不同的内容
因此，可以添加一些客户端代码，而不是从后端加载新的HTML文件
（这些代码只是监视URL，然后在URL更改时加载不同的React组件）
 */
