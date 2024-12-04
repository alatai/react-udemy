import { Outlet } from 'react-router-dom'

import EventsNavigation from '../components/EventsNavigation'

const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation /> 
      <main>
        {/* 
          使用Outlet组件是为了让EventsRoot组件作为其他页面的包装器
        */}
        <Outlet />
      </main>
    </>
  )
}

export default EventsRootLayout
