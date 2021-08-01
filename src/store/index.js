import Vue from "vue";
import { Store, install} from "vuex";
import banner from "./banner";
import overall from "./overall";
import about from "./about";
import project from "./project";

if (!window.Vuex) {
    install(Vue);
}

export default new Store({
    modules: {
        banner,
        overall,
        about,
        project,
    },

    // 严格模式
    strict: true,
});