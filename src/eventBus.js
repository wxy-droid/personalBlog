// 事件总线 就是一个对象 监听事件用的
// const listeners = {};
// export default {
//     // 监听某个事件
//     chakan(){
//         console.log(listeners);
//     },
//     $on(eventName, handle){
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handle);
//     },
//     // 取消监听事件
//     $off(eventName, handle){
//         if (!listeners[eventName]) {
//             return;
//         }
//         listeners[eventName].delete(handle);
//     },
//     // 触发监听事件
//     $emit(eventName, ...args){
//         if (!listeners[eventName]) {
//             return;
//         }
//         for (const handle of listeners[eventName]) {
//             handle(...args);
//         }
//     }

// };

/*
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：
 * - 滚动的dom元素
 */

import Vue from "vue";

const app = new Vue({})
Vue.prototype.$Bus = app;

export default app;
