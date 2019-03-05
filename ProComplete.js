//Promise A+ 
function PromiseComplete(handle){
    if(typeof handle != 'function'){
        throw new Error("handle need be a function")
    }
    this.state = 'pending';
    this.value = undefined;
    this.resson = undefined;
    this.onResloveCallbacks = [];
    this.onRejectCallbacks = [];
    const reslove = (value) => {
        if(this.state === 'pending'){
            this.state = 'reslove';
            this.value = value;
            this.onResloveCallbacks.forEach(fn => {
                fn();
            })
        }
    }
    const reject = (reason) => {
        if(this.state == 'pending'){
            this.state = 'reject';
            this.reason = reason;
            this.onRejectCallbacks.forEach(fn => {
                fn();
            })
        }
    }
    try{
        handle(reslove,reject)
    }catch(e){
        reject(e)
    }
}
PromiseComplete.prototype.then = function(onReslove,onReject){
    onReslove = typeof onReslove === 'function'?onReslove:() => this.value 
    onReject = typeof onReject === 'function'?onReject:()=>{throw new Error(this.reason)} 
    let promise;
        promise = new PromiseComplete((reslove,reject)=>{
        let x;
        if(this.state === 'reslove'){
            handleError(() => {
            x = onReslove(this.value);
                promiseReslove(promise,x,reslove,reject);
            },reject)
        }else if(this.state === 'reject'){
            handleError(() => {
                x = onReject(this.reason);
                promiseReslove(promise,x,reslove,reject);
            },reject)
        }else if(this.state === 'pending'){
            this.onResloveCallbacks.push(()=>{
                handleError(() => {
                    x = onReslove(this.value)
                    promiseReslove(promise,x,reslove,reject)
                },reject)
            })
            this.onRejectCallbacks.push(() => {
                handleError(() => {
                    onReject(this.reason)
                    promiseReslove(promise,x,reslove,reject)
                },reject)            
            })
        }
    })
    return promise
}
const handleError = (fn,reject)=>{
    try{
        fn()
    }catch(e){
        reject(e)
    }
}
/**
 * 
 * @param {*} promise 下一次then返回的promise实例 
 * @param {*} x       本次返回值x
 * @param {*} reslove promise2的成功方法
 * @param {*} reject  promise2的失败方法
 */
const promiseReslove = (promise,x,reslove,reject) => {
    if(promise === x ){
        return reject(new TypeError("循环引用"))
    }
    if(x instanceof PromiseComplete){
        if(x.state == 'pending'){
            console.log(x.state)
            x.then((value => {
                x.then(promiseReslove(promise,value,reslove,reject))
            }),reject)
        }else{
            console.log(x.state)
            x.then(reslove,reject)
        }
        return
    }
    if(x!== null&&(typeof x === 'object'||typeof x === 'function')){
        let then = x.then,isCalled = false;
        try{
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(isCalled) return;
                    isCalled = true;
                    promiseReslove(promise,y,reslove,reject)
                },r => {
                    if(isCalled) return
                    isCalled = true;
                    reject(r)
                })
            }else{
                reslove(x)
            }
        }catch(e){
            if(isCalled) return;
            isCalled = true;
            reslove(e)
        }
    }else{
        reslove(x)
    }
}
module.exports = PromiseComplete;