import { useEffect, useState } from 'react'
import MealItem from './MealItem.JSX'

const Meals = () => {
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

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  )
}

export default Meals
