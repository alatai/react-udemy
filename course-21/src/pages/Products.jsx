import { Link } from 'react-router-dom'

const PRODUCTS = [
  { id: '1', title: 'Product 1' },
  { id: '2', title: 'Product 2' },
  { id: '3', title: 'Product 3' },
]

const ProductsPage = () => {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProductsPage
