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
        url:'getShortMessage',
        method:'get',
        params:{tel:tel}
    })
}