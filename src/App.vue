<template>
  <div id="app">
  	<!-- 登陆 -->
	<Modal title="登陆"
	  :closable="false"
  	  :mask-closable="false"
	  v-model="notLogin">
	  <Form :model="form">
	    <Form-item label="账号">
	      <Input v-model="form.user" autofocus @on-enter="doLogin">
		    <Icon type="person" slot="prepend"></Icon>
		  </Input>
	    </Form-item>
	    <Form-item label="密码">
		  <Input v-model="pwd" type="password" @on-enter="doLogin">
			<Icon type="ios-locked-outline" slot="prepend"></Icon>
		  </Input>
	    </Form-item>
	  </Form>
	  <span slot="footer">
	    <Button type="primary" @click.native="doLogin">确 定</Button>
	  </span>
	</Modal>
	<!-- 内容 -->	
	<div v-if="$store.getters.isLogin">
		<el-menu router theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
		  <el-menu-item index="info">ESAP3.0</el-menu-item>    
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
	  }
	},
	computed: {
		notLogin() { return !this.$store.getters.isLogin }
	},
	methods: {
		doLogin() {
			this.form.pwd=md5(this.pwd)
			this.$store.dispatch('doLogin',this.form)
		},
		loginOut() {
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
  // margin-top: 10px
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
