import { useRef, useState, useCallback } from 'react'

import Places from './components/Places.jsx'
import Modal from './components/Modal.jsx'
import DeleteConfirmation from './components/DeleteConfirmation.jsx'
import logoImg from './assets/logo.png'
import AvailablePlaces from './components/AvailablePlaces.jsx'
import { fetchUserPlaces, updateUserPlaces } from './http.js'
import Error from './components/Error.jsx'
import { useFetch } from './hooks/useFetch.js'

const App = () => {
  const selectedPlace = useRef()

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  // 如果使用了自定义Hooks，那么该自定义Hooks管理的任何状态都将属于正在使用自定义Hooks的组件
  const {
    isFetching,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
    error,
  } = useFetch(fetchUserPlaces, [])

  const handleStartRemovePlace = (place) => {
    setModalIsOpen(true)
    selectedPlace.current = place
  }

  const handleStopRemovePlace = () => {
    setModalIsOpen(false)
  }

  const handleSelectPlace = async (selectedPlace) => {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = []
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces
      }
      return [selectedPlace, ...prevPickedPlaces]
    })

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces])
    } catch (error) {
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places.',
      })
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      )

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        )
      } catch (error) {
        setUserPlaces(userPlaces)
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        })
      }

      setModalIsOpen(false)
    },
    [userPlaces, setUserPlaces]
  )

  const handleError = () => {
    setErrorUpdatingPlaces(null)
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
        {error && <Error title="An error occurred!" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  )
}

export default App

/**
 * Rules of Hooks
 * 1.Only call Hooks in Component or Other Hook Functions
 *    React Hooks must not be called outside of React component functions or other Hook functions
 * 2.Only call Hooks on the top level
 *    React Hooks must not be in nested code statements(e.g., inside of if-statements)
 *
 * 构建自定义Hooks背后的想法始终是包装和重用进入组件函数的代码
 * 自定义Hooks将是我们可以从不同位置调用的函数，但它们将是保证在有效位置使用的函数
 */
