const Promise = require('./ProComplete')
const promise = new Promise((reslove,reject)=>{
    reslove(20)
})
promise.
then()
.then(data => {
    console.log(data)
})