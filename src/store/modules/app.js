import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import axios from 'axios';
import Vue from 'vue';

function getpath (path) {
    // return process.env.NODE_ENV === 'production' ? "/"+path : "http://localhost:9090/"+path
    let url = 'http://' + Cookies.get('esap_server') + '/' + path;
    // console.log(url);
    return url;
}

const app = {
    state: {
        // apiPath: getpath("api/"),
        // api2Path: getpath("api2/"),
        // esPath: getpath("es/"),
        // appUrl: getpath(""),
        // uploadUrl: getpath("upload"),
        // adminUrl: getpath("admin/"),
        mts: false,
        pSize: 15,
        cPage: 1,
        tableData: [],
        showPagn: true,
        loading: false,
        userName: sessionStorage.getItem('esap_user'),
        form: { Dbs: [], Apps: [], Tasks: [] },

        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        tagsList: [...otherRouter.children],
        messageCount: 0,
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    getters: {
        apiPath: s => getpath('api/'),
        api2Path: s => getpath('api2/'),
        esPath: s => getpath('es/'),
        appUrl: s => getpath(''),
        uploadUrl: s => getpath('upload'),
        adminUrl: s => getpath('admin/'),
        showData: s => s.tableData.slice((s.cPage - 1) * s.pSize, s.pSize * s.cPage),
        mtstr: s => s.mts ? 'multiple' : 'single',
        isLogin: s => !!s.userName,
        isAdmin: s => s.userName === 'Admin',
        token: s => '?token=' + sessionStorage.getItem('esap_token'),
        dbs: s => s.form.Dbs.filter(v => v.IsRun),
        apps: s => {let a = s.form.Apps.filter(v => v.IsRun);a.push({AppName:''});return a},
        tasks: s => s.form.Tasks.filter(v => v.IsRun)
    },
    mutations: {
        mtsChg (state) { state.mts = !state.mts; },
        sizeChange (state, v) { state.pSize = v; },
        currentPageChange (state, v) { state.cPage = v; },
        updateTableData (state, v) { state.tableData = v; },
        clearTableData (state) { state.tableData = []; },
        setUserName (state, v) { state.userName = v; },

        setTagsList (state, list) {
            state.tagsList.push(...list);
        },
        updateMenulist (state) {
            let accessCode = parseInt(Cookies.get('access'));
            let menuList = [];
            appRouter.forEach((item, index) => {
                if (item.access !== undefined) {
                    if (Util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item);
                        } else {
                            let len = menuList.push(item);
                            let childrenArr = [];
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child;
                                    }
                                } else {
                                    return child;
                                }
                            });
                            menuList[len - 1].children = childrenArr;
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (Util.showThisRoute(child.access, accessCode)) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });
            state.menuList = menuList;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },
        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },
        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },
        setMessageCount (state, count) {
            state.messageCount = count;
        },
        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    },
    actions: {
        getApi ({ commit, state }, apiParam) {
            state.loading = true;
            let apiUrl = state.apiPath;
            for (let k in apiParam) {
                apiUrl = apiUrl + '&' + k + '=' + apiParam[k];
            }
            axios.get(apiUrl)
                .then(r => {
                    if (state.loading) {
                        commit('updateTableData', r.data);
                        state.loading = false;
                    }
                })
                .catch(e => {
                    if (state.loading) {
                        commit('clearTableData');
                        state.loading = false;
                    }
                });
        },
        getData ({ commit, state }, apiParam) {
            state.loading = true;
            let apiUrl = state.apiPath;
            for (let k in apiParam) {
                if (k !== 'src') apiUrl = apiUrl + '&' + k + '=' + apiParam[k];
            }
            axios.get(apiUrl)
                .then(r => {
                    state.loading = false;
                    apiParam.src = r.data;
                    // console.log('src:', JSON.stringify(apiParam));
                })
                .catch(e => {
                    state.loading = false;
                    apiParam.src = [];
                });
        },
        doLogin ({ commit, state }, apiParam) {
            state.loading = true;
        },
        outlogin ({ commit }) {
            commit('setUserName', '');
            sessionStorage.removeItem('esap_token');
            sessionStorage.removeItem('esap_user');
        }
    }
};

export default app;
