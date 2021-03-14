import axios from 'axios'

export function request1(config) {
    
        const instace =axios.create({       
            baseURL:'http://123.207.32.32:8000',
            timeout:5000
        })
        
        // axios拦截器
        // 比如一些信息不符合服务器要求
        // 比如每次发送网络请求时，都希望在界面中显示一个请求的图标 先show() 
        // 某些网络请求，比如登录，必须携带一些登录信息，比如token
        // instace.interceptors.request.use(config => {
        //     console.log(config)
           

        //     // 要还回去
        //     return config
        // })
        // 响应拦截
        // instace.interceptors.response.use(res => {
        //     console.log(res)
        //      还回去
        //     return res.data
        // },err => console.log(err))
         return instace(config)
    
    
}