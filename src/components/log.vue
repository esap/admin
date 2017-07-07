<template>
  <div>
      <el-button type="danger" @click="clearLog">清除</el-button>
      <el-button type="primary" @click="getData">刷新</el-button>
      <div class="hr">日志 - log</div>
      <el-input type="textarea" autosize v-model="form" :disabled="true"></el-input>          
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: ""
      }
    },
    methods: {
      getData() {
        this.$http.get("/log")
        .then(r=> { this.form=r.data })
        .catch(e => { console.log(e) })
      },
      clearLog() {
        this.$http.delete("/log")
		  	.then(r=> { this.form=r.data })
			  .catch(e => { console.log(e) })
      },
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
.right {
  float: right;
}
.hr {
  padding: 12px 0;
  background-color: #eee;
  box-shadow: 3px 3px 3px #999;
}
</style>