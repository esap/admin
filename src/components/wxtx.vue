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

    <Modal title="新增微信提醒" v-model="dialogFormVisible">
      <Form :model="form" :label-width="80">
        <Form-item label="发送日期">
          <Date-picker v-model="form.cdate" type="datetime" placeholder="选择发送日期,选填"></Date-picker>
        </Form-item>        
        <Form-item label="接收人">
          <Input v-model="form.touser" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填"></Input>
        </Form-item>         
        <Form-item label="接收应用">
          <Input v-model="form.app" placeholder="默认为esap, 选填" auto-complete="off"></Input>
        </Form-item>            
        <Form-item label="内容">
          <Input type="textarea" autosize v-model="form.content" placeholder="填入消息内容,选填"></Input>
        </Form-item>          
        <Form-item label="图片">
          <el-upload
            class="avatar-uploader"
            :action="$store.state.uploadUrl+this.$store.getters.token"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </Form-item>              
        <Form-item label="附件">
          <el-upload
            class="upload-demo"
            drag
            :on-success="handleAvatarSuccess2"
            :action="$store.state.uploadUrl+this.$store.getters.token">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖入，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">文件不超过20MB</div>
          </el-upload>
        </Form-item>    
        <Form-item label="保密消息">
          <Input-number v-model="form.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></Input-number>
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
        prop="cDate"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="toUser"
        label="接收人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="app"
        label="接收应用"
        width="100">
      </el-table-column>
      <el-table-column
        prop="content"
        show-overflow-tooltip
        label="内容">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="图片"
        show-overflow-tooltip
        width="100">
      </el-table-column>
      <el-table-column
        prop="fh"
        label="文件"
        show-overflow-tooltip
        width="100">
      </el-table-column>
      <el-table-column
        prop="ret"
        label="发送结果"
        show-overflow-tooltip
        width="100">
      </el-table-column>
      <el-table-column
        prop="flag"
        label="标记"
        width="80">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">   
          <Button
            size="small"
            type="error"
            @click="deleteData(scope.$index, scope.row)">删除</Button>
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
        currentPage:1,
        pagesize:10,
        imageUrl: '',
        fileUrl: '',
        dialogFormVisible: false,
        form: {
          cdate: '',  
          touser: '@all',
          content: '',
          app: 'esap',
          pic: '',
          safe: 0,
          fh: '',
        },
        form2: [{}],
      }
    },
    computed:{
      listShow() { return this.list.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize) }
    },
    methods: {
      token(action) { return this.$store.state.adminUrl + action + "?token=" + sessionStorage.getItem("token") },
      handleSizeChange(v) { this.pagesize=v },
      handleCurrentChange(v) { this.currentPage=v },
      getData() {
        this.$http.get(this.token("wxtx"))
		  	.then(r=> { this.list=r.data.data[0] })
        .catch(e => { console.log(e) })
      },
      deleteData(i,r) {
        this.$http.delete(this.token("wxtx")+"&id="+r.id)
        .then(r => { 
          if (r.data.result){
            this.$Message.info('删除成功')
            this.list=r.data.data[0]
          }else{
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})
      },
      saveData(i,r) {
        this.$http.put(this.token("wxtx")+"&id="+r.id, r)
        .then(r => { 
          if (r.data.result){
            this.$Message.info('保存成功')
            this.list=r.data.data[0]
          } else{
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})          
      },
      handleAvatarSuccess(res, file) { this.imageUrl = res.fileurl },   
      handleAvatarSuccess2(res, file) { this.fileUrl = res.fileurl },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$Message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$Message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      addData() {
        this.form['pic']=this.imageUrl     
        this.form['fh']=this.fileUrl     
        this.$http.post(this.token("wxtx"), this.form)
        .then(r => { 
          if (r.data.result){
            this.$Message.info('新增成功')
            this.dialogFormVisible = false              
            this.getData()
          }else{
            this.$Message.info(r.data.errmsg)
          }
        })
        .catch(e => { this.$Message.info(r.data.errmsg)})
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>