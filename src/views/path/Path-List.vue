<template>
  <div class="path-index container">
    <Header>
        <span v-if="pathStatus">添加地址</span>
        <span v-else>编辑地址</span>
    </Header>
    <section>
 <van-address-edit
              v-if='pathStatus'
              :area-list="areaList"
              show-set-default
              @save="onAdd"
            />
            
            <van-address-edit
              v-else
              :address-info='AddressInfo'
              :area-list="areaList"
              show-delete
              show-set-default
              show-search-result
              @save="onUpdate"
              @delete="onDelete"
            />

    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import {addAddress,updateAddress,deleteAddress} from "@/api"
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import Header from '@/components/path/Header.vue'
import Tabbar from '@/components/common/Tabbar.vue'
export default {
  data() {
        return {
            pathStatus:false,
            AddressInfo:{},
            areaList
        };
    },
    mounted(){
        let key=JSON.parse(this.$route.params.key);
        if(key=='add'){
            this.pathStatus=true
        }
        else{
            this.AddressInfo=key;
            this.AddressInfo.isDefault=this.AddressInfo.isDefault===1 ? true : false;
        }
    },
    methods:{
        //点击保存添加
        onAdd(content){
           addAddress(content).then((res)=>{
            // console.log(res);
            Toast(res.msg)
           })
        },
        //点击保存修改
                onUpdate(content){
                    updateAddress(content).then((res)=>{
                        console.log(res);
                        Toast(res.msg)
                    })
                },
                //删除
                onDelete(content){
deleteAddress(content).then((res)=>{
    console.log(res);
})
                }

    },
    components:{
        Tabbar,
        Header
    }
}
</script>

<style>

</style>