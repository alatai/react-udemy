const UserInput = ({ onChange, userInput }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label for="">Initial Investment</label>
          {/* onChange函数不会工作，React会调用这个函数并将事件对象传递给它 */}
          {/* 创建一个新的匿名函数，然后将其作为值传递给onChange的实际函数 */}
          {/* 一旦change事件发生，它最终将由React执行 */}
          {/* 因此在这个函数内部，我们可以完全控制  */}
          <input
            type="number"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              // JavaScript始终获得字符串类型的值，event.target.value
              onChange('initialInvestment', event.target.value)
            }
          />
        </p>
        <p>
          <label for="">Annual Investment</label>
          <input
            type="number"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              onChange('annualInvestment', event.target.value)
            }
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label for="">Expected Return</label>
          <input
            type="number"
            required
            value={userInput.expectedReturn}
            onChange={(event) => onChange('expectedReturn', event.target.value)}
          />
        </p>
        <p>
          <label for="">Duration</label>
          <input
            type="number"
            required
            value={userInput.duration}
            onChange={(event) => onChange('duration', event.target.value)}
          />
        </p>
      </div>
    </section>
  )
}

export default UserInput
