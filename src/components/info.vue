<template>
  <div class="wrap">
	<Modal title="重启ESAP中..." 
	  v-if="dialogFormVisible"
	  :closable="false"
	  :mask-closable="false">
      <i-circle :percent="pct"></i-circle>
    </Modal>

    <Form :model="form" :label-width="80">
      <div class="hr">应用 - wechat</div>
        <template v-for="v in form.Apps">    
		  <Row> 
			<Col span="4">
	          <Form-item label="应用ID - corpid" >
	            <Input v-model="v.AppId" placeholder="企业号填corpid,公众号填appid,必填"></Input>
	          </Form-item>
			</Col>
			<Col span="10">
	          <Form-item label="应用密钥 - Secret" >
	            <Input v-model="v.Secret" placeholder="app首页应用Secret或管理组Secret，必填"></Input>
	          </Form-item>
			</Col>
			<Col span="4">
	          <Form-item label="关闭状态 - Disabled" >
	            <i-switch v-model="v.Disabled"></i-switch>
	          </Form-item>
			</Col>
		  </Row>
		  <Row>
			<Col span="4">
	          <Form-item label="回调令牌 - Token" >
	            <Input v-model="v.Token" placeholder="统一回调Token，必填"></Input>
	          </Form-item> 
			</Col>
			<Col span="10">          
	          <Form-item label="回调密钥 - EncodingAesKey" >
	            <Input v-model="v.EncodingAesKey" placeholder="统一回调EncodingAesKey，必填"></Input>
	          </Form-item>
			</Col>
		  </Row>
        </template>

      <div class="hr">多应用 - Agents</div>        
        <Form-item v-for="v,k in form.Agents" label="Agentid / Secret" >
          <Input type="number" v-model="k" placeholder="应用agentid"></Input>
          <Input v-model="v" placeholder="应用secret"></Input>
        </Form-item>

      <div class="hr">数据库 - database</div>
        <Form-item label="驱动 - DbDriver" >
          <i-select class="right" v-model="form.DbDriver" placeholder="请选择">
            <i-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </i-option>
          </i-select>
        </Form-item>
        <Form-item label="服务器 - Server" >
          <Col :span="6">
            <Input v-model="form.Server" placeholder="本机可填.号"></Input>
          </Col>
          <Col class="line" :span="6">端口 - DbPort</Col>
          <Col :span="3">
          <Input type="number" v-model="form.DbPort" placeholder=""></Input>
          </Col>
        </Form-item>
        <Form-item label="账号 - UserId" >
          <Input v-model="form.UserId" placeholder=""></Input>
        </Form-item>
        <Form-item label="密码 - Pwd" >
          <Input v-model="form.Pwd" placeholder=""></Input>
        </Form-item>
        <Form-item label="默认数据库名称 - DbName" >
          <Input v-model="form.DbName" placeholder=""></Input>
        </Form-item>

      <div class="hr">其他 - other</div>
        <Form-item label="外网域名(：端口) - Host" >
          <Input v-model="form.Host" placeholder=""></Input>
        </Form-item>
        <Form-item label="ESWEB外网地址 - Esweb" >
          <Input v-model="form.Esweb" placeholder=""></Input>
        </Form-item>
        <Form-item label="微信提醒标题 - WxtxTitle" >
          <Input v-model="form.WxtxTitle" placeholder=""></Input>
        </Form-item>
        <Form-item label="微信签到标题 - WxqdTitle" >
          <Input v-model="form.WxqdTitle" placeholder=""></Input>
        </Form-item>
        <Form-item label="微信提醒重试 - ReTryMsg" >
          <i-switch class="right" v-model="form.ReTryMsg" placeholder=""></i-switch>
        </Form-item>
        <Form-item label="微信查询功能清单 - ShowFuncList" >
          <i-switch class="right" v-model="form.ShowFuncList" placeholder=""></i-switch>
        </Form-item>
        <Form-item label="微信查询进入提示 - ShowFuncListEnter" >
          <i-switch class="right" v-model="form.ShowFuncListEnter" placeholder=""></i-switch>
        </Form-item>
        <Form-item label="APP身份自动认证 - NeedWxOAuth2" >
          <i-switch class="right" v-model="form.NeedWxOAuth2" placeholder=""></i-switch>
        </Form-item>
        <Form-item label="调试模式 - Debug" >
          <i-switch class="right" v-model="form.Debug"></i-switch>
        </Form-item>

        <Form-item>
          <i-button type="danger" @click="restartSrv">重启服务</i-button>
          <i-button type="primary" @click="onSubmit">保存</i-button>
        </Form-item>
           
    </Form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
		dialogFormVisible: false,
		tm1:{},
		pct:0,
        options2:  [{
          value: 'mssql',
          label: 'Sql Server2005+'
        }, {
          value: 'mssql2000',
          label: 'Sql Server2000'
        }, {
          value: 'mysql',
          label: 'mysql'
        }, {
          value: 'postgres',
          label: 'postgresql'
        }, {
          value: 'sqlite',
          label: 'sqlite',
          disabled: true
        }, {
          value: 'access',
          label: 'access'
        }, {
          value: 'excel',
          label: 'excel'
        }],
      }
    },
    methods: {
      getData() {
        this.$http.get(this.$store.state.adminUrl+"config"+this.$store.getters.token)
		  	.then(r=> { this.form=r.data })
			.catch(e => { console.log(e) })
      },
      onSubmit() {          
          this.$http.post(this.$store.state.adminUrl+"config"+this.$store.getters.token, this.form)
          .then(r => { 
            if (r.data){
              this.$message({ message: '配置成功' })
              this.form=r.data
            }else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})        
      },      
	  restartSrv() {    
         this.$http.post(this.$store.state.adminUrl+"restart"+this.$store.getters.token, this.form)
         .then(r => { 
           if (r.data.result){
		         this.dialogFormVisible = true      
             this.$message({ message: '操作成功' })
             this.tm1 = setInterval(this.gogogo, 300)
           }else{
             this.$message({  message: "操作失败，请确认是否install了服务 错误消息-"+r.data.errmsg })
           }
         })
         .catch(e => { this.$message({  message: "操作失败，请确认是否install了服务"+e })})        
      },
	  gogogo(){
	      if(this.pct >= 100){
		    clearInterval(this.tm1)
		    this.dialogFormVisible = false
			this.pct=0
		  }else{			
		    this.pct = this.pct+5
		  }
	  },
      addAgent(){        
        this.form.Agents.x1='xx'
        console.log(this.form.Agents)
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
.wrap {
  margin: 0 5%;
}
.right {
  float: right;
}
.hr {
  padding: 12px 0;
  background-color: #eee;
  box-shadow: 3px 3px 3px #999;
}
</style>