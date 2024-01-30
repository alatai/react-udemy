import { useEffect, useState } from "react"

const QuestionTimer = ({ timeout, onTimerout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setTimeout(onTimerout, timeout)

    // 这里需要添加一个依赖项，因为实际上有两个依赖项在useEffect函数中使用
  }, [timeout, onTimerout])

  // 确保不会一直被重新执行，而是只有当这些依赖关系发生变化时才执行
  useEffect(() => {
    setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
    }, 100)
  }, [])

  return (
    <progress id="question-time" max={timeout} value={remainingTime}/>
  )
}

export default QuestionTimer
