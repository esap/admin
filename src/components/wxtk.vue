<template>
  <div v-if="$store.state.userName">
    <el-button @click="getData">刷新</el-button>
    <el-table
      stripe
      :data="list"
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
          this.$http.get(this.$store.state.apiPath+"wxtk")
  		  	.then(r=> { this.list=r.data })
          .catch(e => { console.log(e) })
        },
        picHand(index){
          return this.$store.state.appUrl+"p/"+this.list[index].pic
        },
        handleDelete(i,r) {
          this.$http.delete(this.$store.state.apiPath+"wxtk?id="+r.id)
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