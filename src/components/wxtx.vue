<template>
  <div>
    <el-table
      stripe border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cdate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="touser"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="标记"
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
          this.$http.get(this.$store.state.apiPath +"wxtx")
		  	.then(r=> {
	          this.tableData=r.data;
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