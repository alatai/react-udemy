// 使用props解构来获取onSelectSquare
const GameBoard = ({ onSelectSquare, board }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard)

  // const handleSelectSquare = (rowIndex, colIndex) => {
  // setGameBoard((prevGameBoard) => {
  // 不推荐做法
  // 如果状态是一个对象或数组，以不可变的方式更新那个状态
  // 只是意味着创建了一个旧状态的副本
  // 会立即更新内存中的旧值，甚至在React执行这个预定的状态更新之前
  // 如果应用程序中有多个位置为同一状态调用状态更新，可能会导致错误
  // prevGameBoard[rowIndex][colIndex] = 'X'

  // 内存中的新数组对象
  // const updatedBoard = [
  // ...prevGameBoard.map((innerArray) => [...innerArray]),
  // ]
  // updatedBoard[rowIndex][colIndex] = activePlayerSymbol
  // return updatedBoard
  // })

  // onSelectSquare()
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default GameBoard
