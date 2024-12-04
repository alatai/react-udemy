import { useFetcher } from 'react-router-dom'

import classes from './NewsletterSignup.module.css'
import { useEffect } from 'react'

const NewsletterSignup = () => {
  // 管理独立于页面加载逻辑的网络请求,允许在无需触发路由导航的情况下
  // 执行数据请求或提交操作，适合小组件中的动态数据交互（如表单提交、按钮点击加载等）
  const fetcher = useFetcher()
  const { data, state } = fetcher

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message)
    }
  }, [data, state])

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        name="email"
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  )
}

export default NewsletterSignup
