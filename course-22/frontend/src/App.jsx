import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import EditEventPage from './pages/EditEvent'
import ErrorPage from './pages/Error'
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail'
import EventsPage, { loader as eventsLoader } from './pages/Events'
import EventsRootLayout from './pages/EventsRoot'
import HomePage from './pages/Home'
import NewEventPage from './pages/NewEvent'
import RootLayout from './pages/Root'
import { action as manipulateEventAction } from './components/EventForm'
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

/*
  服务器端Session是解决身份验证或启用身份验证的一种很好的方法，
  但它们需要后端和前端之间的紧密耦合，因为后端必须存储有关客户端的信息。

  对于React应用程序，经常与解耦的后端API对话，这些API与客户端没有紧密耦合，
  也不存储任何客户端站点信息。解决：使用身份验证令牌

  身份验证令牌背后的想法是，在用户通过身份验证后，在服务器上我们创建但不存储权限令牌，
  它基本上是根据某种算法创建的字符串，其中包含一些信息。
  因此，我们在后端创建这样一个令牌，并将该令牌发送回客户端。它的有效性只能有创建该令牌
  的后端检查和证明，因为令牌是在只有后端知道的私钥的帮助下创建的。
  在将来从客户端到后端的请求中，我们将该令牌附加到这些请求中，后端能够查看该令牌，验证
  并查看它是否是由后端创建的令牌。如果它是一个有效的令牌，则授予对这些受保护资源的权限。
 */
