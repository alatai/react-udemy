import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'
import { useEffect } from 'react'
import { getTokenDuration } from '../util/auth'

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData()
  const submit = useSubmit()

  // 利用useEffect处理token时效问题（有缺陷）
  useEffect(() => {
    if (!token) {
      return
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'POST' })
      return
    }

    const tokenDuration = getTokenDuration()
    console.log('tokenDuration = ', tokenDuration)

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' })
    }, tokenDuration)
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
