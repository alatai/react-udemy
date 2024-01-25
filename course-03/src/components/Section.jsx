// ...: This JavaScript feature is called "Rest property"
// This syntax groups all remaining object properties into
// a new object (named "props" in this case)
const Section = ({ title, children, ...props }) => {
  return (
    // prop不会自动转换并设置在自定义组件中使用的内置元素属性
    // <section id={id} className={className}>
    // 使用一种模式，转发or代理
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Section
