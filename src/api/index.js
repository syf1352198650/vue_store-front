import service from "@/utils/request"
export function getFirtPageList(index){
    return service({
        url:`getFirtPageIndex_${index}`,
        method:'get'
    })
}