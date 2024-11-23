// import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

const initialCounterState = {
  counter: 0,
  showCounter: true,
}

// 使用redux toolkit
// 对象作为参数（全局状态的切片）
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    // 每个方法都会自动接收最新的状态
    // 实际上这里不需要action，因为这些方法会自动被调用，取决于哪个action被触发
    // 不需要编写自己的if检查
    increment(state) {
      // 这里可以改变状态
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    // 也可以接受action，不需要再另外的方法中都接受（仅在需要时）
    increase(state, action) {
      state.counter = state.counter + action.payload
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  },
})

export const counterAction = counterSlice.actions

export default counterSlice.reducer
