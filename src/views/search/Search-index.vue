<template>
  <div class="search-index container">
    <Header></Header>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import { MessageBox } from 'mint-ui';
export default {
    data(){
return {
			searchArr:[]
		}
    },
    created(){
        this.searchArr=JSON.parse(localStorage.getItem('searchList')) || [];
    },
    methods:{
        	deleteStorage(){
			MessageBox({
			  title: '提示',
			  message: '确定执行此操作?',
			  showCancelButton: true
			}).then(res=>{
				if( res =='confirm' ){
					//删除本地存储
					localStorage.removeItem('searchList');
					//清除数据
					this.searchArr = [];
				}
			})
		},
        	//点击历史搜索，进入搜索结果页面
		goSearchList( item ){
			this.$router.push({
				name:'list',
				query:{
					key:item
				}
			})
		}
    },
componnets:{
    Header,
    Tabbar
}
}
</script>

<style>

</style>