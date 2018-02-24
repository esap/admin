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

    <el-table
      stripe
      :data="listShow"
      style="width: 100%">
      <el-table-column prop="cDate" label="日期" width="180"></el-table-column>
      <el-table-column prop="app" label="应用" width="180"></el-table-column>
      <el-table-column prop="usr" label="用户" width="180"></el-table-column>
      <el-table-column prop="log" label="描述"></el-table-column>    
      <el-table-column prop="model" label="模块"></el-table-column>    
      <el-table-column prop="lvl" label="级别"></el-table-column>    
      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">   
          <el-button
            size="small"
            type="danger"
            @click="deleteData(scope.$index, scope.row)">删除</el-button>
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
          pagesize:20,
          currentPage:1,
          loading: false,
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
          this.$http.get(this.$tokenadmin("esaplog"))
          .then(r=> { 
            if (r.data.result)this.list=r.data.data[0]
            this.$Loading.finish()
            this.loading = false
          })
          .catch(e => { this.$Loading.error(); this.loading = false })
        },
        deleteData(i,r) {
          this.$http.delete(this.$tokenadmin("esaplog")+"&id="+r.id)
          .then(r => { 
            if (r.data.result){
              this.$message({ message: '删除成功' })
              this.list=r.data.data[0]
            } else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})      
        },  
      },
      mounted(){
        this.getData()
      }
    }
  </script>