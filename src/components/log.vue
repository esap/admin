<template>
  <div>
    <Button type="error" @click="clearLog">清除</Button>
    <Button type="primary" @click="getData">刷新</Button>
    <Input v-if="$store.state.userName" type="textarea" autosize v-model="form"></Input>          
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
      token(action) { return this.$store.state.adminUrl + action + "?token=" + sessionStorage.getItem("token") },
      getData() {
        this.$http.get(this.token("log"))
        .then(r=> { this.form=r.data })
        .catch(e => { console.log(e) })
      },
      clearLog() {
        this.$util
        this.$http.delete(this.token("log"))
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