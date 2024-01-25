import { styled } from 'styled-components'

import logo from '../assets/logo.png'
// 可以任意命名，但classes是一个合适的名称
// 这个对象将包含转换唯一类名的功能
// import classes from './Header.module.css'

// 使用&类似于this？
const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;

  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  & p {
    text-align: center;
    color: #a39191;
    margin: 0;
  }

  @media (min-width: 768px) {
    & {
      margin-bottom: 4rem;
    }

    & h1 {
      font-size: 2.25rem;
    }
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      {/* 内联样式中，不是必须使用的一些特殊的双花括号语法来样式化 */}
      <p
      // className={classes.paragraph}
      // style={{
      // color: 'red',
      // 省略破折号，采用驼峰表示法
      // textAlign: 'center',
      // }}
      >
        A community of artists and art-lovers.
      </p>
    </StyledHeader>
  )
}

export default Header
