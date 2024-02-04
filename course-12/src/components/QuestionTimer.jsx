import { useEffect, useState } from 'react'

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    return () => {
      clearTimeout(timer)
    }
    // 这里需要添加一个依赖项，因为实际上有两个依赖项在useEffect函数中使用
  }, [timeout, onTimeout])

  // 确保不会一直被重新执行，而是只有当这些依赖关系发生变化时才执行
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
    }, 100)

    // 当 useEffect 返回的函数（通常称为 cleanup 函数）被执行时，
    // 它会在组件卸载或下一次运行 effect 之前执行。
    // 这使得可以在组件卸载时执行一些清理工作，比如取消订阅、清除定时器、清理副作用等。
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  )
}

export default QuestionTimer
