import eventBus from "@/eventBus";
import fangdou from "@/utils/fangdou";
import defaultImg from '@/assets/default.gif';

// 用来存放数据
let imgs = [];

function setImage(item) {
    // 1 先暂时使用默认图片
    item.dom.src = defaultImg;

    // 2 判断图片是否在可视区窗口内
    // 可视区窗口大小
    let clientHeight = document.documentElement.clientHeight;
    // 图片距离可视区窗口顶部距离
    let resp = item.dom.getBoundingClientRect();
    // 图片的高度 设置为150px
    let imgHeight = 150;

    if (resp.top >= -imgHeight && resp.top <= clientHeight) {

        item.dom.src = item.src;
        // 3 执行完成后直接删除
        imgs = imgs.filter((i) => i !== item);
    }
}

// 希望可以调用这个方法 实现图片的懒加载
function setImages() {
    for (const item of imgs) {
        // 执行每一张图片
        setImage(item);
    }
}

// 当滚动条滚动时执行
function handleScroll() {
    setImages();
}

eventBus.$on("mainScroll", fangdou(handleScroll, 50));

export default {
    inserted(el, binding) {
        const img = {
            dom: el,
            src: binding.value
        }
        imgs.push(img);
        // 加载完成先自动执行一次
        setImage(img);

    },
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el);
    },
};