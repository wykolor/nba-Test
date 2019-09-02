<template>
  <div class="allianc">
    <h1>联盟</h1>
    <section>
      <el-button size="small" @click="addAlliance()">新增联盟</el-button>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          :label="item.allianceName"
          :name="`${index}`"
          v-for="(item,index) in allianceList"
          :key="item.id"
        >{{item.allianceName}}</el-tab-pane>
      </el-tabs>
    </section>
    <Game></Game>
  </div>
</template>

<script>
import Game from "./Game";
export default {
  data() {
    return {
      allianceList: [], //联盟列表
      activeName: "0"
    };
  },
  components: {
    Game
  },
  created() {
    this.getAlliance();
  },
  methods: {
    //   获得联盟
    getAlliance() {
      this.$server.allianceApi
        .getAllianceAddress({
          pageSize: 10,
          pageIndex: 1,
          companyName: ""
        })
        .then(res => {
          if (res.code == 200) {
            this.allianceList = res.data.data;
          }
        });
    },
    //
    addAlliance() {
      this.$prompt("请输入需要增加的联盟名字", "新增联盟", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(({ allianceName }) => {
          this.$server.allianceApi
            .addAllianceAddress({
              allianceName
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加联盟成功"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消增加联盟"
          });
        });
    },
    removeTab(targetName) {
      let tabs = this.allianceList;
      let activeName = this.activeName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.activeName = activeName;
      this.allianceList = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<style lang="less" scoped>
.allianc {
  width: 100%;
  box-sizing: border-box;
  padding: 50px;
  h1 {
    margin: 0 0 20px;
  }
}
</style>