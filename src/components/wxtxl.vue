<template>
  <div>
    <el-table
      :data="list"
      
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
          this.$http.get("/userlist")
  		  	.then(r=> { this.list=r.data.UserList })
  			  .catch(e => { console.log(e) })
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>