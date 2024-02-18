import { Fragment, Component } from 'react'

import Users from './Users'
import classes from './UserFinder.module.css'
import UserContext from '../store/users-context'
import ErrorBoundary from './ErrorBoundary'

// const DUMMY_USERS = [
//   { id: 'u1', name: 'Max' },
//   { id: 'u2', name: 'Manuel' },
//   { id: 'u3', name: 'Julie' },
// ]

class UserFinder extends Component {
  // 在基于函数组件中，使用useContext，可以通过多次调用useContext并指向不同的
  // context来获取同一个组件中的多个context内容
  // 但是对于基于类的组件是不可能的，因为只能将一个基于类的组件连接到一个context
  // 可以通过添加一个静态属性来实现，告诉React这个组件可以访问UserContext（但是只能设置一次static）
  // 如果有两个context应该连接到同一个组件上的一个context
  static contextType = UserContext

  constructor() {
    super()
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    }
  }

  // 在第一次呈现这个组件时获取用户，只会在组件最初第一次呈现时运行
  componentDidMount() {
    // Send http request...

    this.setState({
      // filteredUsers: DUMMY_USERS,
      filteredUsers: this.context.users,
    })
  }

  // 这个方法将被React自动调用
  componentDidUpdate(prevProps, prevState) {
    // 防止无限循环，但在useEffect中不需要这样的条件判断
    // 因为可以将搜索项指定为依赖项，如果依赖项发生变化，这个受影响的函数将由React执行
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      })
    }
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  render() {
    return (
      <Fragment>
        {/* 可以使用context的consumer来使用 */}
        {/* <UserContext.Consumer></UserContext.Consumer> */}
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    )
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS)
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     )
//   }, [searchTerm])

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value)
//   }

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   )
// }

export default UserFinder
