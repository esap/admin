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
          <img :src="picHand(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: [{id:0,name:"",pDesc:"",pic:"",usr:""}]
        }
      },
      methods: {
        getData() {
          this.$http.get(this.$store.state.apiPath +"wxtk")
		  	.then(r=> {
	          this.tableData=r.data;
	          // console.log(JSON.stringify(this.kc));
	        })
			.catch(e => {
	          this.kc=[];     
	        })
        },
        picHand(index){
          return "/pp/"+this.tableData[index].pic
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>