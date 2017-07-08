<template>
  <div>
    <el-table
	  v-if="$store.state.userName"
      stripe border
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="cDate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mailTo"
        label="收件人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Subject"
        label="主题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="Pic"
        show-overflow-tooltip
        width="100"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="Files"
        show-overflow-tooltip
        width="100"
        label="文件">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="标记"
        width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">          
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
          this.$http.get(this.$store.state.apiPath+"esmail")
          .then(r=> { this.list=r.data })
          .catch(e => { console.log(e) })
        },       
        handleDelete(i,r) {
          this.$http.delete(this.$store.state.apiPath+"esmail?id="+r.id)
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
      },
      mounted(){
        this.getData()
      }
    }
  </script>