<template>
  <div>
  <ButtonGroup shape="circle">
      <Button type="primary" @click="downloadData" icon="ios-download-outline" :loading="loading">下载到本地</Button>
      <Button type="success" @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
  </ButtonGroup>

  <Tabs v-model="name1" type="card">
    <TabPane label="用户 - user" name="userlist">
      <Page
        @on-page-size-change="handleSizeChange"
        @on-change="handleCurrentChange"
        :current="currentPage"
        :page-size="pagesize"
        show-total show-elevator show-sizer
        :total="list.length">
      </Page>
      <el-table stripe border
        :data="listShow"
        style="width: 100%">
        <el-table-column prop="userid" label="账号" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="mobile" label="手机" width="150"></el-table-column>
        <el-table-column prop="position1" label="职位" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="email" label="Email" width="120"></el-table-column>
        <el-table-column prop="telephone" label="固话" width="120"></el-table-column>
        <el-table-column prop="deptname" label="部门" width="120"></el-table-column>
        <el-table-column prop="isleader" label="上级" width="80"></el-table-column>
        <el-table-column prop="englishname" label="英文名" width="80"></el-table-column>
      </el-table>
    </TabPane>
    <TabPane label="部门 - dept" name="deptlist">
      <el-table stripe border
        :data="deptlist"
        style="width: 100%">
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="name" label="部门名称" width="150"></el-table-column>
        <el-table-column prop="parentId" label="上级" width="150"></el-table-column>
        <el-table-column prop="order1" label="排序" width="100"></el-table-column>       
      </el-table>
    </TabPane>
    <TabPane label="标签 - tag" name="taglist">
      <el-table stripe border
        :data="taglist"
        style="width: 100%">
        <el-table-column prop="tagid" label="ID" width="100"></el-table-column>
        <el-table-column prop="tagname" label="标签" width="120"></el-table-column>      
      </el-table>
    </TabPane>
    <TabPane label="标签用户 - taguser" name="taguserlist">
      <Page
        @on-page-size-change="handleSizeChange2"
        @on-change="handleCurrentChange2"
        :current="currentPage2"
        :page-size="pagesize2"
        show-total show-elevator show-sizer
        :total="taguserlist.length">
      </Page>
      <el-table stripe border
        :data="listShow2"
        style="width: 100%">
        <el-table-column prop="tagid" label="标签ID" width="150"></el-table-column>
        <el-table-column prop="tagname" label="标签" width="150"></el-table-column>      
        <el-table-column prop="name" label="用户名" width="150"></el-table-column>      
        <el-table-column prop="userid" label="用户ID" width="150"></el-table-column>      
      </el-table>
    </TabPane>
  </Tabs>   
  </div>
</template>

  <script>
    export default {
        data () {
            return {
                name1: '',
                list: [],
                // userlist: [],
                deptlist: [],
                taglist: [],
                taguserlist: [],
                currentPage: 1,
                currentPage2: 1,
                pagesize: 20,
                pagesize2: 20,
                loading: false
            };
        },
        computed: {
            listShow () { return this.list.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize); },
            listShow2 () { return this.taguserlist.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize); }
        },
        methods: {
            handleSizeChange (v) { this.pagesize = v; },
            handleSizeChange2 (v) { this.pagesize2 = v; },
            handleCurrentChange (v) { this.currentPage = v; },
            handleCurrentChange2 (v) { this.currentPage2 = v; },
            getData () {
                this.$Loading.start();
                this.loading = true;
                this.$http.get(this.$tokenadmin('localuserlist'))
                    .then(r => {
                        this.list = r.data.data[0];
                        // this.userlist=r.data.data[0]
                        this.deptlist = r.data.data[1];
                        this.taglist = r.data.data[2];
                        this.taguserlist = r.data.data[3];
                        this.$Loading.finish();
                        this.loading = false;
                        // this.tabchg()
                    })
                    .catch(e => { this.$Loading.error(); this.loading = false; });
            },
            downloadData () {
                this.$Loading.start();
                this.loading = true;
                this.$http.get(this.$tokenadmin('downloadUserlist'))
                    .then(r => {
                        this.$Loading.start();
                        this.loading = true;
                        this.getData();
                    })
                    .catch(e => { this.$Loading.error(); this.loading = false; });
            }
        // tabchg() {
        //   this.list=this[this.name1]
        // }
        },
        mounted () {
            this.getData();
        }
    };
  </script>