import { useState } from 'react'

/**
 * 自定义Hooks
 * 在React中有以下规则，以use开头的函数被视为钩子，React项目通常会寻找以use开头的函数
 * 并在这些函数上强制执行某些规则
 */
const useInput = (defaultValue, validationFunction) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [didEdit, setDidEdit] = useState(false)

  const valueIsValid = validationFunction(enteredValue)

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value)
    setDidEdit(false)
  }

  const handleInputBlur = () => {
    setDidEdit(true)
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  }
}

// 在JavaScript中，const声明的函数只是一个变量，无法直接使用export导出
export { useInput }
