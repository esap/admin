<template>
  <div>
    <Page
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"
      :current="currentPage"
      :page-size="pagesize"
      show-total show-elevator show-sizer
      :total="list.length">
      <ButtonGroup>
        <Button @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
        <Button @click="dialogFormVisible = true" icon="plus-circled">新增</Button>
      </ButtonGroup>
    </Page>

    <Modal title="新增微信查询" v-model="dialogFormVisible">
      <Form :model="form" :label-width="80">
        <Form-item label="查询名称">
          <Input v-model="form.name" placeholder="查询关键字，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="菜单key">
          <Input v-model="form.mKey" placeholder="微信自定义菜单key,选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="用户权限">
          <Input v-model="form.aclUser" placeholder="@all表示全体，可用逗号分隔多个用户或用户ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="部门权限">
          <Input v-model="form.aclDept" placeholder="可用逗号分隔多个部门或部门ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="标签权限">
          <Input v-model="form.aclTag" placeholder="可用逗号分隔多个标签或标签ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="应用权限">
          <Input v-model="form.aclApp" placeholder="可用逗号分隔多个应用名称" auto-complete="off"></Input>
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
            <Form-item label="下一步">
              <Tooltip content="填写后，任意输入都必然执行该查询,选填" placement="top-start"> 
                <Input v-model="form.nextfn"></Input>
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
          <el-tooltip class="item" effect="dark" content="支持多重select/update/insert/delete，必填" placement="top-start">      
            <Input type="textarea" autosize v-model="form.tmpl" placeholder="必填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Row>
          <Col :span="8">
          <Form-item label="专属应用">
            <Select v-model="form.app" placeholder="可选" style="width:100px">
              <Option v-for="item in $store.getters.apps" :value="item.AppName" :key="item.AppName">{{ item.AppName }}</Option>
            </Select>
          </Form-item>
          </Col>      
          <Col :span="8">
          <Form-item label="数据源">
            <Select v-model="form.db" placeholder="可选" style="width:100px">
              <Option v-for="item in $store.getters.dbs" :value="item.DbName" :key="item.DbName">{{ item.DbName }}</Option>
            </Select>
          </Form-item>
          </Col>      
        </Row>
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

    <Modal title="修改微信查询" v-model="dialogFormVisible2">
      <Form :model="formModify" :label-width="80">
        <Form-item label="查询名称">
          <Input v-model="formModify.name" placeholder="查询关键字，必填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="菜单key">
          <Input v-model="formModify.mKey" placeholder="微信自定义菜单key,选填" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="用户权限">
          <Input v-model="formModify.aclUser" placeholder="@all表示全体，可用逗号分隔多个用户或用户ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="部门权限">
          <Input v-model="formModify.aclDept" placeholder="可用逗号分隔多个部门或部门ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="标签权限">
          <Input v-model="formModify.aclTag" placeholder="可用逗号分隔多个标签或标签ID" auto-complete="off"></Input>
        </Form-item>
        <Form-item label="应用权限">
          <Input v-model="formModify.aclApp" placeholder="可用逗号分隔多个应用名称" auto-complete="off"></Input>
        </Form-item>
        <Row>
          <Col :span="8">
            <Form-item label="模式">
              <Tooltip content="填1时仅返回图片或文件,选填" placement="top-start"> 
                <Input-number v-model="formModify.mode"></Input-number>
              </Tooltip>
            </Form-item>
          </Col>     
          <Col :span="8">
            <Form-item label="下一步">
              <Tooltip content="填写后，任意输入都必然执行该查询,选填" placement="top-start"> 
                <Input v-model="formModify.nextFn"></Input>
              </Tooltip>
            </Form-item>
          </Col>      
          <Col :span="8">
          <Form-item label="保密消息">
            <Input-number v-model="formModify.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></Input-number>
          </Form-item>
          </Col> 
        </Row>
        <Form-item label="进入提示">
          <el-tooltip class="item" effect="dark" content="可使用sql,选填" placement="top-start">      
            <Input type="textarea" autosize v-model="formModify.entermsg" placeholder="选填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Form-item label="模板">
          <el-tooltip class="item" effect="dark" content="支持多重select/update/insert/delete，必填" placement="top-start">      
            <Input type="textarea" autosize v-model="formModify.tmpl" placeholder="必填" auto-complete="off"></Input>
          </el-tooltip>
        </Form-item>
        <Row>
          <Col :span="8">
          <Form-item label="专属应用">
            <Select v-model="formModify.app" placeholder="可选" style="width:100px">
              <Option v-for="item in $store.getters.apps" :value="item.AppName" :key="item.AppName">{{ item.AppName }}</Option>
            </Select>
          </Form-item>
          </Col>      
          <Col :span="8">
          <Form-item label="数据源">
            <Select v-model="formModify.db" placeholder="可选" style="width:100px">
              <Option v-for="item in $store.getters.dbs" :value="item.DbName" :key="item.DbName">{{ item.DbName }}</Option>
            </Select>
          </Form-item>
          </Col>      
        </Row>       
        <Form-item label="原文链接">
            <Input v-model="formModify.url" placeholder="有值时返回文章方式,此处为文章链接，选填" auto-complete="off"></Input>
        </Form-item> 
        <Form-item label="图片链接">
            <Input v-model="formModify.pic" placeholder="文章封面图片链接，选填" auto-complete="off"></Input>
        </Form-item>      
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button @click="dialogFormVisible = false">取 消</Button>
        <Button type="primary" @click="saveData">确 定</Button>
      </div>
    </Modal>

    <el-table
      stripe 
      :data="listShow"
      style="width: 100%">   
      <el-table-column fixed label="菜单" prop="mKey" width="100"></el-table-column>
      <el-table-column fixed label="功能" prop="name" width="150"></el-table-column>
      <el-table-column label="进入提醒" prop="entermsg" width="240"></el-table-column>
      <el-table-column label="模板" show-overflow-tooltip prop="tmpl" width="360"></el-table-column>
      <el-table-column label="用户权限" prop="aclUser" width="100"></el-table-column>
      <el-table-column label="部门权限" prop="aclDept" width="100"></el-table-column>
      <el-table-column label="标签权限" prop="aclTag" width="100"></el-table-column>
      <el-table-column label="应用权限" prop="aclApp" width="100"></el-table-column>
      <el-table-column label="模式" prop="mode" width="100"></el-table-column>
      <el-table-column label="下一步" prop="nextFn" width="100"></el-table-column>
      <el-table-column label="专用查询" prop="app" width="100"></el-table-column>
      <el-table-column label="数据源" prop="db" width="100"></el-table-column>
      <el-table-column label="原文链接" show-overflow-tooltip prop="url" width="100"></el-table-column>
      <el-table-column label="原文封面" show-overflow-tooltip prop="pic" width="100"></el-table-column>
      <el-table-column label="保密" prop="safe" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template scope="scope">
          <ButtonGroup>
            <Button size="small" @click="showModify(scope.row)">编辑</Button>
            <Button size="small" type="error" @click="deleteData(scope.$index, scope.row)">删除</Button>
          </ButtonGroup>
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
          pagesize: 20,
          currentPage: 1,
          formModify: {},
          dialogFormVisible: false,
          dialogFormVisible2: false,
          loading: false,
          form: {
            mKey: '',
            name: '',
            entermsg: '',
            tmpl: '',
            mode: 0,
            nextfn: '',
            aclUser: '@all',  
            aclDept: '',  
            aclTag: '',  
            aclApp: '@all',  
            app: '',
            db: '',
            url: '',
            pic: '',
            safe: 0
          }
        }
      },
      computed:{
        listShow() { return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize) }
      },
      methods: {
        handleSizeChange(val) { this.pagesize=val },
        handleCurrentChange(val) { this.currentPage=val },
        getData() {
          this.$Loading.start()
          this.loading = true
          this.$http.get(this.$tokenadmin("wxcx"))
  		  	.then(r=> { 
            if (r.data.result)this.list=r.data.data[0]
            this.loading = false
            this.$Loading.finish();
          })
          .catch(e => { this.$Loading.error(); this.loading = false })
        },
        deleteData(i,r) {
          this.$http.delete(this.$tokenadmin("wxcx")+"&id="+r.id)
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
        showModify(r){
          this.dialogFormVisible2=true
          this.formModify=r
        },
        saveData() {
          this.$http.put(this.$tokenadmin("wxcx")+"&id="+this.formModify.id, this.formModify)
          .then(r => { 
            if (r.data.result){
              this.$message({ message: '保存成功' })             
              this.list=r.data.data[0]
              this.dialogFormVisible2=false
            }else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})
        },
        addData(){          
          this.$http.post(this.$tokenadmin("wxcx"), this.form)
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