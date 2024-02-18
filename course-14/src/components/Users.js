import { Component } from 'react'
import User from './User'

import classes from './Users.module.css'

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ]

class Users extends Component {
  // 可以再构造函数中初始化state
  constructor() {
    // 需要调用super
    super()
    // 通过访问这个state来完成，并将其设置为对象
    // 在基于类的组件中，state总是一个对象（使用功能组件，state可以是任何状态）
    // 因为对于基于类的组件，始终将组件中可能需要的所有state放到一个状态对象中
    // (And it also has to be a property named "state", this name is NOT up to you.)
    this.state = {
      showUsers: true,
      // moreState: ...
    }
  }

  // 生成一个错误，当用户不存在是报错
  componentDidUpdate() {
    // 常规JavaScript中为了让程序不错误，可以使用try catch
    // 如果一个错误是在一个组件内部生成的，我们不能再那个组件中处理它
    // 这种情况下可以构建并利用错误边界
    if (this.props.users.length === 0) {
      throw new Error('No users provided!')
    }
  }

  // 可以将函数添加到render方法中，但是由于这是一个类
  // 可以通过将所有功能分组在该类中
  toggleUsersHandler() {
    // this.state.showUsers = false // NOT!
    // 调用一个特殊方法setState（由父类提供），并且总是接受一个对象
    // 这个对象现在包含了新的状态， 但是它不会覆盖旧的状态
    // 而是在幕后，将传递的对象和现有的state合并，也支持更新函数
    this.setState((curState) => {
      // 如果使用函数，必须返回一个对象
      return {
        showUsers: !curState.showUsers,
      }
    })
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    )

    return (
      <div className={classes.users}>
        {/* 需要指向这个toggleUserHandler，用来指向this类的该方法 */}
        {/* 需要确保方法中的this关键字引用了类，在默认情况下当方法被任何事件调用时 */}
        {/* 为了解决这个问题，可以使用bind() */}
        {/* 意味着这个方法中的this关键字，现在被设置为与this关键字具有相同的上下文或值 */}
        {/* 当代码被解析时，this关键字将引用这个类 */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true)

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState)
//   }

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   )

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   )
// }

export default Users
