import UserFinder from './components/UserFinder'
import UserContext from './store/users-context'

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
]

const App = () => {
  const usersContext = {
    users: DUMMY_USERS,
  }

  return (
    <UserContext.Provider value={usersContext}>
      <UserFinder />
    </UserContext.Provider>
  )
}

export default App

// React 基于类的组件
// 现在除了错误边界（Error Boundary）之外，没有理由去构建基于类的组件
// 基于类的组件不能使用React Hooks

/**
 * 基于类的组件不能使用Hooks，但是基于类的组件有组件生命周期的概念
 * （实际上每个组件在技术上都有一个生命周期）
 * ・ componentDidMount()：在组件刚刚加载时调用，当它被求值并呈现给DOM时，基本上等同于useEffect(…, [])
 * ・ componentDidUpdate()：一旦组件被更新，就会调用此函数，基本上等同于useEffect(…, [依赖项])
 * ・ componentWillUnmount()：在组件从DOM删除之前调用，基本上等同于useEffect()中的clean => useEffect(() => {return …})
 * ・ …
 */

/**
 * 错误边界问题
 * 有时候会出现一些无法阻止的错误，或者这些错误只是被用来将出错的信息从应用程序的一部分传输到另一部分
 * 
 */
