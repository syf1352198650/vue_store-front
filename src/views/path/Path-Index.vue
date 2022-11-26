<template>
  <div class="path-index container" >
    <Header></Header>
    <section>
        <ul v-if="list.length">
            <li v-for="(item,index) in list" 
            :key="index"
            @click="goList(item)"
            >
            <div>
                <span>{{item.name}}</span>
                <span>{{item.tel}}</span>
            </div>
            <div class="city">
                <span class="active" v-if="item.isDefault===1">[默认]</span>
                <span>{{item.province}}</span>
                <span>{{item.city}}</span>
                <span>{{item.country}}</span>
                <span>{{item.addressDetail}}</span>
            </div>
            </li>
        </ul>
        <h1 v-else>暂无数据，请添加地址</h1>
        <div class="add-path" @click="goList('add')">添加地址</div>

    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import {getAddress} from "@/api"
import Header from '@/components/path/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
import {mapMutations,mapState} from "vuex"
export default {
data(){
    return{
        
        pathStatus:false
    }
},
computed:{
...mapState({
    list:state=>state.path.list ||[]
})
},
created(){
    this.getAddressFn()
},
methods:{
    goList(option){
        this.$router.push({
            name:'path-list',
            params:{
                key:JSON.stringify(option)
            }
        })
    },
    getAddressFn(){
        getAddress().then((res)=>{
            console.log(res);
            this.initData(res.data)
        })
    },
...mapMutations(['initData'])
},
components:{
    Header,
    Tabbar
}
}
</script>

<style scoped lang="scss"> 
section{
    display: flex;
    flex-direction: column;
    align-items: center;
     background-color: #F7F7F7;
     ul{
        width: 100%;
        li{
             padding:0.266666rem 0.4rem;
            margin:0.16rem 0;
            background-color: #FFFFFF;
             span{
                padding-right:0.4rem;
                font-size:0.426666rem;
            }
            .active{
                color:#b0352f;
            }
            .city{
                span{
                    padding-right:0.16rem;
                }
            }
        }
     }

}
.add-path{
        margin-top:0.8rem;
        width: 3.2rem;
        line-height: 1.066666rem;
        font-size:0.48rem;
        text-align: center;
        color:#FFFFFF;
        background-color: #b0352f;
        border-radius: 6px;
    }

</style>