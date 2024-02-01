import { useEffect } from 'react'

import ProgressBar from './ProgressBar'

const TIMER = 3000

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    // 给定时间后到期的计时器
    const timer = setTimeout(() => {
      onConfirm()
    }, 1000 * 3)

    // cleanup函数
    // 使用useEffect时，可以不只定义效果函数
    // 还可以定义一个清理函数，这个清理函数应该在这个效果函数再次运行之前执行
    // 或者在这个组件卸载之前，React会执行这个函数
    return () => {
      clearTimeout(timer)
    }
    // 添加函数作为依赖项时，存在创建无限循环的危险
    // 在将函数作为依赖项传递给useEffect时使用回调（useCallback）
  }, [onConfirm])

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  )
}

export default DeleteConfirmation
