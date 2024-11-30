import { useSelector } from 'react-redux'

import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import Products from './components/Shop/Products'

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  )
}

export default App

/*
Side Effects, Async Tasks & Redux
重要规则：Reducer函数必须是纯函数，无副作用的、同步的
Reducer函数在Redux Reducer中应该接收一些输入，旧的状态和动作，然后产生一些输出
（它与Redux无关，只是一般的Reducer概念）

当使用Redux时带来一个重要问题
e.g., 分派一些会涉及副作用的操作时，比如应该如何发送HTTP请求，这些代码应该放在何处

如何将后端和我们需要发送到后端的HTTP请求集成使用到Redux的React应用中？
Reducers must be pure, side-effect free, synchronous functions!
因此当我们有任何产生副作用或异步的代码时，比如发送HTTP请求，这样的代码不能进入Reducer函数

当涉及到运行上述代码时，有两个主要的选择来放置这样的代码
1. Inside the components(e.g., via useEffect())
2. Inside the action creators

Fat Reducers vs Fat Components vs Fat Actions
1. Synchronous, side-effect free code
Prefer reducers
Avoid action creators or components

2. Async code or code with side-effects
Prefer action creators or components
Never use reducers

What is a "Thunk"?
A function that delays an action until later
An action creator function that does NOT return the action itself
but instead another function which eventually returns the action
 */
