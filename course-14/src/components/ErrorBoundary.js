import { Component } from 'react'

// 错误边界组件是常规的基于类的组件
// 但它是实现componentDidCatch生命周期方法的类组件
class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
  }

  // componentDidCatch生命周期方法可以添加到任何基于类的组件当中
  // 无论何时将其添加到类组件中，都会使基于类的组件成为错误边界
  componentDidCatch(error) {
    console.log(error)
    this.setState({
      hasError: true,
    })
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>
    }

    // 将错误边界组件包装在应该被该组件保护的组件周围
    return this.props.children
  }
}

export default ErrorBoundary
