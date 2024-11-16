import { useCallback, useEffect, useState } from 'react'

const sentHttpRequest = async (url, config) => {
  const response = await fetch(url, config)

  const resData = await response.json()

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    )
  }

  return resData
}

const useHttp = (url, config, initialData) => {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const clearData = () => {
    setData(initialData)
  }

  // 为了确保不会进入无限循环，应该用useCallback包装这个函数
  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true)

      try {
        // 由于使用了async，sentHttpRequest将返回一个promise对象
        // 添加await把解析后的数据存储在resData
        const resData = await sentHttpRequest(url, { ...config, body: data })
        setData(resData)
      } catch (error) {
        setError(error.message || 'Something went wrong!')
      }

      setIsLoading(false)
    },
    [url, config]
  )

  // 调用useEffect是这个自定义hook更方便
  // sendRequest是这个effect函数的一个依赖项
  // 因为它是在request函数之外定义的，所以在这里添加它
  useEffect(() => {
    if ((config && (config === 'GET' || !config.method)) || !config) {
      sendRequest()
    }
  }, [sendRequest, config])

  return {
    data,
    isLoading,
    error,
    // 在这里返回，每个使用这个hook的组件都可以在任何想调用的地方调用sendRequest
    sendRequest,
    clearData,
  }
}

export { useHttp }
