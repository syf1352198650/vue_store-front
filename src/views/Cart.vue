<template>
  <div class="cart container">
    <header>
        <i class='iconfont icon-fanhui' @click="$router.back()"></i>
        <span>购物车</span>
        <span @click="isNavBar" v-text="isNavStatus ? '完成' : '编辑'"></span>
    </header>
    <section v-if="list.length">
        <div class="cart-title">
          <van-checkbox @click='checkAllFn' :value="isCheckedAll"></van-checkbox>
          <span>商品</span>
        </div>
        <ul>
          <li v-for="(item,index) in list " :key="index">
            <div class="check">
              <van-checkbox @click='checkItem(index)' v-model="item.checked"></van-checkbox>
            </div>
            <h2>
              <img :src="item.imgUrl" alt="">
            </h2>
            <div class="goods">
              <div class="goods-title">
                <span>{{item.name}}</span>
                <i class='iconfont icon-lajitong' @click='delGoodsFn(item.cId)'></i>
              </div>
              <div class="goods-price">￥{{item.price}}</div>
              <van-stepper @change='changeNum($event,item)' v-model="item.num" integer />
            </div>
          </li>
        </ul>
    </section>
     <section v-else>
            没有购物车数据
            <router-link to='/home'>去首页逛逛吧</router-link>
        </section>
    <footer v-if="list.length">
      <div class="radio">
          <van-checkbox @click='checkAllFn' :value="isCheckedAll"></van-checkbox>
      </div>
      <div class="total" v-show="!isNavStatus">
        <div>
          共有<span class="total-active">{{total.num}}</span>件商品
        </div>
        <div>
          <span>总计：</span>
          <span class="total-active">￥{{total.price}}</span>
        </div>
      </div>
      <div class="order" v-if="isNavStatus" @click="delGoodsFn">删除</div>
      <div class="order" v-else @click="goOrder">去结算</div>
    </footer>
  </div>
</template>

<script>
import {updateNum} from "@/api"
import {queryCart,addOrder} from '@/api';
import {mapMutations,mapState,mapGetters,mapActions} from "vuex"
import { Toast } from 'vant';
export default {
 name: "Cart",
    data () {
        return {
            isNavStatus:false,
            // checked:true
        }
    },
    created(){
      this.queryCartFn()
    },
    computed:{
       
      ...mapState({
        list:state=>state.cart.list,
        selectList:state=>state.cart.selectList
      }),
      ...mapGetters(['isCheckedAll','total']),
       goodsList(){
           return this.selectList.map((id)=>{
              return this.list.find((v)=>v.cId==id)
            })
        },
    },
    methods:{
     ...mapMutations(['cartList','checkItem','initOrder']),
        ...mapActions(['checkAllFn','delGoodsFn']),
      queryCartFn(){
        queryCart().then((res)=>{
          // console.log(res);
          res.data.forEach((v)=>{
            v.checked=false;
          })
          this.cartList(res.data);
        })
      },
      isNavBar(){
        this.isNavStatus=!this.isNavStatus;
      },
      //修改数量
      changeNum(value,item){
        
        updateNum({num:value,cId:item.cId}).then((res)=>{
          console.log(res);
        })
      },
      //去结算
      goOrder(){
        //选择商品列表不为空
        if(!this.selectList.length){
          Toast('请至少选择一件商品');
          return ;
        }
        let newList=[];
        this.list.forEach((item)=>{
          this.selectList.forEach((v)=>{
            if(v==item.cId){
              newList.push(item)
            }
          })
        })
        console.log('newlist',newList);
        addOrder(newList).then((res)=>{
          this.initOrder(res.data);
     
          console.log(res);
          this.$router.push({
            path:'/order',
            query:{
              // goodsList:JSON.stringify(that.goodsList)
              goodsList:JSON.stringify(this.goodsList)
            }
          })
        })
      }
    }
}
</script>

<style lang="scss" scoped>
header{
  display: flex;
  justify-content: space-between;
   height: 1.173333rem;
    color:#fff;
    background-color: #b0352f;
    align-items: center;
    i{
        padding:0 0.4rem;
        font-size:0.586666rem;
    }
    span{
        padding:0 0.4rem;
        font-size:0.426666rem;
    }

}
section{
      background-color: #f5f5f5;
      .cart-title{
       display: flex;
        padding:0.533333rem;
        span{
            padding:0 0.4rem;
            font-weight: 500;
            font-size:0.48rem;
        }

      }
      ul{
        display: flex;
        flex-direction: column;
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
           padding:0.16rem 0.533333rem;
            margin:0.213333rem 0;
            background-color: #fff;
            .check{
               padding-right:0.373333rem;
            }
            .goods{
              display: flex;
              flex-direction: column;
              padding-left: .4rem;
                font-size:0.32rem;
                 .goods-title{
                    display: flex;
                    justify-content: space-between;
                    i{
                        font-size:0.586666rem;
                    }
                }
                 .goods-price{
                    padding:0.08rem 0;
                    color:#b0352f;
                }
                //   ::v-deep .van-stepper{
                //     text-align: right;
                // }
            }
            img{
                width: 1.973333rem;
                height: 1.973333rem;
            }
        }
      }

}
footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
   height: 1.28rem;
    border-top:0.053333rem solid #ccc;
    .radio{
        padding:0 0.4rem;
    }
     .total{
        flex:1;
        font-size:0.5rem;
        .total-active{
            color:#b0352f;
        }
    }
    .order{
        width: 3.2rem;
        line-height: 1.28rem;
        color:#fff;
        text-align: center;
        font-size: 0.426666rem;
        background-color: #b0352f;
    }
}
</style>>

