import { useEffect, useState } from 'react'

/**
 * 自定义Hooks
 * 在React中有以下规则，以use开头的函数被视为钩子，React项目通常会寻找以use开头的函数
 * 并在这些函数上强制执行某些规则
 */
const useFetch = (fetchFn, initialValue) => {
  const [isFetching, setIsFetching] = useState()
  const [error, setError] = useState()
  const [fetchedData, setFetchedData] = useState(initialValue)

  // 包装useEffect代码
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      try {
        const data = await fetchFn()
        setFetchedData(data)
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' })
      }

      setIsFetching(false)
    }

    fetchData()

    // 添加fetch函数作为依赖项，因为这是一些外部数据，在useEffect中没有定义
    // 理论上可以改变，如果它改变了，应该再次执行useEffect
    // 以便可以根据最新的可用fetch函数正确地获取数据
  }, [fetchFn])

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  }
}

// 在JavaScript中，const声明的函数只是一个变量，无法直接使用export导出
export { useFetch }
