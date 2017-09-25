<template>
<div id="app" class="layout" :class="{'layout-hide-text': spanLeft < 5}">
	<!-- 登陆 -->
	<Modal title="登陆ESAP云平台[3.0]"
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
	    <Button type="primary" @click="doLogin">确 定</Button>
	  </span>
	</Modal>
	<Modal title="关于"	v-model="modal2">
	  <p>用户等级：{{updateInfo.desc}}</p>
	  <p>累计使用：{{updateInfo.cnt}}天</p>
	  <p>当前版本：{{updateInfo.cver}}</p>
	  <p>最新版本：{{updateInfo.ver}}</p>
	  <div class="layout-copy">2015-2017 &copy; <a href="https://erp8.net" target="_blank">尹林信科</a></div>
	  <div>Powered by <a href="http://ylin.wang" target="_blank">@一零村长</a></div>
	  <span slot="footer">
	    <Button icon="ios-download-outline" type="primary" @click="update">升级</Button>
	  </span>
	</Modal>
	<!-- 内容 -->
	<Row>
	  <div v-if="$store.getters.isLogin">
		<Col :span="spanLeft" class="layout-menu-left">
		<Button type="text" @click="toggleClick"><img v-show="spanLeft<=1" src="./assets/esap.png" :width="32"></img><span v-show="spanLeft>1"><span class="hdFont" style="color: #ddd">ESAP</span>3.0</span></Button>	
		<Menu theme="dark" width="auto" @on-select="go">
		  <Menu-item name="info"><Icon type="settings" :size="iconSize"></Icon><span v-show="spanLeft>1">设置</span></Menu-item>
		  <Menu-item name="wxtx"><Icon type="paper-airplane" :size="iconSize"></Icon><span v-show="spanLeft>1">提醒</span></Menu-item>
		  <Menu-item name="wxcx"><Icon type="social-chrome-outline" :size="iconSize"></Icon><span v-show="spanLeft>1">查询</span></Menu-item>
		  <Menu-item name="wxtk"><Icon type="image" :size="iconSize"></Icon><span v-show="spanLeft>1">图库</span></Menu-item>
		  <Menu-item name="wxtxl"><Icon type="ios-people" :size="iconSize"></Icon><span v-show="spanLeft>1">通讯录</span></Menu-item>
		  <Menu-item name="email"><Icon type="email" :size="iconSize"></Icon><span v-show="spanLeft>1">Email</span></Menu-item>
		  <Menu-item name="esaplog"><Icon type="stats-bars" :size="iconSize"></Icon><span v-show="spanLeft>1">API日志</span></Menu-item>
		  <Menu-item name="syslog"><Icon type="stats-bars" :size="iconSize"></Icon><span v-show="spanLeft>1">系统日志</span></Menu-item>
		</Menu>
		<hr />
		<div class="menu-util">
		  <a style="color: #fff" href="https://esap.erp8.net" target="_blank">
		    <Icon type="help" :size="iconSize"></Icon>
		    <span v-show="spanLeft>1">帮助</span>
		  </a>
		</div>
		<div class="menu-util" v-show="!!$store.state.userName">
		  <a style="color: #fff" @click="about">
		    <Icon type="android-person" :size="iconSize"></Icon>
			<span v-show="spanLeft>1" style="color: #fff">关于</span>
		  </a>
	    </div>
		<!-- <div class="menu-util" v-show="!!$store.state.userName">
		  <a style="color: #fff" @click="update">
		    <Icon type="ios-download-outline" :size="iconSize"></Icon>
			<span v-show="spanLeft>1" style="color: #fff">升级</span>
		  </a>
	    </div> -->
	    <div class="menu-util" v-show="!!$store.state.userName" >
	      <a style="color: #fff" @click="loginOut">
		    <Icon type="android-walk" :size="iconSize"></Icon>
		    <span v-show="spanLeft>1">注销 [{{$store.state.userName}}]</span>
		  </a>
	    </div>	
		</Col>
	    <Col :span="spanRight">
            <div class="layout-content">
                <div class="layout-content-main"><router-view></router-view></div>
            </div>          
        </Col>
	  </div>
	  </Row>
	  <Back-top :height="100" :bottom="200">
        <div class="top">返回顶端</div>
      </Back-top>
</div>
</template>

<script>
import md5 from 'md5'
export default {
  	name: 'app',
  	data() {
	  return {
	  	pwd:'',
	    form: { user: '', pwd: '' },
	    updateInfo: {},
	    spanLeft: 3,
        spanRight: 21,
        modal2: false
	  }
	},
	computed: {
		notLogin() { return !this.$store.getters.isLogin },
		iconSize () { return this.spanLeft === 3 ? 14 : 24 }
	},
	methods: {
		getData() {
			this.$http.get(this.$tokenadmin("config"))
			.then(r=> { this.$store.state.form=r.data.data })
			.catch(e=> { console.log(e)})
		},
		doLogin() {
			this.form.pwd=md5(this.pwd)
			this.$store.dispatch('doLogin',this.form)
			setTimeout(this.getData, 1000)
		},
		loginOut() {
			this.pwd=''
			this.$store.dispatch('outlogin')
		},		
		about() {
		  this.$http.get(this.$tokenadmin("getreg"))
		  .then(r=> { 
		    if (r.data.result) {
		    	this.updateInfo=r.data
		    	this.modal2=true	 
		    } else {
		    	this.$Message.info(r.data.errmsg)
		    }
		  })
		  .catch(e => { console.log(e)})
		},
		update() {
			this.modal2=false
			this.$Modal.confirm({
				title:'升级ESAP',
				content:'点击确定后台将启动esap-cli升级工具，时间视网络情况而定，通常花费1分钟，此期间请不要重启或清除日志，升级完成后可点【关于】了解详情',
				onOk: () => {
                  this.$http.post(this.$tokenadmin("autoupdate"), this.form)
				  .then(r=> { 
				    if (r.data.result){
				    	this.$Message.info("已成功启动后台升级工具！")
				    } else {
				    	this.$Message.info(r.data.errmsg)
				    }
				  })
				  .catch(e => { this.$Message.info(e)})
                },
			})		 
		},
		go(name) {
			this.$router.push(name)
		},
	    toggleClick () {
            if (this.spanLeft === 3) {
                this.spanLeft = 1;
                this.spanRight = 23;
            } else {
                this.spanLeft = 3;
                this.spanRight = 21;
            }
        }
	},
	mounted(){
	  this.getData()
	}
}
</script>

<style lang="stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
.hdFont
	font-family: AVP
	font-size: 32px
	text-shadow: 3px 3px 2px #000
a
  color: #fff
.right 
	margin: 0 15px
	float: right
	color: #fff
	a 
		color: #fff
		cursor: pointer
		margin: 0 5px
.menu-util
	color: #fff
	padding: 12px 24px
.layout
    border: 1px solid #d7dde4
    background: #f5f7f9
    position: relative
    border-radius: 4px
    overflow: hidden
.layout-breadcrumb
    padding: 10px 15px 0
.layout-content
    min-height: 200px
    margin: 5px
    overflow: hidden
    background: #fff
    border-radius: 4px
.layout-content-main
    padding: 5px
.layout-copy
    // text-align: center
    padding: 40px 0 10px
    color: #9ea7b4
.layout-menu-left
    background: #464c5b
.layout-header
    height: 40px
    background: #fff
    box-shadow: 0 1px 1px rgba(0,0,0,.1)
.layout-logo-left
    width: 90%
    height: 30px
    background: #5b6270
    border-radius: 3px
    margin: 15px auto
.layout-ceiling-main a
    color: #9ba7b5
.layout-hide-text .layout-text
    display: none
.ivu-col
    transition: width .2s ease-in-out
.top
	padding: 10px
	background: rgba(0, 153, 229, .7)
	color: #fff
	text-align: center
	border-radius: 2px
</style>
