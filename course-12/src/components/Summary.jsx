import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions'

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((userAnswer) => userAnswer === null)
  const correctAnswers = userAnswers.filter(
    (userAnswer, index) => userAnswer === QUESTIONS[index].answers[0]
  )

  const skippedAnswersShare =
    Math.round((skippedAnswers.length / userAnswers.length) * 100)
  const correctAnswersShare =
    Math.round((correctAnswers.length / userAnswers.length) * 100)
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      <h2>Quiz Completed!</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>

      <ol>
        {userAnswers.map((userAnswer, index) => {
          let cssClass = 'user-answer'

          if (userAnswer === null) {
            cssClass += ' skipped'
          } else if (userAnswer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct'
          } else {
            cssClass += ' wrong'
          }

          return (
            // 使用index作为key（不与数据相关联）
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{userAnswer ?? 'Skipped'}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Summary
