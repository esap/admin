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
          <Input v-model="form.name" placeholder="查询关键字，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="菜单key">
          <Input v-model="form.mkey" placeholder="微信自定义菜单key,选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="用户权限">
          <Input v-model="form.aclUser" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="部门权限">
          <Input v-model="form.aclDept" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="标签权限">
          <Input v-model="form.aclTag" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></Input>
        </Form-item>
        <Row>
          <Col :span="8">
            <Form-item label="模式">
              <Tooltip content="填1时仅返回图片或文件,选填" placement="top-start"> 
                <Input-number v-model="form.mode"></Input-number>
              </Tooltip>
            </Form-item>
          </Col>      
          <Col :span="8">
          <Form-item label="保密消息">
            <Input-number v-model="form.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></Input-number>
          </Form-item>
          </Col> 
        </Row>
        <Form-item label="进入提示">
          <el-tooltip class="item" effect="dark" content="可使用sql,选填" placement="top-start">      
            <Input type="textarea" autosize v-model="form.entermsg" placeholder="选填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Form-item label="模板">
          <el-tooltip class="item" effect="dark" content="支持多重select查询，必填" placement="top-start">      
            <Input type="textarea" autosize v-model="form.tmpl" placeholder="必填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Form-item label="应用">
            <Input v-model="form.app" placeholder="数据源配置，选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="数据源">
            <Input v-model="form.db" placeholder="数据源配置，选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="原文链接">
            <Input v-model="form.url" placeholder="有值时返回文章方式,此处为文章链接，选填" auto-complete="off"></Input>
        </Form-item> 
        <Form-item label="图片链接">
            <Input v-model="form.pic" placeholder="文章封面图片链接，选填" auto-complete="off"></Input>
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
          <Input v-model="scope.row.name"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="进入提醒"
        width="240">
        <template scope="scope">
          <Input type="textarea" autosize v-model="scope.row.entermsg"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="模板"
        width="360">
        <template scope="scope">
          <Input type="textarea" autosize v-model="scope.row.tmpl"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="用户权限"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.aclUser"></Input>
        </template>
      </el-table-column>
      <el-table-column
      <el-table-column
        label="部门权限"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.aclDept"></Input>
        </template>
      </el-table-column>
      <el-table-column
      <el-table-column
        label="标签权限"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.aclTag"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="模式"
        width="100">
        <template scope="scope">
          <Tooltip content="填1时仅返回图片或文件,选填" placement="top-start"> 
            <Input-number :max="9999999" :min="0" v-model="scope.row.mode"></Input-number>
          </Tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="专用查询"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.app"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="数据源"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.db"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="原文链接"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.url"></Input>
        </template>
      </el-table-column>
      <el-table-column
        label="原文封面"
        width="100">
        <template scope="scope">
          <Input v-model="scope.row.pic"></Input>
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
            mkey: '',
            name: '',
            entermsg: '',
            tmpl: '',
            mode: 0,
            aclUser: '@all',  
            aclDept: '',  
            aclTag: '',  
            app: '',
            db: '',
            url: '',
            pic: '',
            safe: 0
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