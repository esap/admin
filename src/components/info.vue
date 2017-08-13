<template>
  <div class="wrap">
	<Modal title="重启ESAP中..." 
	  v-if="dialogFormVisible"
	  :closable="false"
	  :mask-closable="false">
      <i-circle :percent="pct"></i-circle>
    </Modal>

    <Form :model="form" :label-width="80">
      <Alert type="info" class="hr" show-icon>应用 - wechat</Alert>
        <template v-for="v in form.Apps">    
		  <Row> 
			<Col span="3">
	          <Form-item label="应用名 - appName" >
	            <Input v-model="v.AppName" placeholder="应用名称，唯一,必填"></Input>
	          </Form-item>
			</Col>
			<Col span="3">
	          <Form-item :label-width="50" label="appId" >
	            <Input v-model="v.AppId" placeholder="企业号填corpid,公众号填appid,必填"></Input>
	          </Form-item>
			</Col>
			<Col span="3">
	          <Form-item :label-width="60" label="agentId" >
	            <Input v-model="v.AgentId" placeholder="企业号填agentid,公众号填0"></Input>
	          </Form-item>
			</Col>
			<Col span="4">
	          <Form-item label="应用密钥 - Secret" >
	            <Input v-model="v.Secret" placeholder="应用或管理组Secret，必填"></Input>
	          </Form-item>
			</Col>
			<Col span="3">
	          <Form-item label="回调令牌 - Token" >
	            <Input v-model="v.Token" placeholder="回调Token"></Input>
	          </Form-item> 
			</Col>
			<Col span="4">          
	          <Form-item label="回调密钥 - AesKey" >
	            <Input v-model="v.EncodingAesKey" placeholder="回调EncodingAesKey"></Input>
	          </Form-item>
			</Col>
			<Col span="2">
	          <Form-item label="关闭应用 - Disabled" >
	            <i-switch v-model="v.Disabled"></i-switch>
	          </Form-item>
			</Col>
		  </Row>
        </template>

      <Alert type="info" class="hr" show-icon>数据库 - database</Alert>
		<template v-for="v in form.Dbs"> 
		  <Row>
	        <Col :span="4">
	          <Form-item label="数据源名 - DsName" >
	            <Input v-model="v.DsName" placeholder="唯一标识，必填"></Input>
	          </Form-item>
	        </Col>
			<Col :span="4">
		        <Form-item label="驱动 - DbDriver" >
		          <Select v-model="v.DbDriver" placeholder="请选择">
		            <i-option
		              v-for="item in options2"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value"
		              :disabled="item.disabled">
		            </i-option>
		          </Select>
		        </Form-item>
			</Col>
			<Col :span="3">
	          <Form-item label="服务器 - Server" >
	            <Input v-model="v.Server" placeholder="本机可填.号"></Input>
	          </Form-item>
	        </Col>
	        <Col :span="3">
			  <Form-item label="端口 - DbPort">
	            <Input type="number" v-model="v.DbPort" placeholder=""></Input>
	          </Form-item>
	        </Col>
	        <Col :span="3">
	        <Form-item label="账号 - User" >
	          <Input v-model="v.User" placeholder=""></Input>
	        </Form-item>
			</Col>
	        <Col :span="3">
	        <Form-item label="密码 - Pwd" >
	          <Input v-model="v.Pwd" placeholder=""></Input>
	        </Form-item>
			</Col>
	        <Col :span="3">
	        <Form-item label="数据库名 - Db" >
	          <Input v-model="v.DbName" placeholder=""></Input>
	        </Form-item>
			</Col>
		  </Row>
		</template>
		
	  <Alert type="info" class="hr" show-icon>计划任务 - task</Alert>
		<template v-for="v in form.Tasks"> 
		  <Row>
	        <Col :span="4">
	          <Form-item label="计划Id - taskid" >
	            <Input v-model="v.TaskID" placeholder="唯一标识，必填"></Input>
	          </Form-item>
	        </Col>
			<Col :span="4">
		        <Form-item label="计划类型 - handlername" >
		          <Select v-model="v.HandlerName" placeholder="请选择">
		            <i-option
		              v-for="item in options3"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value"
		              :disabled="item.disabled">
		            </i-option>
		          </Select>
		        </Form-item>
			</Col>
			<Col :span="5">
	          <Form-item label="周期 - express" >
	            <Input v-model="v.Express" placeholder="本机可填.号"></Input>
	          </Form-item>
	        </Col>
	        <Col span="2">
	          <Form-item label="开关 - isrun" >
	            <i-switch v-model="v.IsRun"></i-switch>
	          </Form-item>
			</Col>
		  </Row>
		</template>

      <Alert type="info" class="hr">其他 - other</Alert>
        <Form-item label="外网域名 - Host" >
          <Input v-model="form.Host" placeholder=""></Input>
        </Form-item>
		<Row>
	    <Col :span="3">
        <Form-item label="提醒重试 - ReTryMsg" >
          <i-switch class="right" v-model="form.ReTryMsg" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="3">
        <Form-item label="进入提示 - EnterMsg" >
          <i-switch class="right" v-model="form.ShowFuncListEnter" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="3">
        <Form-item label="自动认证 - NeedWxOAuth2" >
          <i-switch class="right" v-model="form.NeedWxOAuth2" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="3">
        <Form-item label="调试模式 - Debug" >
          <i-switch class="right" v-model="form.Debug"></i-switch>
        </Form-item>
		</Col>
		</Row>
           
    </Form>
      <Button type="success" @click="getData">刷新 Refresh</Button>
      <Button type="warning" @click="restartSrv">重启服务 Restart</Button>
      <Button type="primary" @click="onSubmit">保存 Save</Button>
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
          label: 'Sql2005+'
        }, {
          value: 'Sql2000',
          label: 'Sql2000'
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
		options3:  [{
          value: 'WxdkTask',
          label: '微信打卡'
        }, {
          value: 'WxspTask',
          label: '微信审批'
        }, {
          value: 'EmailTask',
          label: '邮件'
        }, {
          value: 'WxtxTask',
          label: '微信提醒'
        }, {
          value: 'WxtxlTask',
          label: '通讯录同步'
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
  margin: 0 15px 15px;
}
.hr {
  box-shadow: 3px 3px 3px #999;
}
</style>