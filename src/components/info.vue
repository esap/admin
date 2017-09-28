<template>
  <div>
    <Affix>
      <ButtonGroup shape="circle">
        <Button type="success" @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
        <Button type="warning" @click="restartSrv" icon="ios-loop">重启</Button>
        <Button type="primary"s @click="saveData" icon="ios-download-outline">保存</Button>
      </ButtonGroup>
    </Affix>

    <Tabs v-model="name1" type="card">
      <TabPane label="应用 - app" name="name1">
        <el-table stripe :data="$store.state.form.Apps" style="width: 100%" :height="600">
	      <el-table-column prop="AppName" label="应用名" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.AppName"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AppType" label="类型" width="120">	      	
	        <template scope="scope">
	            <Select :disabled="scope.row.AgentId>3000000" v-model="scope.row.AppType" placeholder="企业号">
		            <i-option
		              v-for="item in options1"
		              :key="item.value"
		              :label="item.label"
		              :value="item.value"
		              :disabled="item.disabled">
		            </i-option>
	          </Select>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AppId" label="AppId/corpId" width="150">	      	
	        <template scope="scope">
	        <Input v-model="scope.row.AppId" placeholder="企业号填corpid,公众号填appid,必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="AgentId" label="AgentId" width="100">	      	
	        <template scope="scope">
	          <Tooltip content="通讯录填9999999(7个9)，公众号填0">
	            <Input-number :max="9999999" :min="0" v-model="scope.row.AgentId" placeholder="企业号填agentid,公众号填0"></Input-number>
	          </Tooltip>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Secret" label="Secret" width="200">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Secret" show-overflow-tooltip placeholder="应用或管理组Secret，必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Token" label="Token" width="100">	      	
	        <template scope="scope">
	          <Input :disabled="scope.row.AgentId>3000000" v-model="scope.row.Token" placeholder="回调Token"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="EncodingAesKey" label="EncodingAesKey" width="200">	      	
	        <template scope="scope">
	          <Input :disabled="scope.row.AgentId>3000000" v-model="scope.row.EncodingAesKey" show-overflow-tooltip placeholder="回调EncodingAesKey"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="IsRun" label="开关" width="80">	      	
	        <template scope="scope">
	          <i-switch v-model="scope.row.IsRun"></i-switch>
	        </template>
	      </el-table-column>	      
	      <el-table-column label="操作" width="150">
	        <template scope="scope">
	          <ButtonGroup>
	            <Button :disabled="scope.row.AgentId>3000000" size="small" @click="getMenu(scope.row)">菜单</Button>
	            <Button size="small" type="error" @click="$store.state.form.Apps.splice(scope.$index, 1)">删除</Button>
	          </ButtonGroup>
	        </template>
	      </el-table-column>
	    </el-table>
	    <Button icon="plus-circled" @click.native="$store.state.form.Apps.push({})">新增</Button>
	  </TabPane>

      <TabPane label="数据库 - database" name="name2">     
        <el-table stripe :data="$store.state.form.Dbs" style="width: 100%" :height="600">
	      <el-table-column prop="DbName" label="数据源名" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.DbName"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Driver" label="驱动" width="150">	      	
	        <template scope="scope">
				<Select v-model="scope.row.Driver" placeholder="请选择">
					<i-option
					  v-for="item in options2"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value"
					  :disabled="item.disabled">
					</i-option>
				</Select>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Server" label="服务器" width="150">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Server" placeholder="本机默认实例可填点号,必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Port" label="端口" width="100">	      	
	        <template scope="scope">
	          <Input-number :max="65535" :min="1000" v-model="scope.row.Port" placeholder="例如1433,必填"></Input-number>
	        </template>
	      </el-table-column>
	      <el-table-column prop="User" label="账号" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.User" placeholder="例如Sa，必填"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Pwd" label="密码" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Pwd" type="password" placeholder="例如123"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Db" label="数据库名" width="100">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Db" show-overflow-tooltip placeholder="例如esapp1"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="IsRun" label="开关" width="80">	      	
	        <template scope="scope">
	          <i-switch v-model="scope.row.IsRun"></i-switch>
	        </template>
	      </el-table-column>	      
	      <el-table-column label="操作" width="200">
	        <template scope="scope">
	          <ButtonGroup>
	            <Button size="small" @click="testDb(scope.row)">测试</Button>
	            <Button size="small" type="warning" @click="createDb(scope.row)">建库</Button>
	            <Button size="small" type="warning" @click="createTable(scope.row)">建表</Button>
	            <Button size="small" type="error" @click="$store.state.form.Dbs.splice(scope.$index, 1)">删除</Button>
	          </ButtonGroup>
	        </template>
	      </el-table-column>
	    </el-table>
	    <Button icon="plus-circled" @click.native="$store.state.form.Dbs.push({})">新增</Button>
	  </TabPane>

      <TabPane label="计划任务 - task" name="name3">		
	    <el-table stripe :data="$store.state.form.Tasks" style="width: 100%" :height="600">
	      <el-table-column prop="TaskID" label="任务ID" width="300">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.TaskID"></Input>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Handler" label="类型" width="150">	      	
	        <template scope="scope">
	          <Select v-model="scope.row.Handler" placeholder="请选择">
	            <i-option
	              v-for="item in options3"
	              :key="item.value"
	              :label="item.label"
	              :value="item.value"
	              :disabled="item.disabled">
	            </i-option>
	          </Select>
	        </template>
	      </el-table-column>
	      <el-table-column prop="Express" label="周期" width="250">	      	
	        <template scope="scope">
	          <Input v-model="scope.row.Express" placeholder="例如每分钟：* */1 * * * *"></Input>
	        </template>
	      </el-table-column>	      
	      <el-table-column prop="IsRun" label="开关" width="80">	      	
	        <template scope="scope">
	          <i-switch v-model="scope.row.IsRun"></i-switch>
	        </template>
	      </el-table-column>	      
	      <el-table-column label="操作" width="150">
	        <template scope="scope">
	          <Button size="small" type="error" @click="$store.state.form.Tasks.splice(scope.$index, 1)">删除</Button>
	        </template>
	      </el-table-column>
	    </el-table>
	    <Button icon="plus-circled" @click.native="$store.state.form.Tasks.push({})">新增</Button>
	  </TabPane>

	  <TabPane label="其他 - other" name="name4">
      <Form :model="$store.state.form" :label-width="60">
        <Row>
		    <Col :span="12">
		        <Form-item label="外网域名 - Host">
		          <Input v-model="$store.state.form.Host" placeholder=""></Input>
		        </Form-item>  
	        </Col>
		    <Col :span="6">      
		        <Form-item label="管理密码 - Pwd">
		          <Input type="password" v-model="Pwd1" placeholder=""></Input>
		        </Form-item>
		    </Col>
		    <Col :span="6"> 
			  <Tooltip content="同步计划的队列间隔，最低100毫秒">
		        <Form-item label="同步间隔(毫秒)">
		          <Input-number :min="100" v-model="$store.state.form.SyncDelay"></Input-number>
		        </Form-item>
			  </Tooltip>
		    </Col>
		</Row>
        <Row>
		    <Col :span="2">
		    	<Button type="warning"><a href="https://ai.baidu.com" target="_blank">百度AI官网</a></Button>
		    </Col>
		    <Col :span="6">
		      <Tooltip content="百度AI开放平台应用id，可前往官网免费申请">    
		        <Form-item label="百度AI - AppID">
		          <Input-number v-model="$store.state.form.AiId" placeholder=""></Input-number>
		        </Form-item>
		      </Tooltip>
	        </Col>
		    <Col :span="6">      
		        <Form-item label="百度AI - ApiKey">
		          <Input v-model="$store.state.form.AiKey" placeholder=""></Input>
		        </Form-item>
		    </Col>
		    <Col :span="6"> 
		        <Form-item label="百度AI- SecretKey">
		          <Input v-model="$store.state.form.AiSec" placeholder=""></Input>
		        </Form-item>
		    </Col>
		</Row>
		<Row>
		    <Col :span="3">
		        <Form-item label="提醒重试 - ReTryMsg">
		          <i-switch v-model="$store.state.form.ReTryMsg" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="3">
		        <Form-item label="进入提示 - EnterMsg">
		          <i-switch v-model="$store.state.form.ShowFuncListEnter" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="3">
		        <Form-item label="自动认证 - NeedWxOAuth2">
		          <i-switch v-model="$store.state.form.NeedWxOAuth2" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="3">
		        <Form-item label="自动升级 - AutoUpdate">
		          <i-switch v-model="$store.state.form.AutoUpdate" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="3">
		        <Form-item label="使用ES库 - IsEs">
		          <i-switch v-model="$store.state.form.IsEs" placeholder=""></i-switch>
		        </Form-item>
			</Col>
		    <Col :span="3">
		        <Form-item label="调试模式 - Debug">
		          <i-switch v-model="$store.state.form.Debug"></i-switch>
		        </Form-item>
			</Col>
		</Row>
      </Form>
      </TabPane>
    </Tabs>

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
		<div slot="footer" style="color: red">		  
		  <Alert v-show="menuErr" style="text-align:left" type="error">{{menuErr}}</Alert>
		  <Button type="success"><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013" target="_blank">公众号帮助</a></Button>
		  <Button type="success"><a href="https://work.weixin.qq.com/api/doc#10786" target="_blank">企业号帮助</a></Button>
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
	    name1: '',
		modal1: false,
		modal2: false,
		loading: false,
		tm1: {},
		Pwd1: '',
		menu: '',
		menuApp: '',
		menuErr: '',
		pct: 0,
	    options1:  [{
	      value: '',
	      label: '企业号'
	    }, {
	      value: 'pub',
	      label: '公众号'
	    }, {
	      value: 'ding',
	      label: '钉钉',
	      disabled: true
	    }, {
	      value: 'wlw',
	      label: '物联网',
	      disabled: true
	    }, {
	      value: 'zfb',
	      label: '支付宝',
	      disabled: true
	    }],
	    options2:  [{
	      value: 'mssql',
	      label: 'Sql2005+'
	    }, {
	      value: 'sql2000',
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
	      value: 'QueryTask',
	      label: '查询任务'
	    }, {
	      value: 'QueryNewsTask',
	      label: '新闻任务' 
	    }, {
	      value: 'ExecTask',
	      label: '执行任务' 
	    }, {
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
	  getMenu(obj) {
	  	this.modal2=true
	  	this.menu=''
	  	this.menuErr=''
	  	this.menuApp=obj.AppName
	  	this.$http.get(this.$tokenadmin("menu")+"&app="+obj.AppName)
	  	.then(r=>{ 
	  	  if (r.data.result){
	  	  	if (r.data.data.menu) {
	  	  		r.data.data=r.data.data.menu
	  	  	}
	  	  	this.menu=JSON.stringify(r.data.data, null, 4)	  	  	
	  	  } else {
	  	  	this.menuErr='获取'+r.data.errmsg
	  	  } 
	  	})
	  	.catch(e=> { console.log(e) })
	  },
	  testDb(obj) {	  	
	  	this.$http.post(this.$tokenadmin("testdb"), obj)
	  	.then(r=>{ 
	  	  if (r.data.result){
	  	  	  this.$Message.info('测试成功')
	  	  } else {
	  	  	this.$Message.error('测试失败:' + r.data.errmsg)
	  	  } 
	  	})
	  	.catch(e=> { console.log(e) })
	  },
      createDb (obj) {
        this.$Modal.confirm({
            title: '创建新数据库',
            content: '<p>点击确定将在esap主库实例上创建一个新的空数据库('+obj.Db+')，如已存在则跳过</p>',
            loading: true,
            onOk: () => {
            	this.$http.post(this.$tokenadmin("createdb"), obj)
			  	.then(r=>{
			  	  if (r.data.result){
			  	  	  this.$Message.info('执行成功')
			  	  	  this.$Modal.remove()
			  	  } else {
			  	  	this.$Message.error('执行失败:' + r.data.errmsg)
			  	  } 
			  	})
			  	.catch(e=> { this.$Message.error('执行失败:' + e) })
            }
        });
      },
      createTable (obj) {
        this.$Modal.confirm({
            title: '创建ESAP系统数据表',
            content: '<p>点击确定将创建“esap_xx”系列数据表，请谨慎操作，执行后会删除已有数据表</p>',
            loading: true,
            onOk: () => {
            	this.$http.post(this.$tokenadmin("createtable"), obj)
			  	.then(r=>{
			  	  if (r.data.result){
			  	  	  this.$Message.info('执行成功')
			  	  	  this.$Modal.remove()
			  	  } else {
			  	  	this.$Message.error('执行失败:' + r.data.errmsg)
			  	  } 
			  	})
			  	.catch(e=> { this.$Message.error('执行失败:' + e) })
            }
        });
      },	  
	  saveMenu() {
	  	this.$http.post(this.$tokenadmin("menu")+"&app="+this.menuApp, JSON.parse(this.menu))
	  	.then(r=>{
		  	if (r.data.result){
	  		  this.modal2=false
	          this.$Message.info('保存成功')
	          JSON.stringify(r.data.data, null, 4)
	        }else{
	          this.menuErr='保存'+r.data.errmsg
	        }
	     })
	  	.catch(e=> { console.log(e) })
	  },
	  deleteMenu() {
	  	this.$http.delete(this.$tokenadmin("menu")+"&app="+this.menuApp)
	  	.then(r=>{
			if (r.data.result){
	  		  this.modal2=false
	          this.$Message.info('删除成功')
	          JSON.stringify(r.data.data, null, 4)
	        }else{
	          this.menuErr='删除'+r.data.errmsg
	        }
	     })
	  	.catch(e=> { console.log(e) })
	  },	
	  getData() {
	  		this.loading=true
			this.$http.get(this.$tokenadmin("config"))
			.then(r=> { this.$store.state.form=r.data.data; this.loading=false })
			.catch(e=> { console.log(e); this.loading=false })
	  },
	  saveData() {
	  	  if(this.Pwd1) {
	  	  	this.$store.state.form.Pwd=md5(this.Pwd1)
	  	  }
	      this.$http.post(this.$tokenadmin("config"), this.$store.state.form)
	      .then(r => {
	        if (r.data.result){
	          this.$Message.info('配置成功')
	          this.$store.state.form=r.data.data
	          this.$store.state.form.Pwd=""
	        }else{
	          this.$Message.info(r.data.errmsg)
	        }
	      })
	      .catch(e=> { this.$Message.info(r.data.errmsg)})
	  },
	  restartSrv() {
	     this.$http.post(this.$tokenadmin("restart"), this.$store.state.form)
	     .then(r => {
	       if (r.data.result){
		     this.modal1 = true
	         this.$Message.info('操作成功')
			 this.pct = 0
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
	    this.$store.state.form.Agents.x1='xx'
	    console.log(this.$store.state.form.Agents)
	  }
	}	
}
</script>

<style scoped>
.hr {
  box-shadow: 3px 3px 3px #999;
}
a {
	color: #fff;
}
</style>