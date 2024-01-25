// --------- import & export ---------

// react中的拓展名通常被省略（构建过程中会自动填充）
// import { apiKey } from './util.js'

// 导入默认导出的值时，可以使用任意变量名接收值
// import apiKey from './util.js'

// 导入多个值
// import { abc, efg as content } from './util.js'
// import * as util from './util.js'

// console.log(apiKey)
// console.log(util.abc)
// console.log(util.efg)

// --------- import & export ---------

// --------- Revisiting Variables & Values ---------
// let userMessage = 'Hello World!'
// console.log(userMessage)

// const constanceValue = '恒数'
// console.log(constanceValue)

// --------- Revisiting Variables & Values ---------

// --------- Revisiting Functions & Parameters ---------
// const combine = (a, b, c) => {
//   return (a * b) / c
// }

// console.log(combine(5, 4, 3))

// --------- Revisiting Functions & Parameters ---------

// --------- Revisiting Objects & Classes ---------
// const user = {
//   name: 'Max',
//   age: 34,
//   greet() {
//     console.log('Hello')
//     console.log(this.name)
//   },
// }

// console.log(user)
// user.greet()

// // 首字母大写
// class User {

//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }

//   greet() {
//     console.log('Hi!')
//   }
// }

// const user1 = new User('Manual', 35)
// console.log(user1)
// user1.greet()

// --------- Revisiting Objects & Classes ---------

// --------- Arrays & Array Methods like map() ---------
// const hobbies = ['Sports', 'Cooking', 'Reading']
// console.log(hobbies[0]) // Sports

// const index = hobbies.findIndex((item) => item === 'Sports')
// console.log(index)

// hobbies.map((item, index) => {
//   console.log(item)
//   console.log(index)
// })

// // const editedHobbies = hobbies.map((item) => item + '!')
// // 返回对象时注意使用括号
// const editedHobbies = hobbies.map((item) => ({ text: item }))
// console.log(editedHobbies)

// --------- Arrays & Array Methods like map() ---------

// --------- Destructing ---------
// const userNameData = ['Max', 'Schwarzmuller']
// const firstNmae = userNameData[0]
// const lastNmae = userNameData[1]

// 解构数组
// const [firstNmae, lastNmae] = ['Max', 'Schwarzmuller']
// console.log(firstNmae)
// console.log(lastNmae)

// const user = {
//   name: 'Max',
//   age: 34,
// }

// const name = user.name
// const age = user.age

// 解构对象
// 必须使用同名参数，利用":"可以起别名
// const { name: userName, age } = {
//   name: 'Max',
//   age: 34,
// }

// console.log(userName)
// console.log(age)

// --------- Destructing ---------

// --------- Spread Operator ---------
// const hobbies = ['Sports', 'Cooking']
// const newHobbies = ['Reading']

// // 合并数组
// const mergedHobbies = [...hobbies, ...newHobbies]
// console.log(mergedHobbies) // ['Sports', 'Cooking', 'Reading']

// const user = {
//   name: 'Max',
//   age: 34,
// }

// // 合并对象
// const extendedUser = {
//   isAdmin: true,
//   ...user,
// }

// console.log(extendedUser) // {isAdmin: true, name: 'Max', age: 34}

// --------- Spread Operator ---------

// --------- Revisiting Control Structures ---------
// 浏览器会提示输入
// const password = prompt('Your password')

// if (password === 'Hello') {
//   console.log('Hello works')
// } else if (password === 'hello') {
//   console.log('hello works')
// } else {
//   console.log('Access not granted')
// }

// const hobbies = ['Sports', 'Cooking']

// for (const hobby of hobbies) {
//   console.log(hobby)
// }

// --------- Revisiting Control Structures ---------

// --------- Defining Function Inside Of Functions ---------
// function init() {
//   function greet() {
//     console.log('Hi!')
//   }

//   greet()
// }

// 不可以在外部执行该函数
// greet()

// --------- Defining Function Inside Of Functions ---------

// --------- Reference vs Primitive Values ---------
const hobbies = ['Sports', 'Cooking']
// hobbies = [] // 报错

// --------- Reference vs Primitive Values ---------
