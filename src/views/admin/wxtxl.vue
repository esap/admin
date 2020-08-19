<template>
  <div>
    <Page
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
      :current="currentPage"
      :page-size="pagesize"
      show-total show-elevator show-sizer
      :total="list.length">
      <Button @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
    </Page>

    <el-table stripe border
      :data="listShow"
      style="width: 100%">
      <el-table-column prop="userid" label="账号" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="mobile" label="手机" width="150"></el-table-column>
      <el-table-column prop="position" label="职位" width="100"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80"></el-table-column>
      <el-table-column prop="email" label="Email" width="120"></el-table-column>
      <el-table-column prop="telephone" label="固话" width="120"></el-table-column>
      <el-table-column prop="department" label="部门" width="80"></el-table-column>
      <el-table-column prop="isleader" label="上级" width="80"></el-table-column>
      <el-table-column prop="alias" label="别名" width="80"></el-table-column>
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
        data () {
            return {
                list: [],
                currentPage: 1,
                pagesize: 20,
                loading: false
            };
        },
        computed: {
            listShow () { return this.list.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize); }
        },
        methods: {
            handleSizeChange (v) { this.pagesize = v; },
            handleCurrentChange (v) { this.currentPage = v; },
            getData () {
                this.$Loading.start();
                this.loading = true;
                this.$http.get(this.$tokenadmin('userlist'))
                    .then(r => {
                        this.list = r.data.UserList;
                        this.$Loading.finish();
                        this.loading = false;
                    });
            }
        },
        mounted () {
            this.getData();
        }
    };
  </script>