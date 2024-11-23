// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter'
import authReducer from './auth'

/*
const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    // 重要！在使用Redux时绝对不能做的事：永远不应该改变状态
    // 因为我们仍然会改变现有的状态，对象和数组在JavaScript中是引用值
    // 这可能导致错误，不可预测的行为...
    // state.counter++
    // return state

    // 应该总是通过返回一个全新的状态对象来覆盖它
    return {
      counter: state.counter + 1,
      // 当我们更新一个状态片段时，必须始终设置所有其他状态
      // 因为覆盖了旧的状态
      showCounter: state.showCounter,
    }
  }

  if (action.type === 'increase') {
    return {
      ...state,
      counter: state.counter + action.value,
    }
  }

  if (action.type === 'decrement') {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }

  if (action.type === 'toggle') {
    return {
      ...state,
      showCounter: !state.showCounter,
    }
  }

  return state
}

const store = createStore(counterReducer)
*/

// 无论使用createStore还是configureStore
// Redux都需要一个主Reducer函数，负责全局状态
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})

export default store
