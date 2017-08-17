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
      <Button @click="dialogFormVisible = true"><Icon :size="14" type="plus-circled" />新增</Button>
    </Page>

    <Modal title="新增微信查询" v-model="dialogFormVisible">
      <Form :model="form" :label-width="80">
        <Form-item label="查询名称">
          <Input v-model="form.qname" placeholder="查询关键字，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="菜单key">
          <Input v-model="form.mkey" placeholder="微信自定义菜单key,选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="权限">
          <Input v-model="form.uid" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></Input>
        </Form-item>
        <Row>
          <Col :span="8">
            <Form-item label="仅媒体">
              <Input-number v-model="form.mediaonly" placeholder="填1时仅返回图片或文件,选填" auto-complete="off"></Input-number>
            </Form-item>
          </Col>
          <Col :span="8">
          <Form-item label="表单模式">
            <el-tooltip class="item" effect="dark" content="=2，新建表单模式，SQL为模版名称。=3，打开表单模式，SQL必须返回两个字段,第二个为rcid" placement="top-start">
              <Input-number v-model="form.isupdate" placeholder="选填" auto-complete="off"></Input-number>
            </el-tooltip>
          </Form-item>
          </Col>
          <Col :span="8">
          <Form-item label="保密消息">
            <Input-number v-model="form.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></Input-number>
          </Form-item>
          </Col> 
        </Row>
        <Form-item label="描述(提示)">
          <el-tooltip class="item" effect="dark" content="进入提示，可使用sql,选填" placement="top-start">      
            <Input type="textarea" autosize v-model="form.qcmts" placeholder="选填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Form-item label="sql">
          <el-tooltip class="item" effect="dark" content="支持多重select查询，必填" placement="top-start">      
            <Input type="textarea" autosize v-model="form.sqlstr" placeholder="必填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Form-item label="数据源">
            <Input v-model="form.db" placeholder="数据源配置，选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="原文链接">
            <Input v-model="form.url" placeholder="有值时返回文章方式,此处为文章链接，选填" auto-complete="off"></Input>
        </Form-item> 
        <Form-item label="图片链接">
            <Input v-model="form.url" placeholder="文章封面图片链接，选填" auto-complete="off"></Input>
        </Form-item>      
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="dialogFormVisible = false">取 消</Button>
        <Button type="primary" @click="addData">确 定</Button>
      </div>
    </Modal>

    <el-table
      stripe 
      :data="listShow"
      style="width: 100%">   
      <el-table-column
        label="菜单"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.mKey"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="功能"
        width="150">
        <template scope="scope">
          <Input v-model="scope.row.qName"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        width="240">
        <template scope="scope">
          <Input type="textarea" autosize v-model="scope.row.qCmts"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="sql"
        width="360">
        <template scope="scope">
          <Input type="textarea" autosize v-model="scope.row.sqlStr"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="权限"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.uid"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="仅媒体"
        width="100">
        <template scope="scope">
          <Input-number v-model="scope.row.mediaOnly"></Input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="表单模式"
        width="100">
        <template scope="scope">
          <Input-number v-model="scope.row.isUpdate"></Input-number>
        </template>
      </el-table-column>
      <el-table-column
        label="保密"
        width="100">
        <template scope="scope">
          <Input-number v-model="scope.row.safe"></Input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <Button size="small" @click="saveData(scope.$index, scope.row)">保存</Button>
          <Button size="small" type="error" @click="deleteData(scope.$index, scope.row)">删除</Button>
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
          }
        }
      },
      computed:{
        listShow() {
          return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
      },
      methods: {
        token(action) { return this.$store.state.adminUrl + action + "?token=" + sessionStorage.getItem("token") },
        handleSizeChange(val) { this.pagesize=val },
        handleCurrentChange(val) { this.currentPage=val },
        getData() {
          this.$http.get(this.token("wxcx"))
  		  	.then(r => { this.list=r.data.data[0] })
  			  .catch(e => { console.log(e) })
        },
        deleteData(i,r) {
          this.$http.delete(this.token("wxcx")+"&id="+r.id)
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
          this.$http.put(this.token("wxcx")+"&id="+r.id, r)
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
          this.$http.post(this.token("wxcx"), this.form)
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