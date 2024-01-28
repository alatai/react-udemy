import { useRef, useState, useEffect, useCallback } from 'react'

import Places from './components/Places.jsx'
import { AVAILABLE_PLACES } from './data.js'
import Modal from './components/Modal.jsx'
import DeleteConfirmation from './components/DeleteConfirmation.jsx'
import logoImg from './assets/logo.png'
import { sortPlacesByDistance } from './loc.js'

// 避免使用useEffect
// 在初始化代码前，使用localStorage来初始化pickedPlaces的状态
// 因此此代码是同步的，并且不需要花费时间来完成
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
)

const App = () => {
  const selectedPlace = useRef()
  // managing modal in a declarative way
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces)

  // side Effect，此时这个函数与组件的主要目标没有直接关系
  // 每个组件的主要目标都是返回可呈现的JSX代码
  // 第一个参数是一个函数，包装副作用代码
  // 第二个参数是该函数的依赖数组,如果定义了这个依赖数组
  // React会查看指定的依赖项，只有在依赖项发生了更改才会执行参数一的函数
  useEffect(() => {
    // navigator全局对象，代表了当前浏览器的信息和状态
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      )

      // 单独使用会形成无限循环，调用这样的状态更新函数会告诉React重新执行状态所属的组件函数
      setAvailablePlaces(sortedPlaces)
    })
    // 这里只在第一次执行此应用组件函数后执行一次
    // 如果省略第二个参数，则参数一的函数将在每个应用组件渲染周期后执行（无限循环）
  }, [])

  const handleStartRemovePlace = (id) => {
    setModalIsOpen(true)
    selectedPlace.current = id
  }

  const handleStopRemovePlace = () => {
    setModalIsOpen(false)
  }

  const handleSelectPlace = (id) => {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id)
      return [place, ...prevPickedPlaces]
    })

    // JavaScript的一个全局对象，用于在浏览器中存储键值对数据
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]))
    }
  }

  // 返回一个记忆化的回调函数
  // 主要作用是在依赖变化时，避免创建新的回调函数，从而优化性能
  // 第一个参数是回调函数
  // 第二个参数是一个依赖数组
  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    )
    setModalIsOpen(false)

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    )
    // 这个依赖关系数组与useEffect的依赖关系数组完全一样
  }, [])

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App

// Side effects are "tasks" that don't impact the current component render cycle
// 不是所有的副作用都需要使用useEffect，因为过度使用useEffect和不必要的使用被认为是一种不好的做法
// 因为会有一个额外的执行周期，它是在应用组件或使用的任何组件之后触发
