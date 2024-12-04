// import { useParams } from 'react-router-dom'
import { useRouteLoaderData, redirect, Await } from 'react-router-dom'

import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'
import { Suspense } from 'react'

const EventDetail = () => {
  // const params = useParams()
  const { event, events } = useRouteLoaderData('event-detail')

  // if (data.isError) {
  // return <p>{data.message}</p>
  // }

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetail

const loadEvent = async (id) => {
  const response = await fetch('http://localhost:8080/events/' + id)

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch details for selected event.',
      }),
      { status: 500 }
    )
  } else {
    const resData = await response.json()
    return resData.event
  }
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events')

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    })
  } else {
    const resData = await response.json()
    return resData.events
  }
}

// 在加载器中访问路由参数
export const loader = async ({ params }) => {
  const id = params.id

  return {
    // 也可以使用await控制延迟加载
    event: await loadEvent(id),
    events: loadEvents(),
  }
}

export const action = async ({ request, params }) => {
  const id = params.id
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  })

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not delete event.' }), {
      status: 500,
    })
  }

  return redirect('/events')
}
