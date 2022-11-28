import {
    CART_LIST,
    CHECK_ALL,
    UN_CHECK_ALL,
    CHECK_ITEM
} from './mutations-types.js';
import {deleteCart} from "@/api"
import { Toast,Dialog } from 'vant';
export default {
    state:{
        list:[],//购物车数据
        selectList:[]//选中的数据
    },
    getters:{
            isCheckedAll(state){
                console.log(state.list.length,state.selectList.length);
                return state.list.length===state.selectList.length&&state.list.length!==0;
            },
            total(state){
                let total = {
                    num:0,
                    price:0
                }
                
                state.list.forEach((v)=>{
                   if(v.checked){
                    total.num+=v.num;
                    total.price+=v.num*v.price
                   }
                })
                return total;
            }
    },
    mutations:{
        [CART_LIST](state,cartArr){
            state.list=cartArr;
            // state.selectList=state.list.map((v)=>{
            //     return v.cId;
            // })
        },
        //全选
        [CHECK_ALL](state){
            state.selectList =state.list.map(v=>{
                v.checked=true;
                return v.cId;
            })
           
        },
        //全不选
        [UN_CHECK_ALL](state){
            state.list.forEach(v=>{
                v.checked=false;
            })
            state.selectList=[];
        },
        //单选
        [CHECK_ITEM](state,index){
            let cId=state.list[index].cId;
            let i =state.selectList.indexOf(cId);
            //能在selectList找到对应的id，就删除
            if(i > -1){
                return state.selectList.splice(i,1);
            }
            //如果之前没有选中，就给selectList添加一个id进去
            state.selectList.push(cId);
        },
        // 删除
        delGoods(state){
            console.log('length',state.list,state.selectList);
            state.list =state.list.filter(v=>{
                return state.selectList.indexOf(v.cId) ==-1
            })
            console.log('length',state.list.length,state.selectList.length);
          
        }
    },
    actions:{
        checkAllFn({commit,getters}){
            getters.isCheckedAll ? commit('unCheckAll') : commit('checkAll')
        },
        // 删除操作
        delGoodsFn({commit,state},id){
            console.log('dele');
            if(state.selectList.length===0){
                Toast('请选择商品');
            }
            let arrCart = [];
            Dialog.confirm({
                message:'确定要删除这些商品吗',
            }).then(()=>{
                if(typeof id =='number'){
                    // 单个删除
                    arrCart=[id];
                    let index = state.list.findIndex(v=>{
                        return v.cId==id;
                    })
                    state.list.splice(index,1);
                }else{
                    //多个删除
                    arrCart=state.selectList;
                    commit('delGoods')
                }
                deleteCart({arrCart:arrCart}).then((res)=>{
                    if(res.success){
                        Toast(res.msg)
                    }
                })


            })
        }
    }
}