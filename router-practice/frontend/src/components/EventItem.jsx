import { Link, useSubmit } from 'react-router-dom'

import classes from './EventItem.module.css'

const EventItem = ({ event }) => {
  // 通过特殊的useSubmit Hook，以编程的方式提交数据和触发操作
  // 返回一个提交函数
  const submit = useSubmit()

  const startDeleteHandler = () => {
    const process = window.confirm('Are you sure?')

    if (process) {
      // 参数一：想要提交的数据（自动包装在一个表单数据对象中），不需要可设为null
      // 参数二：类同设置表单属性
      submit(null, { method: 'DELETE' })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  )
}

export default EventItem
