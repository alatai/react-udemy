// import { useState } from 'react'
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom'

import classes from './AuthForm.module.css'

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true)

  // function switchAuthHandler() {
  // setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin)
  // }

  // 使用URL参数的优点（代替useState方案）
  // 可以在注册或登录模式下直接链接到该页面
  // 就可以直接将用户链接到注册页面
  // useSearchParams返回一个数组，因此可以使用数组结构来访问元素
  // 第一个元素：对象类型，允许我们访问当前设置的查询参数
  // 第二个元素：函数类型，允许我们更新当前设置的查询参数
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'

  // 处理新增时的返回的服务端错误
  const data = useActionData()

  // 处理表单提交状态
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {/* 使用路由代替按钮，添加URL参数 */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  )
}

export default AuthForm
