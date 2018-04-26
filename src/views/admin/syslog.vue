<template>
  <div>  
    <Affix>
      <ButtonGroup shape="circle">
        <Button type="error" @click="clearLog" icon="android-delete">清除</Button>
        <Button type="primary" @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
      </ButtonGroup>
    </Affix>
    <div class="chart" id="mChart"></div>
    <div v-for="v in form">{{v}}</div>          
  </div>
</template>

<script>
  let echarts = require('echarts');
  export default {
      data () {
          return {
              form: [],
              loading: false,
              list: {}
          };
      },
      methods: {
          getData () {
              this.$Loading.start();
              this.loading = true;
              this.$http.get(this.$tokenadmin('log'))
                  .then(r => {
                      if (r.data.result) {
                          this.form = r.data.data;
                      }
                      this.$Loading.finish();
                      this.loading = false;
                  })
                  .catch(e => { this.$Loading.error(); this.loading = false; });
          },
          getCount () {
              this.$http.get(this.$tokenadmin('logct'))
                  .then(r => {
                      if (r.data.result) {
                          this.list = r.data.data[0][0];
                          var myChart = echarts.init(document.getElementById('mChart'));
                          myChart.setOption({
                              title: { text: '数据分析' },
                              tooltip: {},
                              xAxis: [{ data: ['查询', '提醒', 'email', '审批', '图库', '语音', '视频'] }],
                              yAxis: [
                                  {
                                      type: 'value'
                                  }
                              ],
                              series: [{
                                  name: '记录数',
                                  type: 'bar',
                                  label: {
                                      normal: {
                                          show: true,
                                          position: 'inside'
                                      }
                                  },
                                  data: [this.list.cx, this.list.tx, this.list.email, this.list.sp, this.list.tk, this.list.yy, this.list.vd]
                              }]
                          });
                      }
                  });
          },
          clearLog () {
              this.$http.delete(this.$tokenadmin('log'))
                  .then(r => {
                      if (r.data.result) {
                          this.form = r.data.data;
                      } else {
                          this.form = r.data.errmsg;
                      }
                  });
          }
      },
      mounted () {
          this.getData();
          this.getCount();
      }
  };
</script>

<style scoped="">
  .chart {
    width: 80%;
    height: 200px;
  }
</style>
