import { useRef, useState } from 'react'

const Login = () => {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false)

  const email = useRef()
  const password = useRef()

  const handleSubmit = (event) => {
    // 阻止浏览器默认行为
    event.preventDefault()
    // current属性将保存实际连接的值
    // 这种方法的缺点是，重置这些值有点困难（实际上不鼓励使用ref来操作DOM）
    const enteredEmail = email.current.value
    const enteredPassword = password.current.value

    console.log(`${enteredEmail} ${enteredPassword}`)

    // 在提交时做输入验证
    const emailIsValid = enteredEmail.includes('@')

    if (!emailIsValid) {
      setEmailIsInvalid(true)
      return
    }

    setEmailIsInvalid(false)
    console.log('Sending HTTP request...')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          {/* htmlFor: 与原生html的for等效 */}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        {/* 登录、重置按钮，都会生成请求并将这些请求发送到为站点提供服务的服务器 */}
        {/* 防止这种情况发生的一种方法是添加type属性和prop（因为默认类型是submit） */}
        {/* 另一种方法通过不设置任何类型，并删除onClick监听，而是将onSubmit事件的prop添加到Form */}
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  )
}
export default Login
