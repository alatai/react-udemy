// JS导入第三方包的语法
const redux = require('redux')

// Reducer函数是一个标准的JavaScript函数
// 它将被Redux库调用，然后它始终接收两个输入（两个参数） - old state和dispatched action
// Reducer函数必须返回一个特定的输出，它必须返回一个新的状态对象
// 因此Reducer函数应该是纯函数
// 如果state没有被定义，这个默认值是undefined
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    }
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    }
  }

  return state
}

// store管理一些数据，它管理的数据最终是由Reducer函数决定
// 因为Reducer函数将产生新的状态快照，每当一个动作到达Reducer时
// Reducer必须吐出一个新的状态快照
// 将Reducer函数传给createStore，因为Store需要知道哪个Reducer负责改变该Store
const store = redux.createStore(counterReducer)

// 订阅者,它不获取任何参数，但是可以在函数内部访问Store并调用getState
const counterSubscriber = () => {
  // 提供最新的State快照
  // 每当状态发生变化时，次订阅功能很快被触发
  const latestState = store.getState()
  console.log('latestState = ', latestState)
}

// 只需要让Redux知道这个订阅者函数，并告诉它只要状态改变，就应该执行
// 重要的是，我在这里不执行counterSubscriber，只是指向它
// 因为Reducer和Subscriber函数都将由Redux执行
store.subscribe(counterSubscriber)

// 有一个初始化操作是由Redux调用的，但它不会触发我们的订阅
// console.log(store.getState())
// 除了获取状态和订阅之外，还可以在store对象上调用分派
// 它是一个具有type属性的JavaScript对象
// { counter: 2 } 因为它初始化后为1，分派了一个新的动作导致Reducer函数再次运行
store.dispatch({ type: 'increment' })
store.dispatch({ type: 'decrement' })
