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
      <Select v-model="db" style="width:100px">
        <Option v-for="item in $store.getters.dbs" :value="item.DbName" :key="item.DbName">{{ item.DbName }}</Option>
      </Select>
    </Page>

    <el-table
      stripe border
      :data="listShow"
      style="width: 100%">
      <el-table-column show-overflow-tooltip prop="cDate" label="日期" width="180"></el-table-column>
      <el-table-column show-overflow-tooltip prop="mailTo" label="收件人" width="150"></el-table-column>
      <el-table-column show-overflow-tooltip prop="Subject" label="主题" width="150"></el-table-column>
      <el-table-column show-overflow-tooltip prop="Content" width="200" label="内容"></el-table-column>
      <el-table-column show-overflow-tooltip prop="Pic" width="100" label="图片"></el-table-column>
      <el-table-column show-overflow-tooltip prop="Files" width="100" label="文件"></el-table-column>
      <el-table-column prop="flag" label="标记" width="80"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">  
          <Button size="small" @click="saveData(scope.$index, scope.row)">重发</Button>        
          <Button size="small" type="error" @click="deleteData(scope.$index, scope.row)">删除</Button>
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
          pagesize: 20,
          loading: false,
          currentPage: 1
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
          this.loading = false
          this.$http.get(this.$tokenadmin("email")+"&db="+this.db)
          .then(r=> { 
            if (r.data.result)this.list=r.data.data[0]
            this.$Loading.finish()
            this.loading = false
          })
          .catch(e => { this.$Loading.error(); this.loading = false })
        },          
        deleteData(i,r) {
          this.$http.delete(this.$tokenadmin("email")+"&id="+r.id+"&db="+this.db)
          .then(r => { 
            if (r.data.result){
              this.$message({ message: '删除成功' })
              this.list=r.data.data[0]
            }else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})
        }, 
        saveData(i,r) {
        r.flag=0
        this.$http.put(this.$tokenadmin("email")+"&id="+r.id, r+"&db="+this.db)
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
      },
      mounted(){
        this.getData()
      }
    }
  </script>