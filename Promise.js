//Promise 雏形
function Promise(handle){
    if(typeof handle != 'function'){
        throw new Error("handle need be a function")
    }
    this.state = 'pending';
    this.value = undefined;
    this.resson = undefined;
    this.reslove = (value) => {
        if(this.state === 'pending'){
            this.state = 'reslove';
            this.value = value
        }
    }
    this.reject = (reason) => {
        if(this.state == 'pending'){
            this.state = 'reject';
            this.reason = reason;
        }
    }
    handle(this.reslove,this.reject)
}
/**
 * @param
 */
Promise.prototype.then = function(onReslove,onReject = undefined){
    if(this.state === 'reslove'){
        onReslove(this.value)
    }else if(this.state === 'reject'){
        onReject(this.reason)
    }
}
module.exports = Promise;