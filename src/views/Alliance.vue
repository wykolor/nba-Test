<template>
  <div class="alliance">
    <!-- 头部 -->
    <div class="alli-header">
      <el-button type="Info" icon="el-icon-plus" @click="addAlliance()">添加</el-button>
      <section>
        <el-input placeholder="输入联盟关键字查询" prefix-icon="el-icon-search" v-model="searchAlliance"></el-input>
      </section>
    </div>
    <div class="ali-list">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in allianceList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <!-- <img src="https://element.eleme.cn/2.0/static/hamburger.50e4091.png" class="image" /> -->
            <div style="padding: 14px;">
              <span>{{item.allianceName}}</span>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">更新联盟</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- <h1>联盟</h1>
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
    </section>-->
  </div>
</template>

<script>
import Game from "./Game";
export default {
  data() {
    return {
      allianceList: [
        { allianceName: "NBA", id: "alliance" },
        { allianceName: "NBA", id: "alliance1" },
        { allianceName: "CBA", id: "cba" },
        { allianceName: "DBA", id: "dba" },
        { allianceName: "BBC", id: "bbc" },
        { allianceName: "CBA", id: "cba2" },
        { allianceName: "DBA", id: "dba3" },
        { allianceName: "BBC", id: "bbc4" }
      ], //联盟列表
      activeName: "0",
      activeIndex2: "1",
      searchAlliance: "",
      currentDate: new Date()
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
    //添加联盟
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
.alliance {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  // padding: 20px 0px;
  .alli-header {
    box-sizing: border-box;
    padding: 20px 40px 10px;
    border-bottom: 1px solid #dcdfe6;
    .el-button {
      margin-right: 20px;
    }
    display: flex;
    & > section {
      width: 200px;
    }
  }
  .ali-list {
    padding: 20px 40px 10px;
    .time {
      font-size: 13px;
      color: #999;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>