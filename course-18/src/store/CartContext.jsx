import { createContext, useReducer } from 'react'

// 这个最终用createContext创建的上下文是一个具有provider属性的对象
const CartContext = createContext({
  items: [],
  addItem: Function,
  removeItem: Function,
  clearCart: Function,
})

// 目标是返回一个更新的状态
// action对象将告诉函数如何更新这个状态
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    // 不应该这样改变现有的状态，因为push会编辑已经存在内存中的现有项目数组
    // 它会在cartReducer执行之前改变状态值
    // state.items.push(action.item)

    // findIndex接收一个函数作为参数，这个函数将对item数组中的每一个元素执行
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )

    // 将现有项目扩展到其中
    const updatedItems = [...state.items]

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex]
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      }

      updatedItems[existingCartItemIndex] = updateItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )

    const existingCartItem = state.items[existingCartItemIndex]
    const updatedItems = [...state.items]

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1)
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return { ...state, items: updatedItems }
  }

  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      items: [],
    }
  }

  return state
}

// provider组件，可以将其包装在我们的组件上
// 以使上下文对它们有用
export const CartContextProvider = ({ children }) => {
  // 同样允许管理状态，通常会使管理复杂状态变得简单，需要一个reducer函数
  // 传递一个reducer函数的指针和初始状态值
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  const addItem = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item })
  }

  const removeItem = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id })
  }

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' })
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartContext
