import { Component } from 'react'

import classes from './User.module.css'

// 需要继承Component，使类作为一个组件工作
// 最重要的是父类Component中有默认属性
class User extends Component {
  componentWillUnmount() {
    console.log('User will unmount!')
  }

  // render是React期望的一个特定方法，当React发现JS代码中使用的组件时候，将调用该方法
  // React将调用render方法来找出应该渲染到屏幕上的内容（等同于函数组件的return语句）
  render() {
    return <li className={classes.user}>{this.props.name}</li>
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>
// }

export default User
