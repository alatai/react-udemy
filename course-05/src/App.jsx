import { useState } from 'react'

import Header from './components/Header'
import Results from './components/Results'
import UserInput from './components/UserInput'

const App = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  const inputIsValid = userInput.duration >= 1

  const handleChange = (inputIdentifier, newValue) => {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        // 使用“+”将强制这个字符串值转换为数字值
        [inputIdentifier]: +newValue,
      }
    })
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!inputIsValid && (
        <p className="center">Please enter a duration greater than zero.</p>
      )}
      {inputIsValid && <Results userInput={userInput} />}
    </>
  )
}

export default App
