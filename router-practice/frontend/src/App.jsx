// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Events, { loader as eventsLoader } from './pages/Events'
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail'
import NewEvent from './pages/NewEvent'
import EditEvent from './pages/EditEvent'
import Root from './pages/Root'
import EventsRootLayout from './pages/EventsRoot'
import Error from './pages/Error'
import { action as manipulateEventAction } from './components/EventForm'
import Newsletter, { action as newsletterAction } from './pages/Newsletter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // 只要在任何路由相关代码中生成错误，错误元素就会显示在屏幕上
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            // React路由器可以帮助加载数据(React Router版本 >= 6)
            // 不必编写所有用于获取数据和处理不同状态的编码
            // loader需要一个函数作为值
            // 访问该路由时，这个函数会被触发并执行
            // React Router将会自动接收在该函数中返回的任何值
            // 从技术上讲，加载器函数会返回一个Promise
            // 该函数中返回的任何数据都将被Promise包装（async await工作方式）
            // 但是React Router会检查Promise是否并自动从该Promise中获取解析数据
            loader: eventsLoader,
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEvent />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEvent />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
