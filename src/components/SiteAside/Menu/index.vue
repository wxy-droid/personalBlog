<template>
  <nav class="menu-container">
    <RouterLink
      v-for="item in items"
      :key="item.link"
      :to="{ name : item.name}"
      :exact="item.exact"
      active-class="selected"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home", 
          link: "/",
          title: "首页",
          icon: "home",
          exact : true,
        },
        {
          name: "Blog", 
          link: "/blog",
          title: "文章",
          icon: "blog",
          exact: false, //不需要精确匹配
        },
        {
          name: "About", 
          link: "/about",
          title: "关于我",
          icon: "about",
          exact : true,
        },
        {
          name: "Project", 
          link: "/project",
          title: "项目&效果",
          icon: "code",
          exact : true,
        },
        {
          name: "Message", 
          link: "/message",
          title: "留言板",
          icon: "chat",
          exact : true,
        },
      ],
    };
  },
  // methods: {
  //   isSelected(item) {
  //     let link = item.link.toLowerCase(); //菜单连接地址
  //     let curPathname = location.pathname.toLowerCase(); //当前；；去访问的路径
  //     if (item.startWith) {
  //       return curPathname.startsWith(link);
  //     } else {
  //       return curPathname === link;
  //     }
  //   },
  // },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
    color: @gray;
    margin: 24px 0;
    a {
        &.selected {
            background: darken(@words, 3%);
        }
        padding: 0 50px;
        display: block;
        display: flex;
        align-items: center;
        height: 45px;
        .icon {
            width: 24px;
        }
        &:hover {
            color: #fff;
        }
    }
}
</style>