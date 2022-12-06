import {INIT_OREDER} from "./mutations-types"
export default{
    state:{
        list:[],
        order_id:localStorage.getItem('tea_orderId') ||''
    },
    mutations:{
        [INIT_OREDER](state,order){
            state.list=order;
            //储存订单号
            state.order_id=order[0].order_id;
            //设置一个id号
            localStorage.setItem('tea_orderId',order[0].order_id)
        }
    }
}