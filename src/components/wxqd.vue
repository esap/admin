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
        label="签到人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lx"
        label="坐标x">
      </el-table-column>
      <el-table-column
        prop="ly"
        label="坐标y">
      </el-table-column> 
      <el-table-column label="图片">
        <template scope="scope">
          <a :href="urlHand(scope.$index)" target="_blank">点击查看</a>
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
          this.$http.get(this.$store.state.apiPath +"wxqd")
		  	.then(r=> {
	          this.tableData=r.data;
	          // console.log(JSON.stringify(this.kc));
	        })
			.catch(e => {
	          this.kc=[];     
	        })
        },
        urlHand(index){
          return "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+
          this.tableData[index].lx+","+
          this.tableData[index].ly+";&key=ZECBZ-U2N3W-BISRV-OD4TL-ABPH2-L3BBZ&referer=esap"
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>