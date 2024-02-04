import { useState } from 'react'

import QuestionTimer from './QuestionTimer'
import Answers from './Answers'
import QUESTIONS from '../questions'

const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  })

  let timer = 1000 * 10

  const handleSelectAnswer = (answer) => {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    })

    // 如果有一个选择的答案，则把计时器设置为1000毫秒，1000毫秒后显示正确答案
    if (answer.selectedAnswer) {
      timer = 1000
    }

    if (answer.isCorrect !== null) {
      timer = 2000
    }

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      })

      setTimeout(() => {
        onSelectAnswer(answer)
      }, 2000)
    }, 1000)
  }

  let answerState = ''

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong'
  } else if (answer.selectedAnswer) {
    answerState = 'answered'
  }

  return (
    <div id="question">
      <QuestionTimer
        // 可以使用key来强制React销毁和重新创建组件
        // 设置为timer，当我们更改timer值时，会销毁并重新创建QuestionTimer组件
        key={timer}
        timeout={timer}
        // 只在没有选择答案的情况下触发此功能
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      {/* 最终的目标是随着问题的变化而重新洗牌，因此活动问题索引也会发生变化 */}
      {/* 如果在索引发生变化时销毁就得answers组件并创建一个新的实例， */}
      {/* 那么简单地重新创建answers组件是非常好的 */}
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  )
}

export default Question
