import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

const Root = () => {
  // useNavigation：React Router 提供的一个Hook
  // 可以让我们发现当前是否处于活动转换中，如果正在加载数据，或么活动转换
  // const navigation = useNavigation()

  return (
    <>
      <MainNavigation />
      <main>
        {/* 
          idle：空闲
          loading：加载
          submitting：提交中 
        */}
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default Root
