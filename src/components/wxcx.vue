<template>
  <div v-if="$store.state.userName">
    
    <el-button @click="getData">刷新</el-button>
    <el-button @click="dialogFormVisible = true">+新增</el-button>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
    </div>

    <el-dialog title="新增微信查询" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="查询名称" :label-width="formLabelWidth">
          <el-input v-model="form.qname" placeholder="查询关键字，必填" auto-complete="off"></el-input>
        </el-form-item>        
        <el-form-item label="菜单key" :label-width="formLabelWidth">
          <el-input v-model="form.mkey" placeholder="微信自定义菜单key,选填" auto-complete="off"></el-input>
        </el-form-item>         
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-input v-model="form.uid" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></el-input>
        </el-form-item>          
        <el-form-item label="仅媒体" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.mediaonly" placeholder="填1时仅返回图片或文件,选填" auto-complete="off"></el-input>
        </el-form-item>            
        <el-form-item label="表单模式" :label-width="formLabelWidth">
          <el-tooltip class="item" effect="dark" content="=2，新建表单模式，SQL为模版名称。=3，打开表单模式，SQL必须返回两个字段,第二个为rcid" placement="top-start">      
            <el-input type="number" v-model="form.isupdate" placeholder="选填" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>              
        <el-form-item label="保密消息" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></el-input>
        </el-form-item>        
        <el-form-item label="描述(提示)" :label-width="formLabelWidth">
          <el-tooltip class="item" effect="dark" content="进入提示，可使用sql,选填" placement="top-start">      
            <el-input type="textarea" autosize v-model="form.qcmts" placeholder="选填" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>       
        <el-form-item label="sql" :label-width="formLabelWidth">
          <el-tooltip class="item" effect="dark" content="支持多重select/insert/updates，必填" placement="top-start">      
            <el-input type="textarea" autosize v-model="form.sqlstr" placeholder="必填" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      stripe 
      :data="listShow"
      style="width: 100%">   
      <el-table-column
        label="菜单"
        width="100">
        <template scope="scope">
          <el-input v-model="scope.row.mKey"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="功能"
        width="150">
        <template scope="scope">
          <el-input v-model="scope.row.qName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        width="240">
        <template scope="scope">
          <el-input type="textarea" autosize v-model="scope.row.qCmts"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="sql"
        width="360">
        <template scope="scope">
          <el-input type="textarea" autosize v-model="scope.row.sqlStr"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
        width="100">
        <template scope="scope">
          <el-input v-model="scope.row.uid"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="仅媒体"
        width="100">
        <template scope="scope">
          <el-input type="number" v-model="scope.row.mediaOnly"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="表单模式"
        width="100">
        <template scope="scope">
          <el-input type="number" v-model="scope.row.isUpdate"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="保密"
        width="100">
        <template scope="scope">
          <el-input type="number" v-model="scope.row.safe"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="saveData(scope.$index, scope.row)">保存</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteData(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>   

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
    </div>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          list: [],
          pagesize:10,
          currentPage:1,
          dialogFormVisible: false,
          form: {
            uid: '@all',  
            qname: '',
            mkey: '',
            mediaonly: 0,
            isupdate: 0,
            safe: 0,
            qcmts: '',
            sqlstr: ''                 
          },
        formLabelWidth: '100px'
        }
      },
      computed:{
        listShow() {
          return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
      },
      methods: {
        handleSizeChange(val) {
          this.pagesize=val
        },
        handleCurrentChange(val) {
          this.currentPage=val
        },
        getData() {
          this.$http.get(this.$store.state.apiPath +"wxcx"+this.$store.getters.token)
  		  	.then(r => { this.list=r.data })
  			  .catch(e => { console.log(e) })
        },
        deleteData(i,r) {
          this.$http.delete(this.$store.state.apiPath+"wxcx"+this.$store.getters.token+"&id="+r.ID)
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
          this.$http.put(this.$store.state.apiPath+"wxcx"+this.$store.getters.token+"&id="+r.ID, r)
          .then(r => { 
            if (r.data.result){
              this.$message({ message: '保存成功' })             
              this.list=r.data.data[0]
            }else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})
        },
        addData(){          
          this.$http.post(this.$store.state.apiPath+"wxcx"+this.$store.getters.token, this.form)
          .then(r => { 
            if (r.data.result){
              this.$message({ message: '新增成功' })            
              this.dialogFormVisible = false              
              this.getData()
            }else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})
        }
      },
      mounted(){
        this.getData()
      }
    }
  </script>