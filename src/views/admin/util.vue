<template>
  <div>
    <Affix>
      <ButtonGroup shape="circle">
        <!-- <Button type="success" @click="getData" icon="ios-reload" :loading="loading">刷新</Button> -->
        <!-- <Button type="warning" @click="restartSrv" icon="ios-loop">重启</Button> -->
        <Button type="primary"s @click="saveData('img')" :loading="loading" icon="ios-download-outline">压缩图片</Button>
        <!-- <Button type="success"s @click="saveData('file')" :loading="loading" icon="ios-download-outline">转存附件</Button> -->
      </ButtonGroup>
    </Affix>

      <Form :model="$store.state.app.form" :label-width="80">
        <Row>
            <Col :span="6">
                <Form-item label="图片路径">
                  <Input v-model="list.path" placeholder="填入图片路径"></Input>
                </Form-item>  
            </Col>
            <Col :span="6">      
                <Form-item label="图片后缀">
                  <Input v-model="list.suffix" placeholder="例如：“jpg,png”"></Input>
                </Form-item>
            </Col>
            <Col :span="6">      
                <Form-item label="最大容量(KB)">
                  <Input v-model="list.max" placeholder="例如:“200”"></Input>
                </Form-item>
            </Col>
            <Col :span="6">      
                <Form-item label="包含子路径">
                  <i-switch v-model="list.hasubpath"></i-switch>
                </Form-item>
            </Col>  
        </Row>               
      </Form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            list: { path: '', suffix: 'jpg,png', hasubpath: true, max: 200 },
            name1: '',
            modal1: false,
            modal2: false,
            loading: false
        };
    },
    methods: {
        saveData () {
            this.$http.post(this.$tokenadmin('util.compresspic'), this.list)
                .then(r => {
                    if (r.data.result) {
                        this.$Message.info('压缩成功');
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