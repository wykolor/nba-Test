<template>
  <div class="alliance">
    <!-- 头部 -->
    <div class="alli-header">
      <el-button type="Info" icon="el-icon-plus" @click="addAlliance()">添加联盟</el-button>
      <section>
        <el-input
          placeholder="输入联盟关键字查询"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @change="serachAlliance"
        ></el-input>
      </section>
    </div>
    <div class="ali-list" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in allianceList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img
              src="https://australia.basketball/wp-content/uploads/2018/09/OgImage_en.png"
              class="image"
            />
            <div style="padding: 14px 0;text-align:center">
              <span style="font-size:20px;font-weight: bold;">{{item.allianceName}}</span>
              <div class="bottom">
                <el-tag @click="goTeam(item.id)">球队</el-tag>
                <el-tag type="success" @click="goGame(item.id)">比赛</el-tag>
                <el-tag type="warning" @click="updateAlliance(item.allianceName,item.id)">更新联盟</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Game from "./Game";
export default {
  data() {
    return {
      allianceList: [], //联盟列表
      activeName: "0",
      activeIndex2: "1",
      searchValue: "",
      loading: true
    };
  },
  components: {
    Game
  },
  created() {
    this.getAlliance();
  },
  methods: {
    allianceLists() {
      this.$server.allianceApi
        .getAllianceAddress({
          pageSize: 10,
          pageIndex: 1,
          companyName: this.searchValue
        })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.allianceList = res.data.data;
            this.$store.commit("changeAlliance", this.allianceList);
          }
        });
    },
    //   获得联盟
    getAlliance() {
      this.allianceLists();
    },
    // 搜索联盟
    serachAlliance() {
      this.loading = true;
      this.allianceLists();
    },
    //添加联盟
    addAlliance() {
      this.$prompt("请输入需要增加的联盟名字", "新增联盟", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$server.allianceApi
            .addAllianceAddress({
              allianceName: value
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加联盟成功"
                });
                this.getAlliance();
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
    // 更新联盟
    updateAlliance(oldAlliance, id) {
      this.$prompt("请输入需要更新的联盟名字", `原始联盟：${oldAlliance}`, {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$server.allianceApi
            .updateAllianceAddress({
              id,
              allianceName: value
            })
            .then(res => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "更新联盟成功"
                });
                this.getAlliance();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更新联盟"
          });
        });
    },
    // 去到球队
    goTeam(allianceId) {
      this.$router.push({ path: "/team", query: { allianceId } });
    },
    goGame(allianceId) {
      this.$router.push({ path: "/game", query: { allianceId } });
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
    .el-col-4 {
      margin-bottom: 20px;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      align-items: center;
      justify-content: space-around;
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