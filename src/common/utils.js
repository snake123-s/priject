export function debounce(func,delay){
    let timer = null
    return function(...arg) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this,arg)
        },delay)
    }
   }
// 防抖函数(debounce)/节流(throttle) 
