import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
  useActionData,
} from 'react-router-dom'

import classes from './EventForm.module.css'

const EventForm = ({ method, event }) => {
  // 返回action中的数据（访问最接近的动作）
  const data = useActionData()
  const navigate = useNavigate()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  const cancelHandler = () => {
    navigate('..')
  }

  return (
    // 使用react-router的Form组件，请求将不会直接发送给后端
    // 而是发送给action函数
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {/* JavaScript内置函数，可以循环遍历errors对象中的所有键 */}
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        {/* 如果正在提交，此按钮将被禁用 */}
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  )
}

export default EventForm

// 处理向后端提交逻辑
export const action = async ({ request, params }) => {
  const method = request.method
  const data = await request.formData()

  const eventData = {
    // 通过name属性获取输入值
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  let url = 'http://localhost:8080/events'

  if (method === 'PATCH') {
    const id = params.id
    url = 'http://localhost:8080/events/' + id
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (response.status === 422) {
    // 若后端验证发现错误，在不需要重定向直接返回响应
    return response
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not save event.' }), {
      status: 500,
    })
  }

  // redirect创建了一个响应对象，将用户重定向到不同页面
  return redirect('/events')
}
