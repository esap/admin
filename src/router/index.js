import Vue from 'vue'
import Router from 'vue-router'
import info from '@/components/info'

Vue.use(Router)

function include(v) {
    return {path:'/'+v,name: v,component:resolve=>require(["@/components/"+v],resolve)}
}

export default new Router({
  routes: [  
    include("email"),
    include("wxtx"),
    include("wxcx"),
    include("wxtk"),
    include("wxtxl"),
    include("wxlog"),
    include("info"),
    include("test"),
    { path: '*', name: 'info', component: info },
  ]
})
