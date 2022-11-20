<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <Header></Header>
        <ly-tab
          v-model="selectedId"
          :items="items"
          :options="options"
          @change="changeTab"
        >
        </ly-tab>
      </div>
    </div>
    <section ref="wrapper">
    <div>
        <div v-for="(item,index) in newData"  :key="index">
        <Swiper 
					v-if='item.type=="swiperList"'
					:swiperList='item.data'
				></Swiper>
        <Icons v-if="item.type=='iconsList'" :iconList="item.data"></Icons>
        <Recommend 
					v-if='item.type=="recommendList"'
					:recommendList='item.data'
				></Recommend>
        <Like 
					v-if='item.type=="likeList"'
					:likeList='item.data'
				></Like>
       <Ad 
					v-if='item.type=="adList"'
					:adList='item.data'
				></Ad>
      </div>
    </div>
    </section>
    <Tabbar></Tabbar> 
  </div>
</template>

<script>
import Header from "@/components/home/Header.vue";
import Swiper from "@/components/home/Swiper.vue";
import Icons from "@/components/home/Icons.vue";
import Recommend from "@/components/home/Recommend.vue";
import Like from "@/components/home/Like.vue";
import Ad from "@/components/home/Ad.vue";
import Tabbar from "@/components/common/Tabbar.vue";
import BetterScroll from 'better-scroll'
import {getFirtPageList} from "@/api/index";
export default {
  name: "Home",
  data() {
    return {
      selectedId: 0,
      items: [],
      newData: [],
      oBetterScroll: "",
      tBetterScroll: "",
      options: {
        activeColor: "#b0352f",
      },
    };
  },
  created() {
    this.getRecommendListFn();

  },
  methods: {
    
    getRecommendListFn() {
      getFirtPageList(this.selectedId).then((res) => {
        console.log(res);
        this.items = Object.freeze(res.data.topBar);
        this.newData = Object.freeze(res.data.data);
      	this.$nextTick(()=>{
			this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
			  movable: true,
			  zoom: true,
			  click:true
			})
		})
      });
    },
    changeTab(item, index) {
      this.addData(index);
    },
    addData(index){
      getFirtPageList(index).then((res)=>{
        console.log(res);
        if(  res.data.constructor !=Array ){
			this.newData = res.data.data;
		}else{
			this.newData = res.data;
		}
    this.$nextTick(()=>{
			this.tBetterScroll = new BetterScroll(this.$refs.wrapper, {
			  movable: true,
			  zoom: true,
			  click:true
			})
		})
      })
    }
  },
  components: {
    Header,
    Swiper,
    Icons,
    Recommend,
    Like,
    Ad,
    Tabbar,
  },
};
</script>

<style>
.home{
  display: flex;
  flex-direction: column;
  width: 100vw;
	height: 100vh;
	overflow: hidden;
}
.headers{
	width: 100%;
	height: 2.88rem;
}
.headers-main{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
section{
	flex:1;
	overflow: hidden;
}
::v-deep .ly-tabbar{
	box-shadow:none;
	border-bottom:none;
}
</style>