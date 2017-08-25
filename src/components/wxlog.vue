<template>
  <div>  
    <Button type="error" @click="clearLog" icon="android-delete">清除</Button>
    <Button type="primary" @click="getData" icon="ios-reload" :loading="loading">刷新</Button>
    <div class="chart" id="mChart"></div>
    <Input type="textarea" autosize v-model="form"></Input>          
  </div>
</template>

<script>
  let echarts = require('echarts')
  export default {
    data() {
      return {
        form: "",
        loading: false
      }
    },
    methods: {
      getData() {
        this.$Loading.start()
        this.loading = true
        this.$http.get(this.$tokenadmin("log"))
        .then(r=> { 
          this.form=r.data
          this.$Loading.finish()
          this.loading = false
        })
        .catch(e => { this.$Loading.error(); this.loading = false })
      }, 
      clearLog() {
        this.$http.delete(this.$tokenadmin("log"))
		  	.then(r=> { this.form=r.data })
			  .catch(e => { console.log(e) })
      },
    },
    mounted(){
      this.getData()
      var myChart = echarts.init(document.getElementById('mChart'))
      myChart.setOption({
        title: { text: '数据分析' },
        tooltip: {},
        xAxis: { data: ['查询', '提醒', 'email', '审批','图库','通讯录'] },
        yAxis: {},
        series: [{
          name: '记录数',
          type: 'bar',
          data: [0,0,0,0,0,0]
        }]
      })
    }
  }
</script>

<style scoped="">
  .chart {
    width: 80%;
    height: 200px;
  }
</style>
