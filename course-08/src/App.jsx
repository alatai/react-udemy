import Player from './components/Player.jsx'
import TimerChallenge from './components/TimerChallenge.jsx'

const App = () => {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not Easy" targetTime={5} />
        <TimerChallenge title="Getting tough" targetTime={10} />
        <TimerChallenge title="Pros only" targetTime={15} />
      </div>
    </>
  )
}

export default App

// refs改变时不会重新渲染组件，而state改变时会重新渲染组件
// state: should be used for values that are directly reflected in the UI
// should not used for "behind the scenes" values that have no direct UI impact
// refs: can be used to gain direct DOM element access (-> great for reading values
// or accessing certain browser APIs)

// react中的portals是一种机制，允许将子组件渲染到父组件DOM层次结构之外的DOM节点中
// 使得可以在React应用中创建一些特殊的UI结构
// e.g.将某个组件渲染到模态框（modal）之外的根DOM节点中
