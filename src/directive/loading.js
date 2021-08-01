import loadingUrl from "@/assets/loading.svg";
import styles from "./loading.module.less";
// // 得到el中是否有loading效果的img元素
function getLoadingImg(el){
    return el.querySelector("img[data-role=loading]");
}
// // 用来创建img
function createLoadingImg(){
    const img = document.createElement('img');
    img.src = loadingUrl;
    img.dataset.role = 'loading';
    img.className = styles.imgLoading;
    return img;
}

export default function (el, binding) {
    // 该函数会被同时设置到bind和update中
    // 判断binding.value 来决定创建或者删除img元素
    let curImg = getLoadingImg(el);
    if (binding.value) {
        if (!curImg) {
            const img = createLoadingImg();
            el.appendChild(img);
        }
    } else {
        if (curImg) {
            curImg.remove();
        }
    }
};