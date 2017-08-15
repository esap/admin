import Vue from 'vue' 
import Vuex from 'vuex'
import axios from 'axios'
import { Message } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiPath: process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:9090/api/",
  	api2Path: process.env.NODE_ENV === 'production' ? "/api2/" : "http://localhost:9090/api2/",
    esPath: process.env.NODE_ENV === 'production' ? "/es/" : "http://localhost:9090/es/",
    appUrl: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:9090/",
    uploadUrl: process.env.NODE_ENV === 'production' ? "/upload" : "http://localhost:9090/upload",
    adminUrl: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:9090/admin/",
    mts: false,
    pSize:15,
    cPage:1,
    tableData:[], 
    showPagn:true,
    loading:false,
    topNav:"/login",
    userName:'',
	token:''
  },
  getters: {
    showData: s => s.tableData.slice((s.cPage-1)*s.pSize,s.pSize*s.cPage),
    mtstr: s => s.mts?'multiple':'single',
    isLogin: s => !!s.userName,
    isAdmin: s=> s.userName=="Admin",
	token: s=> "?token="+s.token,
	tokens: s=> '&token='+s.token
  },
  mutations: {
	setToken(state, p) {
	  state.token=p.token
	},
    mtsChg (state) {
      state.mts=!state.mts
    },
    sizeChange(state, v) {
      state.pSize=v;
    },
    currentPageChange(state, v) {
      state.cPage=v;
      console.log(`当前页: ${v}`);
    },
    updateTableData(state, v) {
      state.tableData=v;
    },
    clearTableData(state) {
      state.tableData=[];
    },
    setUserName(state, v) {
      state.userName=v;
    }
  },
  actions: {
    getApi({ commit, state }, apiParam) {
      state.loading=true;
      let apiUrl=state.apiPath;
      for ( let k in apiParam ) {
        apiUrl = apiUrl + '&' + k + '=' + apiParam[k]
      }
      axios.get(apiUrl)
	  .then(r => {
        if (state.loading) {    
          commit('updateTableData', r.data);    
          state.loading=false;              
        }
      })
	  .catch(e => {
        if (state.loading) {
          commit('clearTableData'); 
          state.loading=false;     
        }     
      })       
    },
    getData({ commit, state }, apiParam ) {
      state.loading=true;
      let apiUrl=state.apiPath;
      for ( let k in apiParam ) {
        if (k!="src")
        apiUrl = apiUrl + '&' + k + '=' + apiParam[k]
      }
      axios.get(apiUrl)
 	  .then(r => {
        state.loading=false;              
        apiParam.src = r.data;   
        console.log("src:",JSON.stringify(apiParam));     
      })
	  .catch(e => {
        state.loading=false;              
        apiParam.src = [];     
      }) 		
    },
    doLogin({ commit, state }, apiParam) {
      state.loading=true;
      let apiUrl=state.appUrl + 'login';
      axios.post(apiUrl, apiParam)
	  .then(r => {
        if (r.data.result) { 
          commit('setUserName', r.data.msg[0].dispName);    
          state.loading=false; 
		  commit('setToken',r.data) 
        } else {
          Message({
            showClose: true,
            message: '登陆失败',
            duration:1000
          });
        }
      })
	  .catch(e => {
        Message({
            showClose: true,
            message: '登陆失败',
            duration:1000
        });  
      })
    },
    outlogin( { commit }) {
      commit('setUserName', ''); 
    }
  }
})