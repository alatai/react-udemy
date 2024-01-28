import { useEffect, useState } from 'react'

const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer)

  useEffect(() => {
    // 每隔几毫秒执行的函数
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10)
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (<progress value={remainingTime} max={timer} />)
}

export default ProgressBar
