// React库主要负责定义React组件、虚拟DOM的概念以及一些与组件的生命周期和状态有关的功能
import { forwardRef, useImperativeHandle, useRef } from 'react'
// ReactDOM库主要负责将React组件渲染到浏览器的DOM
import { createPortal } from 'react-dom'

// forwardRef是React中一个用于向子组件传递“ref”的特殊函数
// 它允许在函数组件中访问子组件的DOM节点或实例
// 第一个参数是props，第二个参数是ref
const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef()

    const userLost = remainingTime <= 0
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)

    // useImperativeHandle是react中的一个Hook，用于自定义在使用“ref”时
    // 暴露给父组件的实例值。通常“ref”会直接暴露整个组件实例，但有时候可能只需要
    // 暴露其中的一部分功能或属性
    // 第一个参数ref，第二个参数是一个函数，该返回返回一个对象（向其他组件公开属性和方法）
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal()
        },
      }
    })

    // createPortal第一个参数是JSX代码，第二个参数是HTML元素（代码应该被远程传输到该元素）
    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>Your Lost</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{' '}
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form action="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      // 使用document API来选择该元素
      document.getElementById('modal')
    )
  }
)

export default ResultModal
