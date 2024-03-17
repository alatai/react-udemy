import Places from './Places.jsx'
import Error from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'
import { useFetch } from '../hooks/useFetch.js'

// 解决排序问题
// 标准的JavaScript特性：将非Promise的API转换为基于Promise特性的函数
const fetchSortedPlaces = async () => {
  const places = await fetchAvailablePlaces()

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      )
      resolve(sortedPlaces)
    })
  })
}

const AvailablePlaces = ({ onSelectPlace }) => {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
  } = useFetch(fetchSortedPlaces, [])

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
