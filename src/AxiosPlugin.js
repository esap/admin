import axios from 'axios'
import store from './store';
import {router} from './router/index';

export const Axios = axios.create({
  // baseURL:  'http://xxxxx/',
  timeout: 10000,
})

//POST传参序列化(添加请求拦截器)
 // 在发送请求之前做某件事
Axios.interceptors.request.use(config => {
    // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
    // if(config.method  === 'post'){
    //     // JSON 转换为 FormData
    //     const formData = new FormData()
    //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
    //     config.data = formData
    // }

    // 下面会说在什么时候存储 token
    // if (localStorage.token) {   
        config.headers.Authorization = 'Bearer ' + localStorage.token
    // }
    return config
},error =>{
    console.log("错误的传参", 'fail')
    return Promise.reject(error)
})

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res =>{
   //对响应数据做些事
    // if(!res.data.result){
    //    console.log(res.errmsg)
    //    return Promise.reject(res)
    // }
    return res
}, error => {
    if(error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      store.commit('logout')
      store.commit('clearOpenedSubmenu')
      console.log("not login in")
      router.push({ name: 'login' })
      // location.href = '/login'
    } else if (error.response.status === 500) {
       // 服务器错误
       // do something
       return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
})

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}