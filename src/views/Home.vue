<template>
  <div class="home">
    <el-container>
      <el-header>NBA计分统计系统</el-header>
      <div class="nba-content">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item
            :index="`${item.path}`"
            v-for="(item,index) in tabList"
            :key="index"
          >{{item.tip}}</el-menu-item>
        </el-menu>
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import Alliance from "./Alliance";
import { relative } from "path";
export default {
  components: {
    Alliance
  },
  data() {
    return {
      activeIndex: "alliance",
      tabList: [
        {
          path: "alliance",
          tip: "NBA联盟"
        },
        {
          path: "team",
          tip: "NBA球队"
        },
        {
          path: "game",
          tip: "NBA比赛"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  box-sizing: border-box;
  .el-header,
  .el-footer {
    background-color: rgb(84, 92, 100);
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .nba-content {
    .el-menu {
      padding: 0 20px;
    }
  }
}
</style>