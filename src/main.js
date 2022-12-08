import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import Vant from 'vant';
import 'vant/lib/index.css';

//字体图标css文件
import '@/assets/css/iconfont.css'
//公共css文件
import "@/assets/css/common.css";
//淘宝无线适配
import '@/assets/js/flexible'
//ly-tab插件
import LyTab from 'ly-tab'
//fastclick插件，防止双击放大
import fastClick from 'fastclick'
fastClick.attach(document.body);
Vue.use(LyTab);
Vue.use(Mint);


Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
