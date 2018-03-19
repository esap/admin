<template>
  <div>
    <Page
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
      :current="currentPage"
      :page-size="pagesize"
      show-total show-elevator show-sizer
      :total="list.length">
      <ButtonGroup>
        <Button @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
        <Button @click="dialogFormVisible = true" icon="plus-circled">新增</Button>
      </ButtonGroup>
      <Select v-model="db" style="width:100px">
        <Option v-for="item in $store.getters.dbs" :value="item.DbName" :key="item.DbName">{{ item.DbName }}</Option>
      </Select>
    </Page>

    <Modal title="新增短信提醒" v-model="dialogFormVisible">
      <Form :model="form" :label-width="80">
        <Form-item label="姓名">
          <Input v-model="form.name" placeholder="被通知人姓名，选填"></Input>
        </Form-item>
        <Form-item label="电话">
          <Input v-model="form.tel" placeholder="电话号码，必填"></Input>         
        </Form-item>
        <Form-item label="内容">
          <Input v-model="form.content" placeholder="短信内容，必填"></Input>
        </Form-item>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="dialogFormVisible = false">取 消</Button>
        <Button type="primary" @click="addData">确 定</Button>
      </div>
    </Modal>

    <el-table
      stripe
      :data="listShow"
      style="width: 100%">
      <el-table-column sortable prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column sortable prop="tel" label="电话" width="150"></el-table-column>
      <el-table-column prop="content" show-overflow-tooltip label="内容" width="200"></el-table-column>
      <el-table-column sortable prop="sid" show-overflow-tooltip label="sid" width="100"></el-table-column>
      <el-table-column sortable prop="result" show-overflow-tooltip label="结果" width="120"></el-table-column>
      <el-table-column prop="fee" label="计费" width="80"></el-table-column>
      <el-table-column prop="id" label="id" width="80"></el-table-column>      
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <ButtonGroup>
          <Button size="small" @click="saveData(scope.$index, scope.row)">重发</Button>
          <Button size="small" type="error" @click="deleteData(scope.$index, scope.row)">删除</Button>
          </ButtonGroup>
        </template>
      </el-table-column>
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
        db: 'esap',
        currentPage:1,
        pagesize: 20,
        loading: false,
        dialogFormVisible: false,
        form: {},
        form2: [{}],
      }
    },
    computed:{
      listShow() { return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize) }
    },
    methods: {
      handleSizeChange(v) { this.pagesize=v },
      handleCurrentChange(v) { this.currentPage=v },
      getData() {
        this.$Loading.start()
        this.loading = true
        this.$http.get(this.$tokenadmin("sms")+"&db="+this.db)
		  	.then(r=> { 
            if (r.data.result)this.list=r.data.data[0]
            this.loading = false
            this.$Loading.finish();
          })
          .catch(e => { this.$Loading.error(); this.loading = false })
      },
      deleteData(i,r) {
        this.$http.delete(this.$tokenadmin("sms")+"&db="+this.db+"&id="+r.id)
        .then(r => { 
          if (r.data.result){
            this.$Message.info('删除成功')
            this.list=r.data.data[0]
          }else{
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})
      },
      saveData(i,r) {
        r.flag=0
        this.$http.put(this.$tokenadmin("sms")+"&db="+this.db+"&id="+r.id, r)
        .then(r => { 
          if (r.data.result){
            this.$Message.info('保存成功')
            this.list=r.data.data[0]
          } else{
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})          
      },   
      addData() {   
        this.$http.post(this.$tokenadmin("sms"), this.form)
        .then(r => { 
          if (r.data.result) {
            this.$Message.info('新增成功')
            this.dialogFormVisible = false              
            this.getData()
          } else {
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>