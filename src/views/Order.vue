<template>
 <div class="order container">

  <header>
     <i class='iconfont icon-fanhui' @click='$router.back()'></i>
            <span>提交订单</span>
            <i class='iconfont icon-kefu'></i>
  </header>
  <section>
    <div class="path">
      <h3 class='path-title'>收货信息</h3>
                <div class='path-content' @click='goPath'>
                   <div>
                       <span>{{path.name}}</span>
                       <span>{{path.tel}}</span>
                   </div>
                   <div>
                       <span>{{path.province}}</span>
                       <span>{{path.city}}</span>
                       <span>{{path.county}}</span>
                       <span>{{path.addressDetail}}</span>
                   </div>
                </div>
    </div>
   <div class='payment'>
                <div class='payment-title'>支付方式：</div>
                <van-radio-group v-model="radioPayment">
                  <van-radio name="wx">微信支付</van-radio>
                  <van-radio name="ali">支付宝支付</van-radio>
                </van-radio-group>
            </div>
             <div class='goods'>
                <ul>
                    <li
                        v-for='(item,index) in goodsList'
                        :key='index'
                    >
                        <div>
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <div class='goods-content'>
                            <h4>{{item.name}}</h4>
                            <div class='goods-total'>
                                <span>¥{{item.price}}</span>
                                <span>x{{item.num}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
  </section>
  <footer>
     <div class='order-total'>
                <span>共</span>
                <b>{{total.num}}</b>
                <span>件,</span>
                <span>总金额：</span>
                <em>¥{{total.price}}</em>
            </div>
            <div class='order-topay' @click='goPayment'>
                提交订单
            </div>
  </footer>
 </div>
</template>

<script>
import { Toast } from 'vant';
import {addOrder,selectOrder,getAddress} from "@/api"
import {mapState,mapGetters,mapMutations} from 'vuex'
// import bus from '@/common/bus.js'
import qs from 'qs'
export default {
 data () {
        return {
            radioPayment:'wx',
            path:{},
            item:[],
            total:{
                price:0,
                num:0
            }
        }
    },
    computed:{
      ...mapState({
        order_id:state=>state.order.order_id,
        selectListL:state=>state.cart.selectListL
      }),
      ...mapGetters(['defaultPath'])
    },
    created(){
      this.getAddressFn()
      this.goodsList=JSON.parse(this.$route.query.goodsList)
      console.log('goodsList',JSON.parse(this.$route.query.goodsList));
    },
    methods:{
      ...mapMutations(['initData','initOrder']),
    //选择收货地址
        goPath(){
            this.$router.push({
                path:'/path',
                query:{
                    type:'select'
                }
            });
        },
        //提交订单
        goPayment(){

        },
        //查询地址
        getAddressFn(){
          getAddress().then((res)=>{
            console.log('path',res.data);
            this.path=res.data[0];
          })
        }
    }
}
</script>

<style lang='scss' scoped>
header{
  display: flex;
  justify-content: space-between;
  
  width: 100%;
    height: 1.173333rem;
    color:#fff;
    background-color: #b0352f;
    align-items: center;
     i{
        padding:0 0.4rem;
        font-size:0.586666rem;
    }
    span{
        font-weight:300;
        font-size:0.48rem;
    }
}
section{
   background-color: #f7f7f7;
    .path-title{
        padding: 0.4rem;
        font-size:0.48rem;
    }
    .path-content{
        padding:0.16rem 0.4rem;
        font-size:0.373333rem;
        background-color: #FFFFFF;
        span{
            padding-right:0.16rem;
        }
    }
     .payment{
        padding:0.16rem 0.4rem;
        margin-top:0.4rem;
        font-size:0.426666rem;
        background-color: #FFFFFF;
        .van-radio-group{
            display: flex;
            padding:0.16rem 0;
            .van-radio{
                padding-right:0.266666rem;
            }
        }
    }
    .goods{
        padding:0.16rem 0.4rem;
        margin-top:0.4rem;
        font-size:0.426666rem;
        background-color: #FFFFFF;
        ul{
            width: 100%;
            li{
                display: flex;
                 width: 100%;
                img{
                    width: 1.973333rem;
                    height: 1.973333rem;
                }
                .goods-content{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-left:0.4rem;
                    .goods-total{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
        
    }
}
footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.2rem;
    border-top:1px solid #ccc;
    .order-total{
        font-size:0.426666rem;
        span{
            padding:0 0.16rem;
        }
        b{
            color:#b0352f;
        }
        em{
            font-size:0.48rem;
            color:#b0352f;
        }
    }
    .order-topay{
        width: 3.2rem;
        line-height: 1.2rem;
        color:#fff;
        font-size:0.426666rem;
        text-align: center;
        background-color: #b0352f;
    }
   
}
</style>