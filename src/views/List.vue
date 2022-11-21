<template>
 <div class="list">
  <header v-show="isShow">
    <div class="returns">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search">
      <i class="iconfont icon-fangdajing"></i>
      <span>搜您喜欢的...</span>
    </div>
    <div class="go-home">
      <i class="iconfont icon-080jiating"></i>
    </div>
  </header>
  <section>
    <div class="list-l" ref="left">
      <ul class="l-item">
        <li
        v-for="(item,index) in leftData"
        :key="index"
        :class="index==currentIndex ? 'active' :'' "
        @click="goScroll(index)"
        >{{item.name}}</li>
      </ul>
    </div>
    <div class="list-r" ref="right">
      <div>
        <ul v-for="(item,index) in rightData" :key="index" class="shop-list">
          <li v-for="(i,k) in item" :key="k">
            <h2>{{i.name}}</h2>
            <ul class="r-content">
              <li v-for="(j,idk) in i.list" :key="idk">
                <img :src="j.imgUrl" alt="">
                <span>{{j.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <Tabbar></Tabbar> 
 </div>
</template>

<script>
import {getGoodsList} from "@/api/index"
import BetterScroll from 'better-scroll'
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  components:{
    Tabbar
  },
  data(){
    return{
    // currentIndex:0,  
    isShow:true,
		leftData:[],//左侧数据
		rightData:[],//右侧数据
		rightBScroll:'',//右侧滑动BScroll
		allHeight:[],//承载右侧每一块的高度值
		scrollY:''//右侧滚动距离
    }
  },
  created(){
      this.getGoodsListFn()
  },
  computed:{
        currentIndex(){
          return this.allHeight.findIndex((item,index)=>{
            return this.scrollY>=item&&this.scrollY<this.allHeight[index+1]
          })
        }
  },
  methods:{
    goScroll(index){
      this.rightBScroll.scrollTo(0,-this.allHeight[index],300)
    },
    getGoodsListFn(){
     getGoodsList().then((res)=>{
      console.log(res);
      res.data.forEach((item)=>{
        this.leftData.push({
          id:item.id,
          name:item.name
        })
        this.rightData.push(item.data)
      })
      this.$nextTick(()=>{
        new BetterScroll(this.$refs.left,{
          click:true,
          bounce:false
        })
        this.rightBScroll = new BetterScroll(this.$refs.right,{
			click:true,
			probeType:3,
            bounce: false
		});
    let height=0;
    this.allHeight.push(height)
    //获取右侧每一块的高度
    Array.from(document.getElementsByClassName('shop-list')).forEach((node)=>{
          height+=node.clientHeight;
          this.allHeight.push(height)
    })
    console.log('allheiht',this.allHeight);
    this.rightBScroll.on('scroll',(pos)=>{
       this.scrollY=Math.abs(pos.y);
       if(this.scrollY>=50){
        this.isShow=false
       }else{
        this.isShow=true;
       }
    })
      })
     })
    }
  }
}
</script>

<style scoped lang="scss">
.list{
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
	background-color: #b0352f;
  .returns{
		line-height: 1.173333rem;
		padding:0 0.533333rem;
		i{
			color:#fff;
			font-size:0.5rem;
		}
	}
  .go-home{
		padding: 0 0.266666rem;
		line-height: 1.173333rem;
		i{
		color:#fff;
			font-size:0.693333rem;
		}
	}
  .search{
    display: flex;
    align-items: center;
    flex: 1;
    padding:0.16rem 0.266666rem;
		background-color: #FFFFFF;
		border-radius: 0.64rem;
    i{
			padding-right: 0.16rem;
			color:#666;
			font-size:0.48rem;
		}
    span{
			color:#666;
			font-size:0.373333rem;
		}
  }
}
section{
  display: flex;
  flex: 1;
  overflow: hidden;
}
.list-l{
  width: 2.48rem;
  background-color: #fff;
	border-right: 1px solid #CCCCCC;
	overflow: hidden;
  .l-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    li{
			width: 100%;
			padding:0.08rem 0;
			margin:0.533333rem 0;
			text-align: center;
			font-size:0.373333rem;
			
		}
    .active{
				color:#b54f4a;
				border-left:6px solid #b54f4a;
			}
  }
}

.list-r{
	flex:1;
	overflow: hidden;
	.shop-list{
		text-align: center;
		h2{
			padding:0.533333rem 0;
			font-size:0.64rem;
			font-weight: 400;
		}
		.r-content{
			display: flex;
			flex-wrap: wrap;
			li{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33.33%;
				padding:0.266666rem 0;
				img{
					width: 1.413333rem;
					height: 1.413333rem;
				}
				span{
					font-size:0.426666rem;
				}
			}
		}
	}
}

</style>