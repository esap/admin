<template>
  <div>
    <el-table
      :data="list"
      v-if="$store.state.userName"
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="账号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          list: []
        }
      },
      methods: {
        getData() {
          this.$http.get(this.$store.state.adminUrl +"userlist?token="+sessionStorage.getItem("token"))
  		  	.then(r=> { this.list=r.data.UserList })
  			  .catch(e => { console.log(e) })
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>