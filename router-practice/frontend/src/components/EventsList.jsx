import { Link } from 'react-router-dom'

import classes from './EventsList.module.css'

const EventsList = ({ events }) => {
  // 注意：不能从更高级的定义位置从路由中获取数据
  // 可以从同一层或者更低层访问路由加载器
  // const events = useLoaderData()

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventsList
