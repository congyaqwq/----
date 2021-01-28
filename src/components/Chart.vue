<template>
  <div ref="chartDom" style="height: 200px"></div>
</template>

<script>
import echarts from "echarts";
import { addListener, removeListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.myChart.setOption(options);
      }
    }
  },
  data() {
    return {
      myChart: ""
    };
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
  },
  beforeDestroy() {
    removeListener(this.$refs.chartDom, this.resize);
    // 销毁实例，防止内存泄露
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.myChart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(document.getElementById("chartDom"));
      this.myChart = echarts.init(this.$refs.chartDom);
      // 绘制图表
      // 页面布局还没完成时会自动获取宽度
      addListener(this.$refs.chartDom, this.resize);
      this.myChart.setOption(this.options);
    }
  }
};
</script>

<style>
</style>