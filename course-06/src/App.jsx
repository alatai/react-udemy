import AuthInputs from './components/AuthInputs.jsx'
import Header from './components/Header.jsx'

const App = () => {
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
      </main>
    </>
  )
}

export default App

// CSS Modules是一种方法，一种解决方案
// 最终需要由React项目中使用的构建过程实现和实施
// 它不是默认的浏览器或JavaScript功能
// CSS Modules是一种方法，其中构建工具将转换CSS类名，并且仅转换确保每个文件唯一的两个类名

// styled components第三方组件，不必在单独的CSS文件中定义CSS规则和样式
// 不是作为内联样式，而是在这个包的帮助下构建特殊组件中定义
