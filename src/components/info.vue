<template>
  <div class="wrap">
	<el-dialog title="重启ESAP中..." 
	  :visible.sync="dialogFormVisible"
	  :close-on-click-modal="false"
	  :close-on-press-escape="false"
	  :show-close="false">
      <el-progress type="circle" :percentage="pct"></el-progress>
    </el-dialog>

    <el-form v-if="$store.state.userName" :model="form">
      <div class="hr">企业号/公众号 - wechat</div>

        <template v-for="v in form.Apps">          
          <el-form-item label="企业号ID - corpid" >
            <el-input v-model="v.AppId" placeholder="必填"></el-input>
          </el-form-item>
          <el-form-item label="应用密钥 - Secret" >
            <el-input v-model="v.Secret" placeholder="app首页应用Secret或管理组Secret，必填"></el-input>
          </el-form-item>
          <el-form-item label="关闭状态 - Disabled" >
            <el-input v-model="v.Disabled" placeholder="通讯录同步Secret或管理组Secret，必填"></el-input>
          </el-form-item>
          <el-form-item label="回调令牌 - Token" >
            <el-input v-model="v.Token" placeholder="统一回调Token，必填"></el-input>
          </el-form-item>           
          <el-form-item label="回调密钥 - EncodingAesKey" >
            <el-input v-model="v.EncodingAesKey" placeholder="统一回调EncodingAesKey，必填"></el-input>
          </el-form-item>
        </template>

      <div class="hr">多应用 - Agents</div>        
        <el-form-item v-for="v,k in form.Agents" label="Agentid / Secret" >
          <el-input type="number" v-model="k" placeholder="应用agentid"></el-input>
          <el-input v-model="v" placeholder="应用secret"></el-input>
        </el-form-item>

      <div class="hr">数据库 - database</div>
        <el-form-item label="驱动 - DbDriver" >
          <el-select class="right" v-model="form.DbDriver" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务器 - Server" >
          <el-col :span="6">
            <el-input v-model="form.Server" placeholder="本机可填.号"></el-input>
          </el-col>
          <el-col class="line" :span="6">端口 - DbPort</el-col>
          <el-col :span="3">
          <el-input type="number" v-model="form.DbPort" placeholder=""></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账号 - UserId" >
          <el-input v-model="form.UserId" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码 - Pwd" >
          <el-input v-model="form.Pwd" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="默认数据库名称 - DbName" >
          <el-input v-model="form.DbName" placeholder=""></el-input>
        </el-form-item>

      <div class="hr">其他 - other</div>
        <el-form-item label="外网域名(：端口) - Host" >
          <el-input v-model="form.Host" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="ESWEB外网地址 - Esweb" >
          <el-input v-model="form.Esweb" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="微信提醒标题 - WxtxTitle" >
          <el-input v-model="form.WxtxTitle" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="微信签到标题 - WxqdTitle" >
          <el-input v-model="form.WxqdTitle" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="微信提醒重试 - ReTryMsg" >
          <el-switch class="right" v-model="form.ReTryMsg" placeholder=""></el-switch>
        </el-form-item>
        <el-form-item label="微信查询功能清单 - ShowFuncList" >
          <el-switch class="right" v-model="form.ShowFuncList" placeholder=""></el-switch>
        </el-form-item>
        <el-form-item label="微信查询进入提示 - ShowFuncListEnter" >
          <el-switch class="right" v-model="form.ShowFuncListEnter" placeholder=""></el-switch>
        </el-form-item>
        <el-form-item label="APP身份自动认证 - NeedWxOAuth2" >
          <el-switch class="right" v-model="form.NeedWxOAuth2" placeholder=""></el-switch>
        </el-form-item>
        <el-form-item label="调试模式 - Debug" >
          <el-switch class="right" v-model="form.Debug"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="restartSrv">重启服务</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
           
    </el-form>
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