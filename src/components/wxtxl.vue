<template>
  <div>
    <Page
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
      :current="currentPage"
      :page-size="pagesize"
      show-total show-elevator show-sizer
      :total="list.length">
	  <Button @click="getData"><Icon :size="14" type="ios-reload" />刷新</Button>
    </Page>

    <el-table
      :data="list"
      v-if="$store.state.userName"
      style="width: 100%">
      <el-table-column prop="userid" label="账号" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
      <el-table-column prop="position" label="职位" width="180"></el-table-column>
      <el-table-column prop="gender" label="性别" width="180"></el-table-column>
      <el-table-column prop="email" label="Email" width="180"></el-table-column>
    </el-table>

    <Page
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
      :current="currentPage"
      :page-size="pagesize"
      show-total show-elevator show-sizer
      :total="list.length">
    </Page>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          list: [],
		  currentPage:1,
          pagesize:10,
        }
      },
      methods: {
		handleSizeChange(v) { this.pagesize=v },
      	handleCurrentChange(v) { this.currentPage=v },
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