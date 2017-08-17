<template>
  <div class="wrap">
    <Form :model="form" :label-width="60">
      <Alert class="hr" show-icon>应用 - wechat<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Apps.push({})"></Icon></Alert>
        <!-- <Table stripe :columns="columns1" :data="form.Apps"></Table> -->
        <el-table
	      stripe
	      :data="form.Apps"
	      style="width: 100%">
	      <el-table-column prop="AppName" label="应用名" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.AppName"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AppType" label="类型" width="100">	      	
	        <template scope="scope">
	          <Tooltip content="公众号填pub,可选"> 
	            <Input v-model="scope.row.AppType"></Input>
	          </Tooltip>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AppId" label="AppId" width="150">	      	
	        <template scope="scope">
	        <Input v-model="scope.row.AppId" placeholder="企业号填corpid,公众号填appid,必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AgentId" label="AgentId" width="100">	      	
	        <template scope="scope">
	        <Input-number :max="9999999" :min="0" v-model="scope.row.AgentId" placeholder="企业号填agentid,公众号填0"></Input-number>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Secret" label="Secret" width="200">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Secret" show-overflow-tooltip placeholder="应用或管理组Secret，必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Token" label="Token" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Token" placeholder="回调Token"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="EncodingAesKey" label="EncodingAesKey" width="200">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.EncodingAesKey" show-overflow-tooltip placeholder="回调EncodingAesKey"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Disabled" label="关闭" width="80">	      	
	        <template scope="scope">
	          <i-switch v-model="scope.row.Disabled"></i-switch>
	        </template>
	      </el-table-column>	      
	      <el-table-column label="操作" width="150">
	        <template scope="scope">
	          <Button size="small" @click="getMenu(scope.row)">菜单</Button>
	          <Button size="small" type="error" @click="form.Apps.splice(scope.$index, 1)">删除</Button>
	        </template>
	      </el-table-column>
	    </el-table>

      <Alert class="hr" show-icon>数据库 - database<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Dbs.push({})"></Icon></Alert>
		<template v-for="v,k in form.Dbs"> 
		  <Row>
			<Col :span="1">
			  <Button shape="circle" type="text" @click.native="form.Dbs.splice(k, 1)">
			    <Icon :size="20" type="minus-circled" ></Icon>
			  </Button>
			</Col>
	        <Col :span="3">
	          <Form-item label="数据源名 - DbName">
	            <Input v-model="v.DbName" placeholder="唯一标识，必填"></Input>
	          </Form-item>
	        </Col>
			<Col :span="4">
		        <Form-item label="驱动 - Driver">
		          <Select v-model="v.Driver" placeholder="请选择">
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
	          <Form-item label="服务器 - Server">
	            <Input v-model="v.Server" placeholder="本机可填.号"></Input>
	          </Form-item>
	        </Col>
	        <Col :span="3">
			  <Form-item label="端口 - Port">
	            <Input-number v-model="v.Port" placeholder=""></Input-number>
	          </Form-item>
	        </Col>
	        <Col :span="3">
		        <Form-item label="账号 - User">
		          <Input v-model="v.User" placeholder=""></Input>
		        </Form-item>
			</Col>
	        <Col :span="3">
		        <Form-item label="密码 - Pwd">
		          <Input v-model="v.Pwd" placeholder=""></Input>
		        </Form-item>
			</Col>
	        <Col :span="3">
		        <Form-item label="数据库名 - Db">
		          <Input v-model="v.DbName" placeholder="">
				  </Input>
		        </Form-item>
			</Col>
		  </Row>
		</template>
		
	  <Alert class="hr" show-icon><Icon type="ios-timer-outline"></Icon> 计划任务 - task<Icon slot="icon" size="20" type="plus-circled" @click.native="form.Tasks.push({})"></Icon></Alert>
		<template v-for="v,k in form.Tasks"> 
		  <Row>
		  	<Col :span="1">
			  <Form-item :label-width="1">
			  <Button shape="circle" type="text" @click.native="form.Tasks.splice(k,1)">
			    <Icon :size="20" type="minus-circled" ></Icon>
			  </Button>
			  </Form-item>
			</Col>
	        <Col :span="5">
	          <Form-item label="计划Id - taskid">
	            <Input v-model="v.TaskID" placeholder="唯一标识，必填"></Input>
	          </Form-item>
	        </Col>
			<Col :span="5">
		        <Form-item label="类型 - Handler" >
		          <Select v-model="v.Handler" placeholder="请选择">
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
	          <Form-item label="周期 - express">
	            <Input v-model="v.Express" placeholder="本机可填.号"></Input>
	          </Form-item>
	        </Col>
	        <Col span="1">
	          <Form-item label="开关 - isrun">
	            <i-switch v-model="v.IsRun"></i-switch>
	          </Form-item>
			</Col>
		  </Row>
		</template>

      <Alert class="hr">其他 - other</Alert>
        <Row>
		    <Col :span="12">
		        <Form-item label="外网域名 - Host">
		          <Input v-model="form.Host" placeholder=""></Input>
		        </Form-item>  
	        </Col>
		    <Col :span="12">      
		        <Form-item label="管理密码 - Pwd">
		          <Input type="password" v-model="form.Pwd1" placeholder=""></Input>
		        </Form-item>
		    </Col>
		</Row>
		<Row>
		    <Col :span="4">
		        <Form-item label="提醒重试 - ReTryMsg">
		          <i-switch class="right" v-model="form.ReTryMsg" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="4">
		        <Form-item label="进入提示 - EnterMsg">
		          <i-switch class="right" v-model="form.ShowFuncListEnter" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="4">
		        <Form-item label="自动认证 - NeedWxOAuth2">
		          <i-switch class="right" v-model="form.NeedWxOAuth2" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="4">
		        <Form-item label="调试模式 - Debug">
		          <i-switch class="right" v-model="form.Debug"></i-switch>
		        </Form-item>
			</Col>
		</Row>
           
      <Button type="success" @click="getData"><Icon :size="14" type="ios-reload" /> 刷新</Button>
      <Button type="warning" @click="restartSrv"><Icon :size="14" type="ios-loop" /> 重启服务</Button>
      <Button type="primary" @click="saveData"><Icon :size="14" type="ios-download-outline" /> 保存</Button>
    </Form>

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

	<Modal width="640"
	  title="设置菜单" 
	  style="text-align:center"
	  v-model="modal2">
		<Input type="textarea" :autosize="true" v-model="menu"></Input>
		<div slot="footer" style="color: red">{{menuErr}}
		  <Button @click="deleteMenu" type="error">删除</Button>
		  <Button @click="saveMenu" type="primary">保存</Button>
		</div>
    </Modal>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
	data() {
	  return {
	    form: {},
		modal1: false,
		modal2: false,
		tm1: {},
		menu: '',
		menuApp: '',
		menuErr: '',
		pct: 0,
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
	  token(action) { return this.$store.state.adminUrl + action + "?token=" + sessionStorage.getItem("token") },
	  getMenu(obj) {
	  	this.modal2=true
	  	this.menu=''
	  	this.menuErr=''
	  	this.menuApp=obj.AppName
	  	this.$http.get(this.token("menu")+"&app="+obj.AppName)
	  	.then(r=>{ 
	  	  if (r.data.result){
	  	  	  this.menu=JSON.stringify(r.data.data, null, 4)
	  	  } else {
	  	  	this.menuErr=r.data.errmsg
	  	  } 
	  	})
	  	.catch(e=> { console.log(e) })
	  },
	  saveMenu() {
	  	this.$http.post(this.token("menu")+"&app="+this.menuApp, JSON.parse(this.menu))
	  	.then(r=>{
		  	if (r.data.result){
	  		  this.modal2=false
	          this.$Message.info('保存成功')
	          JSON.stringify(r.data.data, null, 4)
	        }else{
	          this.menuErr=r.data.errmsg
	        }
	     })
	  	.catch(e=> { console.log(e) })
	  },
	  deleteMenu() {
	  	this.$http.delete(this.token("menu")+"&app="+this.menuApp)
	  	.then(r=>{
			if (r.data.result){
	  		  this.modal2=false
	          this.$Message.info('删除成功')
	          JSON.stringify(r.data.data, null, 4)
	        }else{
	          this.menuErr=r.data.errmsg
	        }
	     })
	  	.catch(e=> { console.log(e) })
	  },
	  getData() {
	    this.$http.get(this.token("config"))
		.then(r=> { this.form=r.data.data })
		.catch(e=> { console.log(e) })
	  },
	  saveData() {
	  	  if(this.form.Pwd1) {
	  	  	this.form.Pwd=md5(this.form.Pwd1)
	  	  	this.form.Pwd1=""
	  	  }
	      this.$http.post(this.token("config"), this.form)
	      .then(r => {
	        if (r.data.result){
	          this.$Message.info('配置成功')
	          this.form=r.data.data
	          this.form.Pwd=""
	        }else{
	          this.$Message.info(r.data.errmsg)
	        }
	      })
	      .catch(e=> { this.$Message.info(r.data.errmsg)})
	  },
	  restartSrv() {
	     this.$http.post(this.token("restart"), this.form)
	     .then(r => {
	       if (r.data.result){
		         this.modal1 = true
	         this.$Message.info('操作成功')
			 this.pct=0
	         this.tm1 = setInterval(this.gogogo, 250)
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