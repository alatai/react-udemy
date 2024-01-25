import { useState } from 'react'

const Player = ({ initalName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initalName)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    // 在React中，当根据先前的状态值更新状态时，不应该这样做
    // 这里的更新并不是立即执行，它由React计划在未来执行（可能是1~2ms之内）
    // setIsEditing(!isEditing)

    // 应该向该状态更新函数传递一个函数
    // 会自动从React获取该编辑状态的最新状态值
    setIsEditing((editing) => !editing)

    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  // 双向绑定：监听输入上的变化，然后将更新后的值反馈给这个输入
  const handleChange = (event) => {
    setPlayerName(event.target.value)
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>
  let btnCaption = 'Edit'

  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    )
    btnCaption = 'Save'
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  )
}

export default Player
