var routerTitle = '',
    SiteTitle = '';

// 将路由标题和网站标题相结合
function setTitle() {
    // 如果两个都没有值
    if (!routerTitle && !SiteTitle) {
        document.title = 'loading...';
    } else if (routerTitle && !SiteTitle) {
        // 如果路由有值 网站没有值
        document.title = routerTitle;
    } else if (!routerTitle && SiteTitle) {
        // 如果路由没有有值 网站有值
        document.title = SiteTitle;
    } else {
        // 路由 网站 都有值
        document.title = routerTitle + '-' + SiteTitle;
    }
};

export default {
    // 设置路由标题
    setRouterTitle(title) {
        routerTitle = title;
        setTitle();
    },
    // 设置网站标题
    setSiteTitle(title) {
        SiteTitle = title;
        setTitle();
    }
}