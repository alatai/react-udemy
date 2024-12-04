import { useLoaderData, Await } from 'react-router-dom'

import EventsList from '../components/EventsList'
import { Suspense } from 'react'

const EventsPage = () => {
  // 使用React Router loader中加载的数据（访问“最近的加载器数据”）
  // useLoaderData最终会得到Promise的真正数据
  const { events } = useLoaderData()

  // if (data.isError) {
  // return <p>{data.message}</p>
  // }

  // const events = data.events

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' }
    // 使用以下代替返回错误对象
    // throw { message: 'Could not fetch events.' }
    // throw new Error()

    // 抛出一个响应，可以包含额外的状态属性。有助于构建一个通用的错误处理组件
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    })

    // 使用json，react-router-dom导入的函数
    // 它创建一个包含接送格式数据的响应数据
    // return json({ message: 'Could not fetch events.' }, { status: 500 })
  } else {
    const resData = await response.json()

    // 可以手动返回一个响应对象
    // 这是内置在浏览器中的，现代浏览器的一个功能
    // 需要注意的是，此加载器代码不会在服务器上执行
    // 这一切仍然发生在浏览器中（这是客户端代码）
    // 当在加载器中返回这样的响应时，
    // React Router将在使用useLoaderData时自动从响应中提取数据
    // const res = new Response('and data', { status: 201 })

    return resData.events
    // return response
  }
}

// 页面的加载器将在开始导航到该页面时被调用
// 而不是在页面组件呈现之后，而是在实际访问之前
export const loader = () => {
  return  {
    events: loadEvents(),
  }
}
