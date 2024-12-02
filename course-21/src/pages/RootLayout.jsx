// 为根路由导入Outlet组件
// 此组件标记子元素应该渲染到何处
import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      {/* 子路径应该渲染到的位置 */}
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
