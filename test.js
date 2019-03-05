const Promise = require('./Promise')
const PromiseAsync = require('./PromiseAsync')
const PromiseComplete = require('./ProComplete')
// let promise = new Promise((reslove,reject) => {
//     setTimeout(() => {
//         reslove(20)
//     }, 100);
// })
// promise.then(data => {
//     console.log(data)
// })

// const promiseAsync = new PromiseAsync((reslove,reject) => {
//     setTimeout(() => {
//         reslove(20)
//     },100)
// })
// promiseAsync.
// then(data => {
//     console.log(data)
// }) 

const promiseComplete = new PromiseComplete((reslove,reject) => {
    reslove(20)
})
promiseComplete
.then()
.then((data)=>{
    console.log(data)
},(err) => {
    console.log(err)
})
