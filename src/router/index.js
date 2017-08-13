import Vue from 'vue'
import Router from 'vue-router'
import email from '@/components/email'
import wxtx from '@/components/wxtx'
import wxtk from '@/components/wxtk'
import wxcx from '@/components/wxcx'
import test from '@/components/test'
import wxtxl from '@/components/wxtxl'
import info from '@/components/info'
import log from '@/components/log'

Vue.use(Router)

export default new Router({
  routes: [  
    { path: '/email', name: 'email', component: email },    
    { path: '/wxtx', name: 'wxtx', component: wxtx },    
    { path: '/wxtk', name: 'wxtk', component: wxtk },    
    { path: '/wxcx', name: 'wxcx', component: wxcx },    
    { path: '/wxtxl', name: 'wxtxl', component: wxtxl }, 
    { path: '/log', name: 'log', component: log }, 
    { path: '/info', name: 'info', component: info }, 
    { path: '/test', name: 'test', component: test }, 
    { path: '*', name: 'info', component: info }, 
  ]
})
