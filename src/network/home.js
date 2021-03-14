import { request1 } from "./request";

export function getHome() {
    return request1({
        url:'/home/multidata'
    })
}