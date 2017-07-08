<template>
  <div v-if="$store.state.userName">
    <!-- Form -->
    <el-button @click="getData">刷新</el-button>
    <el-button @click="dialogFormVisible = true">+新增</el-button>

    <el-dialog title="新增微信提醒" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="发送日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.cdate"
            type="datetime"
            placeholder="选择发送日期,选填">
          </el-date-picker>
        </el-form-item>        
        <el-form-item label="接收人" :label-width="formLabelWidth">
          <el-input v-model="form.touser" placeholder="@all表示全体，可用逗号分隔多个部门或用户，必填" auto-complete="off"></el-input>
        </el-form-item>         
        <el-form-item label="接收应用" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.toagent" placeholder="默认为0,即小助手,选填" auto-complete="off"></el-input>
        </el-form-item>            
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input type="textarea" autosize v-model="form.content" placeholder="填入消息内容,选填" auto-complete="off"></el-input>
        </el-form-item>          
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            :action="$store.state.apiPath+'upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>              
        <el-form-item label="附件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            drag
            :on-success="handleAvatarSuccess2"
            :action="$store.state.apiPath+'upload'">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖入，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">文件不超过20MB</div>
          </el-upload>
        </el-form-item>    
        <el-form-item label="保密消息" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.safe" placeholder="填1时返保密消息,选填" auto-complete="off"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRec">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      stripe
      :data="list"
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
        prop="toAgent"
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
        prop="jg"
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
          list: [],
          imageUrl: '',
          fileUrl: '',
          dialogFormVisible: false,
          form: {
            cdate: '',  
            touser: '@all',
            content: '',
            toagent: 0,
            pic: '',
            safe: 0,
            fh: '',
          },
          form2: [{}],
          formLabelWidth: '100px'
        }
      },
      methods: {
        getData() {
          this.$http.get(this.$store.state.apiPath +"wxtx.admin")
  		  	.then(r=> { this.list=r.data })
          .catch(e => { console.log(e) })
        },
        handleDelete(i,r) {
          this.$http.delete(this.$store.state.apiPath+"wxtx?id="+r.id)
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
        handleSave(i,r) {
          this.$http.put(this.$store.state.apiPath+"wxtx?id="+r.id, r)
          .then(r => { 
            if (r.data.result){
              this.$message({message: '保存成功'})
              this.list=r.data.data[0]
            } else{
              this.$message({  message: r.data.errmsg })
            }
          })
          .catch(e => { this.$message({  message: r.data.errmsg })})          
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.fileurl;
        },   
        handleAvatarSuccess2(res, file) {
          this.fileUrl = res.fileurl;
        },
        beforeAvatarUpload(file) {
          const isJPG = (file.type === 'image/jpeg'||file.type === 'image/png')
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        },
        addRec(){
          this.form['pic']=this.imageUrl     
          this.form['fh']=this.fileUrl     
          this.$http.post(this.$store.state.apiPath+"wxtx", this.form)
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