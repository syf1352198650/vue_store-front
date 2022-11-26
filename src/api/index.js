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
//查询用户手机是否注册
export function queryTel(params){
return service({
    url:'user/queryTel',
    method:'post',
    data:params
})
}
//修改密码
export function updatePwd(params){
    return service({
        url:'user/updatePwd',
        method:'post',
        data:params
    })
}

//查询商品
export function getShopList(params){
    return service({
        url:'getShopList',
        method:'get',
        params:params
    })
}
//查询地址
export function getAddress(){
    return service({
        url:'getAddress',
        method:'get',
        headers:{token:true}
    })
}
//添加地址
export function addAddress(params){
   return service({
    url:'addAddress',
    method:'post',
    data:params
   })
}
//修改地址
export function updateAddress(params){
    return service({
        url:'updateAddress',
        method:'post',
        data:params
    })
}