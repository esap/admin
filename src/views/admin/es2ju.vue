<template>
  <div>
    <Affix>
      <ButtonGroup shape="circle">
        <!-- <Button type="success" @click="getData" icon="ios-reload" :loading="loading">刷新</Button> -->
        <!-- <Button type="warning" @click="restartSrv" icon="ios-loop">重启</Button> -->
        <Button type="primary"s @click="saveData('img')" :loading="loading" icon="ios-download-outline">转存图片</Button>
        <Button type="success"s @click="saveData('file')" :loading="loading" icon="ios-download-outline">转存附件</Button>
      </ButtonGroup>
    </Affix>

      <Form :model="$store.state.app.form" :label-width="80">
        <Row>
            <Col :span="4">
                <Form-item label="ES库">
                  <Input v-model="list.esdb" placeholder="填入ES库名"></Input>
                </Form-item>  
            </Col>
            <Col :span="4">      
                <Form-item label="ES表">
                  <Input v-model="list.est" placeholder="填入ES表名"></Input>
                </Form-item>
            </Col>
            <Col :span="4">      
                <Form-item label="ES字段">
                  <Input v-model="list.esf" placeholder="填入ES图片字段名"></Input>
                </Form-item>
            </Col>  
            <Col :span="4">      
                <Form-item label="ES关联字段">
                  <Input v-model="list.esl" placeholder="例如“料号”"></Input>
                </Form-item>
            </Col>  
            <Col :span="4">      
                <Form-item label="ES网盘路径">
                  <Input v-model="list.esp" placeholder="例如“d:/esdisk”"></Input>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col :span="4">
                <Form-item label="JU/NX库">
                  <Input v-model="list.judb" placeholder="填入JU库名"></Input>
                </Form-item>  
            </Col>
            <Col :span="4">      
                <Form-item label="JU/NX表">
                  <Input v-model="list.jut" placeholder="例如“商品表”"></Input>
                </Form-item>
            </Col>
            <Col :span="4">      
                <Form-item label="JU/NX字段">
                  <Input v-model="list.juf" placeholder="例如“图片”"></Input>
                </Form-item>
            </Col>  
            <Col :span="4">      
                <Form-item label="JU/NX关联字段">
                  <Input v-model="list.jul" placeholder="例如“品号”"></Input>
                </Form-item>
            </Col>  
            <Col :span="4">      
                <Form-item label="JU/NX网盘路径">
                  <Input v-model="list.jup" placeholder="例如“d:/judisk”"></Input>
                </Form-item>
            </Col>
        </Row>        
      </Form>

<!--     <Modal width="240"
      title="重启ESAP中..." 
      style="text-align:center"
      v-model="modal1"
      :closable="false"
      :mask-closable="false">
      <i-circle :percent="pct" stroke-color="#5cb85c">
        <div style="font-size:24px" v-if="pct<100">{{pct}}%</div>
        <Icon v-if="pct==100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
      </i-circle>
      <div slot="footer"></div>
    </Modal>

    <Modal width="640"
      title="设置菜单" 
      style="text-align:center"
      v-model="modal2">
        <Input type="textarea" :autosize="true" v-model="menu"></Input>
        <div slot="footer" style="color: red">          
          <Alert v-show="menuErr" style="text-align:left" type="error">{{menuErr}}</Alert>
          <Button type="success"><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013" target="_blank">公众号帮助</a></Button>
          <Button type="success"><a href="https://work.weixin.qq.com/api/doc#10786" target="_blank">企业号帮助</a></Button>
          <Button @click="deleteMenu" type="error">删除</Button>
          <Button @click="saveMenu" type="primary">保存</Button>
        </div>
    </Modal> -->
  </div>
</template>

<script>
export default {
    data () {
        return {
            list: {
                esdb: 'es2',
                est: '品',
                esf: '图片',
                esl: '号',
                esp: 'c:/esdisk',
                judb: 'ju',
                jut: '商品表',
                juf: '图片',
                jul: '品号',
                jup: 'c:/jdisk/ju'
            },
            name1: '',
            modal1: false,
            modal2: false,
            loading: false
        };
    },
    methods: {
        saveData (suffix) {
            this.$http.post(this.$tokenadmin('es2ju.' + suffix), this.list)
                .then(r => {
                    if (r.data.result) {
                        this.$Message.info('转存成功');
                    } else {
                        this.$Message.info(r.data.errmsg);
                    }
                })
                .catch(e => { this.$Message.info(e); });
        }
    }
};
</script>

<style scoped>
a {
    color: #fff;
}
</style>