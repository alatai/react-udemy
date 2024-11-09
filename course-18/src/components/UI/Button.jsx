const Button = ({ children, textOnly, className, ...props }) => {
  const cssClasses = textOnly
    ? `text-button ${className}`
    : `button ${className}`

  // 仍然可以像内置按钮一样使用这个自定义按钮
  // 如果讲一个自定义组件包装在某个组件周围，包装在一些文本或JSX代码周围
  // 则该文本或JSX代码将通过内置的children属性接收
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
