import { useState } from 'react'
import { styled } from 'styled-components'

import Button from './Button'
import Input from './Input'

// style是一个JavaScript对象，用点符号访问不同属性
// 这些属性映射到HTML元素
// e.g. 将创建一个div作为一个单独的组件，这个组件将包含任何想要的样式
// 语法：需要在最后添加``符号（JavaScript语法，不是React或该包中的语法）
// 可以编写标准的CSS代码，可以使用${}构造动态字符，动态字符中可以使用prop
// 使用prop时，注意确保不会与元素默认内置prop冲突
// 这段代码将提供一个组件，它自动返回一个应用了这些样式的div
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;`

const AuthInputs = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (identifier, value) => {
    if (identifier === 'email') {
      setEnteredEmail(value)
    } else {
      setEnteredPassword(value)
    }
  }

  const handleLogin = () => {
    setSubmitted(true)
  }

  const emailNotValid = submitted && !enteredEmail.includes('@')
  const passwordNotValid = submitted && enteredPassword.trim().length < 6

  return (
    <div id="auth-inputs">
      <ControlContainer>
        {/* <p className="paragraph"> */}
        {/* 在className上动态设置值，并通过反向标记“`”将其设置为模板字符 */}
        {/* 这是在JavaScript中创建字符串的另一种方法 */}
        {/* 当使用这种方法创建字符串时，可以使用特殊的JavaScript语法 */}
        {/* ${}：动态注入值到字符串 */}
        {/* styled-components解决方案，可以添加prop */}
        {/*  */}
        {/* <Label */}
        {/* $invalid={emailNotValid} */}
        {/* // className={`label ${emailNotValid ? 'invalid' : ''}`} */}
        {/* > */}
        {/* Email */}
        {/* </Label> */}
        <Input
          label="Email"
          type="email"
          invalid={emailNotValid}
          // 使用“&&”时，会将false/true作为class名（报错）
          // className={emailNotValid ? 'invalid' : undefined}
          // 条件内联样式
          // style={{
          // backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db',
          // }}
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        {/* </p> */}
        <Input
          label="Password"
          type="password"
          invalid={passwordNotValid}
          // className={passwordNotValid ? 'invalid' : undefined}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
        />
      </ControlContainer>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  )
}

export default AuthInputs
