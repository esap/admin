<template>
  <div id="app">
  	<!-- login window -->
	<div @keyup.enter="doLogin">
		<el-dialog title="登陆"
		  :close-on-click-modal="false"
		  :close-on-press-escape="false"
		  :show-close="false"
		  v-model="loginVisible">
		  <el-form :model="form">
		    <el-form-item label="账号">
		      <el-input v-model="form.user" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码">
			  <el-input v-model="pwd" 
				  type="password" 
				  auto-complete="off">
			  </el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click.native="doLogin">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
	<!-- header导航 -->	
	<el-menu router theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
	  <el-menu-item index="info">ESAP2</el-menu-item>    
	  <el-menu-item index="wxtx">提醒</el-menu-item>
	  <el-menu-item index="wxcx">查询</el-menu-item>
	  <el-menu-item index="wxtk">图库</el-menu-item>
	  <el-menu-item index="wxtxl">通讯录</el-menu-item>
	  <el-menu-item index="email">Email</el-menu-item>
	  <el-menu-item index="log">日志</el-menu-item>
	  <el-menu-item index="/"><a href="https://esap.erp8.net" target="_blank">帮助</a></el-menu-item>
	  <span class="right" v-show="!!$store.state.userName">
		{{"欢迎您，" + $store.state.userName}}
	  <a @click="loginOut">退出登陆</a>
      </span>
	</el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  	name: 'app',
  	data() {
	  return {
	  	pwd:'',
	    activeIndex: '1',
	    activeIndex2: '1',
	    form: { user: '', pwd: '' },
	  };
	},
	computed: {
		loginVisible() {
			return !this.$store.getters.isLogin
		}
	},
	methods: {
		handleSelect(key, keyPath) {
		console.log(key, keyPath);
		},
		doLogin() {
			this.form.pwd=md5(this.pwd);
			this.$store.dispatch('doLogin',this.form)
			console.log(JSON.stringify(this.form));
		},
		loginOut(){
			this.pwd=''
			this.$store.dispatch('outlogin')
		}
	},
}
</script>

<style lang="stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 10px
.right 
	margin: 15px
	float: right
	color: #fff
	font-size: 14px
	a 
		font-size: 12px
		color: #69f
		cursor: pointer
		margin: 0 5px
</style>
