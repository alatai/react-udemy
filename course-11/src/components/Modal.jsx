import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ open, children, onClose }) => {
  const dialog = useRef()

  // useEffect可以帮助将prop值或state值同步到DOM
  useEffect(() => {
    if (open) {
      dialog.current.showModal()
    } else {
      dialog.current.close()
    }
  }, [open])

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* 解决setTimeout方法在一开始设置问题 */}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  )
}

export default Modal
