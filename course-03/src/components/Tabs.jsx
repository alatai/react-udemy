// 直接传入ButtonsContainer也行
const Tabs = ({ children, buttons, ButtonsContainer }) => {
  // 首字母大写（很重要）
  // 在这种情况下，它可以用作自定义组件，因为它以大写字母开头
  // const ButtonsContainer = buttonsContainer;

  return (
    <>
      {/* 不起作用，这将寻找一个名为buttonsContainer的内置元素 */}
      {/* <buttonsContainer>{buttons}</buttonsContainer> */}
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  )
}

export default Tabs
 