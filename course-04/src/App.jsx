import { useState } from 'react'

import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { WINNING_COMBINATIONS } from './winning_combinations'

const PLAYERS = {
  X: 'Player 1',
  Y: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

const deriveGameBoard = (gameTurns) => {
  // 确保重启时正确更新
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]

  // React中应该根据需要管理尽可能少的状态
  // 并尝试从该状态中获取尽可能多的信息和值
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameBoard[row][col] = player
  }

  return gameBoard
}

const deriveWinner = (gameBoard, players) => {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column]
    const thirdquareSymbol =
      gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdquareSymbol
    ) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

const App = () => {
  // const [hasWinner, setHasWinner] = useState(false)
  // const [activePlayer, setActivePlayer] = useState('X')

  // lifting state up
  // lift the state up to the closest ancestor component that
  // has access to all components that need to work with that state
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = deriveActivePlayer(gameTurns)
  const winner = deriveWinner(gameBoard, players)

  // 平局
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'))

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]

      return updateTurns
    })
  }

  const handleRestart = () => {
    setGameTurns([])
  }

  // 处理Player
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        // 方括号语法动态设置属性
        [symbol]: newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* 每当使用或重用一个组件时，React基本上会创建一个新的隔离实例 */}
          {/* Player使用相同的组件，它们也完全独立地工作 */}
          <Player
            initalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initalName={PLAYERS.Y}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  )
}

export default App
