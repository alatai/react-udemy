import { useEffect, useState } from 'react'

import Places from './Places.jsx'
import Error from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

const AvailablePlaces = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    // 由浏览器提供，可以用来向其他服务器发送HTTP请求的函数
    // fetch返回一个promise对象，这是一个JavaScript对象，最终将解释为一个值
    // 它基本上是一个包装对象，围绕着一个还不存在但最终会存在的值
    // 本例中，它是一个最终接收到的响应对象的包装器
    /*
    fetch('http://localhost:3000/places')
      // 可以添加then方法，并将一个函数传递给then方法
      // 在这个函数中，将自动接收响应对象。但是这个函数需要传递给它，只有在响应出现时才会被浏览器执行
      .then((response) => {
        // 将响应体解析为JSON，并返回一个Promise
        return response.json()
      })
      .then((resData) => {
        console.log(resData.places)
        setAvailablePlaces(resData.places)
      })
    */

    // 在现代JavaScript中，还可以使用await关键字来访问响应
    // 但只有在执行此代码的函数用async修饰时，才可以使用
    // 组件函数不允许使用async（React的默认限制）
    // const response = await fetch('http://localhost:3000/places')

    // 在函数内部创建新的函数，并使用async
    // 因为现在只是用户定义的一个函数，而不是React以任何特殊方式使用的函数
    const fetchPlace = async () => {
      setIsFetching(true)

      // 在async-await中可以使用try-catch
      try {
        const places = await fetchAvailablePlaces()

        await navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(sortedPlaces)
          setIsFetching(false)
        })
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.',
        })
        setIsFetching(false)
      }
    }

    fetchPlace()
  }, [])

  if (error) {
    return <Error title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  )
}

export default AvailablePlaces
