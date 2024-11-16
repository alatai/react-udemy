// import { useEffect, useState } from 'react'
import Error from './Error.jsx'
import MealItem from './MealItem.JSX'
import { useHttp } from './hooks/useHttp.js'

const requestConfig = {}

const Meals = () => {
  /*
  const [loadedMeals, setLoadedMeals] = useState([])
  
  useEffect(() => {
    // React不允许将组件函数转换为async函数
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/meals', {
        method: 'GET',
      })

      if (!response.ok) {
        // ...
      }

      const meals = await response.json()
      setLoadedMeals(meals)
    }

    fetchMeals()

    // 可以将fetchMeals函数留在这个effect函数之外
    // 但是必须将其作为依赖项添加（因为在effect中使用了一些在effect外定义的内容）
    // 可能必须使用useCallback，以避免每次重新执行组件函数时都发生变化
  }, [])
  // }, [fetchMeals])
  */

  const {
    // loadedMeals的初始值在请求完成之前都是未定义的
    // 组件函数不会等待请求完成才能工作
    // JSX代码将被解析并立即转换为HTML代码
    data: loadedMeals,
    isLoading,
    error,
    // initialData：确保第一次渲染时，不会输出任何项目
  } = useHttp('http://localhost:3000/meals', requestConfig, [])

  if (isLoading) {
    return <p className="center">Fetching meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  )
}

export default Meals
