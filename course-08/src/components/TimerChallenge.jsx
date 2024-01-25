import { useRef, useState } from 'react'

import ResultModal from './ResultModal'

const TimerChallenge = ({ title, targetTime }) => {
  // 可以使用ref来管理任何类型的值
  const timer = useRef()
  const dialog = useRef()

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

  if (timeRemaining <= 0) {
    clearInterval(timer.current)
    dialog.current.open()
  }

  // 解决剩余时间被重置问题
  const handleReset = () => {
    setTimeRemaining(targetTime * 1000)
  }

  // 每当状态发生改变时，组件函数都会被重新执行
  // 之后的timer意味着这个这个变量被重新创建了
  // handleStop中使用的timer与handleStart中使用的timer不同
  // let timer

  const handleStart = () => {
    // 将指针存储在这个timer的current属性中
    // 使用setInterval（）反映剩余时间
    timer.current = setInterval(() => {
      // 使用函数方式，自动获取以前的剩余时间，然后更新状态
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
    }, 10)
  }

  const handleStop = () => {
    clearInterval(timer.current)
    dialog.current.open()
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds {targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}

export default TimerChallenge
