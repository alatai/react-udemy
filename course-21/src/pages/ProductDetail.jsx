import { useParams, Link } from 'react-router-dom'

const ProductDetail = () => {
  // 用于获取实际使用的值，而不是占位符
  // JavaScript对象，包含在路由中定义为参数的每个动态路径值
  const params = useParams()

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.id}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  )
}

export default ProductDetail
