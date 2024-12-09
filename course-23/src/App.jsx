import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 删除导入，否则它总是加载
// import BlogPage, { loader as postsLoader } from './pages/Blog'
import HomePage from './pages/Home'
// import PostPage, { loader as postLoader } from './pages/Post'
import RootLayout from './pages/Root'
import { Suspense } from 'react'

// 只在需要时加载
// 一个函数只有在返回JSX代码时才是有效组件
// 使用React的lazy函数包装import函数
const BlogPage = lazy(() => import('./pages/Blog'))

const PostPage = lazy(() => import('./pages/Post'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              // Suspense：React提供的组件，可以被其他组件使用
              // 以等待内容加载，然后才真正渲染内容
              <Suspense fallback={<p>Loading</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              // import将返回一个promise（因为这是一个异步过程，需要下载代码可能需要时间）
              // 也可以调用import作为一个函数，在这种情况下，只在需要时动态地导入
              // 所有这些都将通过懒加载完成
              import('./pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: ({ params }) =>
              import('./pages/Post').then((module) =>
                module.loader({ params })
              ),
          },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

/*
  Lazy Loading
  Load code only when it's needed

  A React SPA is a "Static Website"
  Only HTML, CSS & JavaScript
  A static site host is needed
*/
