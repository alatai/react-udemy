import { useState } from 'react'

const Signup = () => {
  const [passwordsAreNotEqual, setPasswordsAreEqual] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    // 浏览器实际上可以帮助处理提交表单并获取所有输入值
    // 基于浏览器中内置的特殊构造函数（FormData），创建一种特殊的对象
    // FormData是一个对象，可以轻松获取输入到表单的不同值，只需将表单作为输入传递给FormData
    const fd = new FormData(event.target)
    // 为了使它工作，所有想要提取值的输入都必须在它们上面设置name属性
    // const enteredEmail = fd.get('email')
    // const enteredPassword = fd.get('password')
    // ...
    // 从一个输入字段中获取多个值（e.g. 复选框）
    const acquisitionChannel = fd.getAll('acquisition')
    // 一个常用模式是使用获取所有输入的值并将它们组合到一个对象中
    // 使用内置的Object类（由浏览器提供）
    const data = Object.fromEntries(fd.entries())
    data.acquisition = acquisitionChannel

    if (data.password !== data['confirm-password']) {
      setPasswordsAreEqual(true)
      return
    }

    console.log(data)

    // event对象的target是底层表单元素，有一个reset方法可以调用
    // 作用和type=reset等效
    // event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/* 表单会被重置，因为type是reset */}
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  )
}

export default Signup
