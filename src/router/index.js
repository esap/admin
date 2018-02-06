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
    include("sms"),
    include("wxcx"),
    include("wxtk"),
    include("esaplog"),
    include("wxtxl"),
    include("localtxl"),
    include("syslog"),
    include("info"),
    { path: '*', name: 'info', component: info }
  ]
})
