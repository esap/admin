<template>
  <div v-if="$store.state.userName">
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
      stripe
      :data="listShow"
      style="width: 100%">
      <el-table-column
        prop="cDate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="上传人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pDesc"
        label="描述">
      </el-table-column> 
      <el-table-column label="图片">
        <template scope="scope">
          <img style="width:100px" :src="picHand(scope.$index)" />
        </template>
      </el-table-column> 
      <el-table-column label="操作" width="100">
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
          pagesize:10,
          currentPage:1,
        }
      },
      computed:{
        listShow() { return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize) }
      },
      methods: {
        token(action) { return this.$store.state.adminUrl + action + "?token=" + sessionStorage.getItem("token") },
        handleSizeChange(v) { this.pagesize=v },
        handleCurrentChange(v) { this.currentPage=v },
        picHand(index) { return this.$store.state.appUrl+"p/"+this.list[index].pic },
        getData() {
          this.$http.get(this.token("wxtk"))
          .then(r=> { this.list=r.data.data[0] })
          .catch(e => { console.log(e) })
        },
        deleteData(i,r) {
          this.$http.delete(this.token("wxtk")+"&id="+r.id)
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