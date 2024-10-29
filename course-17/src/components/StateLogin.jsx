import Input from './Input'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation'
import { useInput } from '../hooks/useInput'

const Login = () => {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value))

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6))

  const handleSubmit = (event) => {
    // 阻止浏览器默认行为
    event.preventDefault()
    if (emailHasError || passwordHasError) {
      return
    }
 
    console.log(emailValue)
    console.log(passwordValue)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label="Email"
          id="email"
          name="email"
          value={emailValue}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          error={emailHasError && 'Please enter a valid email!'}
        />
        <Input
          label="Password"
          id="password"
          name="password"
          value={passwordValue}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          error={passwordHasError && 'Please enter a valid password!'}
        />
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
