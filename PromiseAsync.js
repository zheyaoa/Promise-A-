// 异步promise 
function PromiseAsync(handle){
    if(typeof handle != 'function'){
        throw new Error("handle need be a function")
    }
    this.state = 'pending';
    this.value = undefined;
    this.resson = undefined;
    this.onResloveCallbacks = [];
    this.onRejectCallbacks = [];
    this.reslove = (value) => {
        if(this.state === 'pending'){
            this.state = 'reslove';
            this.value = value;
            this.onResloveCallbacks.forEach(fn => fn())
        }
    }
    this.reject = (reason) => {
        if(this.state == 'pending'){
            this.state = 'reject';
            this.reason = reason;
            this.onRejectCallbacks.forEach(fn => fn())
        }
    }
    try{
        handle(this.reslove,this.reject)
    }catch(e){
        reject(e)
    }
}
PromiseAsync.prototype.then = function(onReslove,onReject = undefined){
    if(this.state === 'reslove'){
        onReslove(this.value)
    }else if(this.state === 'reject'){
        onReject(this.reason)
    }else if(this.state === 'pending'){
        this.onResloveCallbacks.push(()=>{
            onReslove(this.value)
        })
        this.onRejectCallbacks.push(()=>{
            onReject(this.value)
        })
    }
}
module.exports = PromiseAsync;