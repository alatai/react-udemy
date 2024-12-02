// 从代码内部触发导航操作 - useNavigate
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {
  // 可以被调用来触发导航操作
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate('/products')
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        {/* 
          对于以下做法
          从技术上讲，我们正在向服务于此网站的服务器发送新请求，
          现在该服务器将返回构成该单页应用程序的单个HTML页面。
          但在幕后发生的是，我们再次加载所有JavaScript代码，
          再次加载整个React应用程序并重新启动React应用。
          这是很多不必要的工作，也会影响网站的性能。
          通常希望避免，因为我们已经加载了所有的JavaScript代码。
          不想重新启动React应用程序，如果这样做，我们会丢失任何上下文或
          应用程序范围的状态。
          
          所以我们不想通过向服务器发送新的HTTP请求来切换页面，这样一来
          我们就失去了单页应用的所有好处。

          我们希望有一个链接，它应该只是更改URL并且设置为我们试图导航到的URL。
          但它应该阻止发送请求的默认值，而是让React Router知道新的URL，
          并确保React Router为该新URL加载适当的元素。

          引出 Link。。。
          Link组件在后台确实呈现了一个锚点元素，但它监听了对该元素的点击，
          阻止了浏览器在点击链接时发送HTTP请求的默认设置。
          而是查看路由定义以相应的更新页面，并加载适当的内容。
          它还将更改URL，但不发送新的HTTP请求。
         */}
        {/* Go to <a href="/products">the list of products</a>{' '} */}
        Go to <Link to="products">the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  )
}

export default HomePage
