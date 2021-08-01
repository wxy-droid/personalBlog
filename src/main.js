// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less"
import router from "./router";
import showMessage from './utils/showMessage';
Vue.prototype.$showMessage =  showMessage;
import './eventBus';
import store from "./store";
store.dispatch("overall/fetchOverall");

// 定义全局指令
import vLoading from "@/directive/loading";
import vLazy from "@/directive/lazy";
Vue.directive('loading', vLoading);
Vue.directive('lazy', vLazy);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");