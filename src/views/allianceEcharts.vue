<template>
  <div class="score-echarts">
    <div id="scoreShow1" class="echarts-score"></div>
    <div id="scoreShow2" class="echarts-score"></div>
    <div id="scoreShow3" class="echarts-score"></div>
  </div>
</template>

<script>
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/markLine");
import "echarts/lib/component/legendScroll";
export default {
  data() {
    return {
      allianceScore: [],
      scoreFirst: [],
      scoreSecond: []
    };
  },
  created() {
    this.getScore();
  },
  methods: {
    // 获取 联盟下的比分统计
    getScore() {
      let allianceName = this.$route.params.allianceName;
      this.$server.allianceApi
        .scoreEchartsAddress({
          allianceName
        })
        .then(res => {
          if (res.code == 200) {
            this.allianceScore = res.data;
            this.$nextTick(() => {
              this.drawChart();
            });
          }
        });
      this.$server.allianceApi
        .scoreFirstAddress({
          allianceName
        })
        .then(res => {
          if (res.code == 200) {
            this.scoreFirst = res.data;
            this.$nextTick(() => {
              this.drawChart();
            });
          }
        });
      this.$server.allianceApi
        .scoreSecondAddress({
          allianceName
        })
        .then(res => {
          if (res.code == 200) {
            this.scoreSecond = res.data;
            this.$nextTick(() => {
              this.drawChart();
            });
          }
        });
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("scoreShow1"));
      let myChart2 = this.$echarts.init(document.getElementById("scoreShow2"));
      let myChart3 = this.$echarts.init(document.getElementById("scoreShow3"));
      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: "联盟下所有比分分布",
          subtext: "百分比展示",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.allianceScore,

          selected: this.allianceScore
        },
        series: [
          {
            name: "比分",
            type: "pie",
            radius: "55%",
            center: ["50%", "40%"],
            data: this.allianceScore,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let option2 = {
        title: {
          text: "联盟下第1节比分",
          subtext: "百分比展示",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.scoreFirst,

          selected: this.scoreFirst
        },
        series: [
          {
            name: "比分",
            type: "pie",
            radius: "55%",
            center: ["50%", "40%"],
            data: this.scoreFirst,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let option3 = {
        title: {
          text: "联盟下第2节比分",
          subtext: "百分比展示",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.scoreSecond,

          selected: this.scoreSecond
        },
        series: [
          {
            name: "比分",
            type: "pie",
            radius: "55%",
            center: ["50%", "40%"],
            data: this.scoreSecond,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
    }
  }
};
</script>

<style lang="less" scoped>
.score-echarts {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 50px 0px;
  justify-content: space-around;
  text-align: center;
  .echarts-score {
    width: 33%;
    height: 500px;
    box-sizing: border-box;
  }
}
</style>