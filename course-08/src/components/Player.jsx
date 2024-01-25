import { useState, useRef } from 'react'

const Player = () => {
  const playName = useRef()

  const [enteredPlayerName, setEnteredPlayerName] = useState(null)

  const handleClick = () => {
    // useRef主要用于在函数组件中保存和访问可变的引用
    // 1.访问和操作DOM元素
    // 2.在渲染之间保留值，而不引起重新渲染
    // 3.存储任意可变值，而不触发重新渲染
    setEnteredPlayerName(playName.current.value)
    playName.current.value = ''
  }

  return (
    <section id="player">
      {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknow entity'}</h2> */}
      {/* JavaScript简写 */}
      <h2>Welcome {enteredPlayerName ?? 'unknow entity'}</h2>
      <p>
        <input ref={playName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  )
}

export default Player
