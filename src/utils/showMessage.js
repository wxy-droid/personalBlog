import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
export default function (options = {}) {
    const content = options.content || "评论成功";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    // 创建消息元素
    const div = document.createElement('div');
    const iconDom = getComponentRootDom(Icon, {
        type,
    })
    // 设置样式
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    const typeClassName = styles[`message-${type}`];
    div.className = `${styles.message} ${typeClassName}`;
    // 查看容器position是否被改动过
    if (container !== document.body) {
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }
    // 将div加到容器中
    container.appendChild(div);
    // 浏览器强行渲染
    div.clientHeight; // 导致reflow

    div.style.opacity = 1;
    div.style.transform = 'translate(-50%,-50%)';

    // 过一段时间消失
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = 'translate(-50%,-50%) translateY(-30px)';
        div.addEventListener('transitionend', function(){
            div.remove();
            // 回调函数
            options.callback && options.callback();
        }, {once:true});
    }, duration);
}