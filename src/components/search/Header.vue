<template>
  <header>
    <div class="search-return" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearchList">
        <input
          type="search"
          placeholder="搜索您喜欢的产品..."
          v-model="searchVal"
          autofocus
          ref="myInput"
        />
      </form>
    </div>
    <div class="search-btn" @click="goSearchList">搜索</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchVal: this.$route.query.key || "",
      searchArr: [],
    };
  },
  mounted() {
    window.addEventListener('touchmove',this.myTouchMove,false)
  },
  methods: {
    //失去焦点
    myTouchMove(){
        this.$refs.myInput.blur();
    },
    goBack(){
			this.$router.back();
		},
    goSearchList() {
      //如果搜索的关键字是没有的，那就直接return
      if (!this.searchVal) return;
      //判断之前有没有本地存储
      if (!localStorage.getItem("searchList")) {
        //没有
        localStorage.setItem("searchList", "[]");
      } else {
        //之前有
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
      }

      //增加数据
      this.searchArr.unshift(this.searchVal);
      //ES6 set 去重复
      let newArr=new Set(this.searchArr);
      //重新给本地存储赋值
      localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)));

      //路径如果没有变化，不跳转页面
			if( this.searchVal === this.$route.query.key  ) return;
			//跳转页面
			this.$router.push({
				name:'list',
				query:{
					key:this.searchVal
				}
			})

    },
  },
};
</script>

<style scoped lang='scss'> 

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.173333rem;
	color:#fff;
	background-color: #b0352f;
}
.search-return,.search-btn{
    padding:0 0.266666rem;
}
.search-main{
    display: flex;
    align-items: center;
    width: 6.933333rem;
	height: 0.8rem;
	border-radius: 12px;
	background-color: #FFFFFF;
}
.search-main i{
	padding:0 0.266666rem;
	color:#666666;
}
.search-main form{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
     input{
    	width: 100%;
        font-size:0.426666rem;
        color:#000;
    }
}
.search-btn{
	font-size:0.426666rem;
}
</style>