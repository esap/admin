<template>
  <div>
    <el-table
      stripe border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cDate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mailTo"
        label="收件人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Subject"
        label="主题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="内容">
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
          tableData: []
        }
      },
      methods: {
        getData() {
          this.$http.get(this.$store.state.apiPath +"esmail")
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