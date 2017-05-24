import Vue from 'vue'
import Router from 'vue-router'
import email from '@/components/email'
import wxtx from '@/components/wxtx'
import wxtk from '@/components/wxtk'
import wxqd from '@/components/wxqd'
import wxyj from '@/components/wxyj'
import wxtxl from '@/components/wxtxl'
import wxcx from '@/components/wxcx'

Vue.use(Router)

export default new Router({
  routes: [  
    {
      path: '/email',
      name: 'email',
      component: email
    },    
    {
      path: '/wxtx',
      name: 'wxtx',
      component: wxtx
    },     
    {
      path: '/wxtk',
      name: 'wxtk',
      component: wxtk
    },    
    {
      path: '/wxyj',
      name: 'wxyj',
      component: wxyj
    },    
    {
      path: '/wxqd',
      name: 'wxqd',
      component: wxqd
    },    
    {
      path: '/wxcx',
      name: 'wxcx',
      component: wxcx
    },  
    {
      path: '/wxtxl',
      name: 'wxtxl',
      component: wxtxl
    },
  ]
})
