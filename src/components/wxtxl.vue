<template>
  <div>
    <el-table
      stripe 
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="UserId"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="WeixinId"
        label="微信号">
      </el-table-column>
      <el-table-column
        prop="Mobiele"
        label="手机号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Email"
        label="邮箱"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Gender"
        label="性别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Position"
        label="职位"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Department"
        label="部门"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: []
        }
      },
      methods: {
        getData() {
          this.$http.get(this.$store.state.apiPath +"userlist")
		  	.then(r=> {
	          this.tableData=r.data.UserList;
	          // console.log(JSON.stringify(this.kc));
	        })
			.catch(e => {
	          this.kc=[];     
	        })
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>