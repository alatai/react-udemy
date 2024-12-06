import { redirect } from 'react-router-dom'

export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('expiration')
  const expirationDate = new Date(storedExpirationDate)
  const now = new Date()
  const duration = expirationDate.getTime() - now.getTime()

  return duration
}

export const getAuthToken = () => {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  } 

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token
}

export const tokenLoader = () => {
  return getAuthToken()
}

// 解决手动输入URL访问页面问题
export const checkAuthLoader = () => {
  const token = getAuthToken()

  if (!token) {
    return redirect('/auth')
  }

  // 路由加载器应该重定向到页面，或返回一个null
  // 路由加载器不会默认返回undefined
  return null
}
