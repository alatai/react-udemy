// React提供另一个状态管理Hook，useReducer
import { createContext, useReducer } from 'react'

import { DUMMY_PRODUCTS } from '../dummy-products.js'

// createContext生成的值实际上是一个包含React组件的对象
// 可以向createContext传递一个值，被用作初始值可以提供给React应用中的多个组件
// 提供给所有将被这个上下文包装的组件
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
})

// 这个函数不应该在组件函数执行时创新创建，因为它不需要直接访问组件函数中定义或更新的任何值
// 这个reducer函数最终会在调度一个action之后被react调用
// state是由useReducer管理的该状态的最新状态快照
const shoppingCartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items]

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    )
    const existingCartItem = updatedItems[existingCartItemIndex]

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      )
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      })
    }

    return {
      // not needed here because we have only one value
      ...state,
      items: updatedItems,
    }
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items]
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.p
    )

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    }

    updatedItem.quantity += action.payload.amount

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1)
    } else {
      updatedItems[updatedItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
    }
  }

  return state
}

const CartContextProvider = ({ children }) => {
  // useReducer接受一个reducer函数和一个初始状态，并返回当前状态和一个dispatch函数
  // reducer函数负责根据不同的动作类型更新状态，并返回新的状态
  // dispatch函数用于触发对应的动作，并将动作类型和可选的数据传递给reducer函数
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    // 第二个参数允许为这个state设置一个初始值
    { items: [] }
  )

  const handleAddItemToCart = (id) => {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    })
  }

  const handleUpdateCartItemQuantity = (productId, amount) => {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: { productId, amount },
    })
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  }

  return (
    // 访问由React创建的上下文对象的Provider
    // 一个组件名包含一个，实际的组件是某个对象中的某个属性
    // The default value set when creating the context is only uesed if
    // a component that was not wrapped by the Provider component tries
    // to access the context value
    // 确保将CartContext提供程序与任何其他组件的JSX代码一起包装
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  )
}

export default CartContextProvider
