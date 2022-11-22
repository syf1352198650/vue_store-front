<template>
  <div class="login container">
    <Header></Header>
    <section>
      <div class="login-tel">
        <input
          type="text"
          v-model="userTel"
          placeholder="请输入手机号"
          pattern="[0-9]*"
        />
      
      </div>
      <div class="login-code">
            <input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model='userCode'>
          <button :disabled="disabled" @click="sendCode">{{ codeMsg }}</button>
      </div>
      <div class="login-btn" @click="login">登录</div>
      <div class="tab">
        <span @click="goUserLogin">密码登录</span>
        <span @click="goRegister">快速登录</span>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import {getShortMessage,addUser} from "@/api/index"
import {Toast} from "mint-ui"
import Header from "./Header.vue";
import Tabbar from "../../components/common/Tabbar.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      disabled: false,
      userTel: "",
      userCode: "",
      //验证规则
      rules: {
        //手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号不能为空，并且是11位数字",
        },
      },
      codeNum: 6,
      codeMsg: "获取短信验证码",
      code: "",
    };
  },
  methods: {
    ...mapMutations(["userLogin"]),
    //点击获取验证码按钮
    sendCode() {
      //验证电话号码
      if (!this.validate("userTel")) return ;
        //请求短信接口
        getShortMessage(this.userTel).then((res)=>{
          // console.log(res);
          if(res.data.success){
            this.code=res.data.data
          }
        })
      //禁用按钮
        this.disabled=true;
        //倒计时
        let timer=setInterval(()=>{
            --this.codeNum;
            this.codeMsg=`重新发送${this.codeNum}`
        },1000)
        //倒计时完后停止定时器
        setTimeout(()=>{
          clearInterval(timer);
          this.codeNum=6;
          this.codeMsg='获取短信验证码';
          this.disabled=false;

        },6000)

    },
    login() {
      console.log("login");
      //判断验证码是否正确
      if(this.code==this.userCode){
            addUser(this.userTel).then((res)=>{
              //将用户信息存储起来
              this.userLogin(res.data.data)
              // 跳转到我的页面
              this.$router.push('/my')
              console.log(res);
            })
      }
    },
    //验证信息提示
		validate( key ){
			let bool = true;
			if( !this.rules[key].rule.test( this[key])  ){
				//提示信息
				Toast(this.rules[key].msg);
				bool = false;
				return false;
			}
			return bool;
		},
    //密码登录
    goUserLogin() {
      this.$router.push("/userLogin");
    },
    //注册
    goRegister() {
      this.$router.push("/register");
    },
  },
  components: {
    Header,
    Tabbar,
  },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.32rem;
    background-color:#f5f5f5;
    div{
        margin:0.266666rem 0;
		width: 8.933333rem;
		height: 1.173333rem;
    }
    input{
        box-sizing: border-box;
        padding: 0 0.266666rem;
        background-color: #FFFFFF;
		border:1px solid #ccc;
        border-radius: 6px;
    }
    .login-tel{
		margin-top:0.8rem;
		input{
            height: 1rem;
			width: 8.933333rem;
		}
	}
    .login-code{
        display: flex;
        input{
            flex: 1;
        }
        button{
            padding:0 0.533333rem;
			line-height: 1.173333rem;
			color:#fff;
			background-color: #b0352f;
			border:0;
			border-radius: 6px;
        }
    }
    .login-btn{
        line-height: 44px;
        color:#fff;
        font-size: 0.48rem;
		text-align: center;
        background-color: #b0352f;
		border-radius: 6px;
    }
    .tab{
		display: flex;
		justify-content: space-between;
		font-size:0.373333rem;
	}
}
</style>