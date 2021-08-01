// 引入进度条
import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
import NotFound from "@/views/NotFound.vue";

// 进度条配置
configure({
  // 进度条加速
  trickleSpeed: 10,
  // 进度条小圆圈不显示
  showSpinner: false
});

// 延迟
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

function getPageComponents(func) {
  return async () => {
    // 进度条开始
    start();
    // 只有在开发阶段才延迟加载
    if (process.env.NODE_ENV === "development") {
      await delay(2000);
    }
    const comp = await func();
    // 进度条结束
    done();
    return comp;
  };
};

export default [
  {
    name: "Home",
    path: "/",
    component: getPageComponents( () => import(/* webpackChunkName: "home" */ "@/views/Home")),
  meta: {
    title: "首页"
  }
  },
  {
    name: "About",
    path: "/about",
    component: getPageComponents( () => import(/* webpackChunkName: "about" */ "@/views/About")),
    meta: {
      title: "关于我"
    }
  },
  {
    name: "Blog",
    path: "/article",
    component: getPageComponents( () => import(/* webpackChunkName: "blog" */ "@/views/Blog")),
    meta: {
      title: "文章"
    }
  },
  {
    name: "category",
    path: "/article/cate/:categoryId",
    component: getPageComponents( () => import(/* webpackChunkName: "blog" */ "@/views/Blog")),
    meta: {
      title: "文章"
    }
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: getPageComponents( () => import(/* webpackChunkName: "detail" */ "@/views/Blog/Detail")),
    meta: {
      title: "文章详情"
    }
  },
  {
    name: "Project",
    path: "/project",
    component: getPageComponents( () => import(/* webpackChunkName: "project" */ "@/views/Project")),
    meta: {
      title: "项目&效果"
    }
  },
  {
    name: "Message",
    path: "/message",
    component: getPageComponents( () => import(/* webpackChunkName: "message" */ "@/views/Message")),
    meta: {
      title: "留言板"
    }
  },
  {
    name : "NotFound",
    path : "*",
    component : NotFound,
  }
];