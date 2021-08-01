import Vue from "vue";
// 路由插件
import VueRouter from "vue-router";

import routes from "./router.js";

import { titleCotroll } from "@/utils";

if (!window.VueRouter) {
  Vue.use(VueRouter); //组件使用一个vue插件
}

const router = new VueRouter({
  routes, //路由配置
  mode : "history"// 路由模式 默认匹配锚点 改为匹配路径
});

router.afterEach( (to, from) => {
  if (to.meta.title) {
    titleCotroll.setRouterTitle(to.meta.title);
  }
});

export default router;

/*
页面刷新跳转
请求index.html
请求各种js
请求各种css
执行js
创建vue应用
渲染全部的组件树
挂载到指定的div中

无刷新跳转
执行一段js代码：切换到指定的组件

*/