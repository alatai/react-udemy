// import { Component } from 'react'
// 需要导入由React Redux团队制作的自定义Hook
// connect函数可以帮助基于类的组件连接到Redux
// 无论是基于函数还是基于类的组件都可以使用connect
import { useSelector, useDispatch } from 'react-redux'
// import { connect } from 'react-redux'

import { counterAction } from '../store/counter'
import classes from './Counter.module.css'

const Counter = () => {
  // 调用这个函数，需要传递一个函数来使用选择器
  // 一个将由React Redux函数执行的函数
  // 然后基本上确定我们想要从存储中提取哪一段数据
  // React Redux会自动为这个组件设置一个Redux store的订阅
  const counter = useSelector((state) => state.counter.counter)
  const show = useSelector((state) => state.counter.showCounter)

  // 不向它传递任何参数，而是返回一个可以执行的Dispatch函数
  // 我们可以调用这个函数，它将对Redux store分派一个操作
  const dispatch = useDispatch()

  const incrementHandler = () => {
    // dispatch({ type: 'increment' })
    dispatch(counterAction.increment())
  }

  const increaseHandler = () => {
    // dispatch({ type: 'increase', value: 5 })
    dispatch(counterAction.increase(5))
  }

  const decrementHandler = () => {
    // dispatch({ type: 'decrement' })
    dispatch(counterAction.decrement())
  }

  // 使用Redux控制计数器是否显示
  const toggleCounterHandler = () => {
    // dispatch({ type: 'toggle' })
    dispatch(counterAction.toggleCounter())
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}

/*
// 基于类的使用
// Hook在基于类的组件中不可用
class Counter extends Component {
  incrementHandle() {
    this.props.increment()
  }

  decrementHandle() {
    this.props.decrement()
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandle.bind(this)}>Increment</button>
          <button onClick={this.decrementHandle.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    )
  }
}

// connect也需要2个参数，2个参数都是函数
// 第一个参数是一个将Redux状态映射到props的函数，然后在此组件中接收
// 它返回一个对象，其中的键将在接收组件中作为props可用
// 基本上等同于不使用Hook，而是使用connect函数
// 自动接收state
const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  }
}

// 第二个参数,相当于使用Dispatch
// 现在的想法是将Dispatch函数存储在props中
// 在Counter组件中，有一些可以作为函数执行的props
// 当执行时，它将向Redux store发送一个action
// 会自动接收dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    // 键是我们可以在组件中使用的属性名称
    // value则是另一个函数，在其中调用dispatch，然后设置action
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  }
}

// 导出Counter时，执行connect
// 会返回一个新的函数作为值，再次执行，我们将组件作为参数传递给返回的函数
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
*/

export default Counter
