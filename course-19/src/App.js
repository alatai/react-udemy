import Counter from './components/Counter'

const App = () => {
  return <Counter />
}

export default App

/*
Redux是一个跨组件或应用范围状态的状态管理系统
可以帮助我们管理状态、更改和影响应用程序的数据以及在屏幕上显示的内容
可以帮助我们跨多个组件甚至整个应用程序管理此类数据

State可以分为
1.Local State
  改变的数据影响属于单个组件的UI，如果它更复杂，可以使用useReducer
2.Cross-component State
  状态不仅影响一个组件，而且影响多个组件，也可以使用useState或useReducer
  只需要传递props，可以在多个组件之间传递函数作为prop，这样不同组件就可以一起管理状态
3.App-wide State
  不仅影响多个组件，而且基本上影响应用程序的所有组件
  也可以通过useState，useReducer传递状态值和更新完整属性的函数来管理

对于跨组件和应用程序范围的状态，传递数据和更新函数可能回变得很麻烦
使用React Context，可以更轻松地管理跨组件或应用程序范围的状态
这是简化跨组件和应用程序范围的状态管理的一种方法

Redux解决了相同问题
为什么需要Redux？(React Context有几个潜在的缺点)
1.可能会有一个非常复杂的设置，使用React Context管理状态可能会变得非常复杂
2.另一个潜在的缺点可能是性能

Redux就是在应用中有一个中央数据存储，一个Store使用于整个应用的所有状态
我们将数据存储在Store中，以便我们可以从组件内部使用它

重要规则：
组件从来都不重要，永远不要直接操作存储数据（组件不直接操作Store中的数据）

使用Reducer，设置reducer函数，通过函数负责更改存储数据
（这里的reducer函数并不是reducer钩子-useReducer）
Reducer函数是一个概念，通通常会进行转换，输入并吐出一个新的结果

Action和Dispatch（组件触发了某些行为）
一个Action实际上只是一个简单的JavaScript对象，它描述了Reducer应该执行的操作类型
然后Redux将操作转发给Reducer，读取所需操作的描述，这个操作由Reducer执行
 */
