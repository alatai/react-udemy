import { redirect } from 'react-router-dom'

import AuthForm from '../components/AuthForm'

const AuthenticationPage = () => {
  return <AuthForm />
}

export default AuthenticationPage

export const action = async ({ request }) => {
  // 使用浏览器提供的内置URL构造函数传递请求，访问searchParams对象
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'

  if (mode !== 'login' && mode !== 'signup') {
    throw new Response(JSON.stringify({ message: 'Unsupported mode.' }), {
      status: 422,
    })
  }

  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if (response.status === 422 || response.status === 401) {
    return response
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not authenticate user.' }),
      { status: 500 }
    )
  }

  const resData = await response.json()
  const token = resData.token

  // 存储token的方式
  // ①cookie
  // ②localstorage
  // ...
  localStorage.setItem('token', token)
  // 设置过期时间
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + 10)
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/')
}
