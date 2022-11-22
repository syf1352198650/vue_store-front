import service from "@/utils/request"
export function getFirtPageList(index){
    return service({
        url:`getFirtPageIndex_${index}`,
        method:'get'
    })
}
export function getGoodsList(){
    return service({
        url:'getGoodsList',
        method:'get'
    })
}
export function getGoodDetail(id){
    return service({
        url:'getGoodDetail',
        method:'get',
        params:{id:id}
    })
}
export function getShortMessage(tel){
    return service({
        url:'user/getShortMessage',
        method:'post',
        data:{tel:tel}
    })
}
export function addUser(tel){
    return service({
        url:'user/addUser',
        method:'post',
        data:{tel:tel}
    })
}
export function userLogin(params){
    return service({
        url:'user/login',
        method:'post',
        data:params
    })
}
export function registerUser(params){
    return service({
        url:"user/registerUser",
        method:'post',
        data:params
    })
}