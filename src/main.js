import Vue from 'vue';
import iView from 'iview';
import ElementUI from 'element-ui';
// import axios from 'axios'
import 'element-ui/lib/theme-default/index.css';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import AxiosPlugin from './AxiosPlugin';

// Vue.prototype.$http = axios
Vue.prototype.$token = function (param) { return store.getters.apiPath + param + '?'; };
Vue.prototype.$tokenadmin = function (param) { return store.getters.adminUrl + param + '?'; };
Vue.prototype.$tokenes = function (param) { return store.getters.esPath + param + '?'; };
Vue.prototype.$tokenup = function () { return store.getters.uploadUrl + '?'; };

Vue.use(AxiosPlugin);
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
