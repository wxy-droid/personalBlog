import { getOverall } from "@/appi/overall";
import { titleCotroll } from "@/utils";

export default {
    namespaced: true,
    
    state: {
        loading : false,
        data : null
    },
    mutations: {    
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        }
    },
    actions: {
        async fetchOverall(ctx) {

            ctx.commit('setLoading', true);

            const resp = await getOverall();

            ctx.commit("setData", resp);

            ctx.commit('setLoading', false);

            if (resp.favicon) {
                let link = document.querySelector("link[ref='shortcut icon']");
                if (link) {
                    return;
                }
                link = document.createElement('link');
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = resp.favicon;
                document.querySelector('head').appendChild(link);
            }

            if (resp.siteTitle) {
                titleCotroll.setSiteTitle(resp.siteTitle);
            }
        }

    }
}