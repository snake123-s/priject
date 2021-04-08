import { request1 } from "./request";

export function getHome() {
    return request1({
        url:'/home/multidata'
    })
}
export function getHomeData(type,page) {
    return request1({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}