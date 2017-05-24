<template>
  <div>
    <el-table
      stripe border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="mKey"
        label="菜单"
        width="80">
      </el-table-column>
      <el-table-column
        prop="qName"
        label="功能"
        width="100">
      </el-table-column>
      <el-table-column
        prop="qCmts"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="sqlStr"
        label="sql">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="权限"
        width="100">
      </el-table-column>
      <el-table-column
        prop="mediaOnly"
        label="回复模式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="isUpdate"
        label="回写模式"
        width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
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
          this.$http.get(this.$store.state.apiPath +"wxcx")
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