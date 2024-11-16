// 使用React的portal功能
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ children, open, onClose, className = '' }) => {
  const dialog = useRef()

  useEffect(() => {
    const modal = dialog.current

    if (open) {
      modal.showModal()
    }

    // 清理函数，每当这个效果即将再次运行时，它就会被执行
    // 这个cleanup函数会在第一次运行时比effect函数晚一点运行
    // 因为cleanup函数只会在将来某个时候值改变时运行
    return () => modal.close()
  }, [open])

  // 第一个参数为呈现的内容
  // 第二个参数为真正的DOM元素
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  )
}

export default Modal
