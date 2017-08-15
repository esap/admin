<template>
  <div class="wrap">
	<Modal width="240"
	  title="重启ESAP中..." 
	  style="text-align:center"
	  v-model="modal1"
	  :closable="false"
	  :mask-closable="false">
      <i-circle :percent="pct" stroke-color="#5cb85c">
	    <div style="font-size:24px" v-if="pct<100">{{pct}}%</div>
	    <Icon v-if="pct==100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
	  </i-circle>
	  <div slot="footer"></div>
    </Modal>

    <Form :model="form" :label-width="80">
      <Alert class="hr" show-icon>应用 - wechat<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Apps.push({})"></Icon></Alert>
        <template v-for="v,k in form.Apps">    
		  <Row> 
			<Col span="3">
	          <Form-item label="应用名 - appName" >
	            <Input v-model="v.AppName" placeholder="唯一,必填"></Input>
	          </Form-item>
			</Col>
			<Col span="3">
	          <Form-item :label-width="50" label="appId" >
	            <Input v-model="v.AppId" placeholder="企业号填corpid,公众号填appid,必填"></Input>
	          </Form-item>
			</Col>
			<Col span="3">
	          <Form-item :label-width="60" label="agentId" >
				<Input-number :max="9999999" :min="0" v-model="v.AgentId" placeholder="企业号填agentid,公众号填0"></Input-number>
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
			<Col span="1">
	          <Form-item label="关闭应用 - Disabled" >
	            <i-switch v-model="v.Disabled"></i-switch>
	          </Form-item>
			</Col>
			<Col :span="1">
			  <Form-item :label-width="0">
			  <Button shape="circle" type="text" size="small" @click.native="form.Apps.splice(k,1)">
			    <Icon :size="20" type="minus-circled" ></Icon>
			  </Button>
			  </Form-item>
			</Col>
		  </Row>
        </template>

      <Alert class="hr" show-icon>数据库 - database<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Dbs.push({})"></Icon></Alert>
		<template v-for="v,k in form.Dbs"> 
		  <Row>
	        <Col :span="3">
	          <Form-item label="数据源名 - DbName" >
	            <Input v-model="v.DbName" placeholder="唯一标识，必填"></Input>
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
	          <Input v-model="v.DbName" placeholder="">
			  </Input>
	        </Form-item>
			</Col>
			<Col :span="1">
			  <Button shape="circle" type="text" @click.native="form.Dbs.splice(k,1)">
			    <Icon :size="20" type="minus-circled" ></Icon>
			  </Button>
			</Col>
		  </Row>
		</template>
		
	  <Alert class="hr" show-icon><Icon type="ios-timer-outline"></Icon> 计划任务 - task<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Tasks.push({})"></Icon></Alert>
		<template v-for="v,k in form.Tasks"> 
		  <Row>
	        <Col :span="5">
	          <Form-item label="计划Id - taskid" >
	            <Input v-model="v.TaskID" placeholder="唯一标识，必填"></Input>
	          </Form-item>
	        </Col>
			<Col :span="5">
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
	        <Col span="1">
	          <Form-item label="开关 - isrun" >
	            <i-switch v-model="v.IsRun"></i-switch>
	          </Form-item>
			</Col>
			<Col :span="1">
			  <Form-item :label-width="0">
			  <Button shape="circle" type="text" @click.native="form.Tasks.splice(k,1)">
			    <Icon :size="20" type="minus-circled" ></Icon>
			  </Button>
			  </Form-item>
			</Col>
		  </Row>
		</template>

      <Alert class="hr">其他 - other</Alert>
        <Form-item label="外网域名 - Host" >
          <Input v-model="form.Host" placeholder=""></Input>
        </Form-item>
		<Row>
	    <Col :span="4">
        <Form-item label="提醒重试 - ReTryMsg" >
          <i-switch class="right" v-model="form.ReTryMsg" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="4">
        <Form-item label="进入提示 - EnterMsg" >
          <i-switch class="right" v-model="form.ShowFuncListEnter" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="4">
        <Form-item label="自动认证 - NeedWxOAuth2" >
          <i-switch class="right" v-model="form.NeedWxOAuth2" placeholder=""></i-switch>
        </Form-item>
		</Col>
	    <Col :span="4">
        <Form-item label="调试模式 - Debug" >
          <i-switch class="right" v-model="form.Debug"></i-switch>
        </Form-item>
		</Col>
		</Row>
           
    </Form>
      <Button type="success" @click="getData"><Icon :size="20" type="ios-reload" /> 刷新</Button>
      <Button type="warning" @click="restartSrv"><Icon :size="20" type="ios-loop" /> 重启服务</Button>
      <Button type="primary" @click="saveData"><Icon :size="20" type="ios-download-outline" /> 保存</Button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
		modal1: false,
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
		  	.then(r=> { this.form=r.data.data })
			.catch(e=> { console.log(e) })
      },
      saveData() {          
          this.$http.post(this.$store.state.adminUrl+"config"+this.$store.getters.token, this.form)
          .then(r => {
            if (r.data.result){
              this.$Message.info('配置成功')
              this.form=r.data.data
            }else{
              this.$Message.info(r.data.errmsg)
            }
          })
          .catch(e=> { this.$Message.info(r.data.errmsg)})        
      },      
	  restartSrv() {    
         this.$http.post(this.$store.state.adminUrl+"restart"+this.$store.getters.token, this.form)
         .then(r => { 
           if (r.data.result){
		         this.modal1 = true      
             this.$Message.info('操作成功')
			 this.pct=0
             this.tm1 = setInterval(this.gogogo, 200)
           }else{
             this.$Message.info("操作失败，请确认是否install了服务 "+r.data.errmsg)
           }
         })
         .catch(e => { this.$Message.info("操作失败，请确认是否install了服务 "+e)})        
      },
	  gogogo(){
	      if(this.pct >= 100){
		    this.modal1 = false
		    clearInterval(this.tm1)
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