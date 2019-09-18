<template>
  <div class="game">
    <div class="game-header">
      <el-button type="Info" icon="el-icon-plus" @click="openPopup('添加比赛')">添加比赛</el-button>
      <!-- 添加弹窗 -->
      <el-dialog :title="popupTitle" :visible.sync="addShow">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :inline="true">
          <el-form-item label="主队">
            <el-select v-model="ruleForm.zhuTeam" placeholder="请选择主队名称">
              <el-option
                :label="zhu.teamName"
                :value="zhu.teamName"
                v-for="zhu in teamList"
                :key="zhu.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客队">
            <el-select v-model="ruleForm.keTeam" placeholder="请选择客队名称">
              <el-option
                :label="ke.teamName"
                :value="ke.teamName"
                v-for="ke in teamList"
                :key="ke.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联盟名称">
            <el-select v-model="ruleForm.allianceName" placeholder="请选择联盟名称">
              <el-option
                :label="alli.allianceName"
                :value="alli.allianceName"
                v-for="alli in allianceList"
                :key="alli.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="比赛时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.gameTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>-->
          <el-form-item label="第一节比分">
            <el-input v-model="ruleForm.firstScore"></el-input>
          </el-form-item>
          <el-form-item label="第二节比分">
            <el-input v-model="ruleForm.secondScore"></el-input>
          </el-form-item>
          <el-form-item label="第三节比分">
            <el-input v-model="ruleForm.thirdScore"></el-input>
          </el-form-item>
          <el-form-item label="第四节比分">
            <el-input v-model="ruleForm.forthScore"></el-input>
          </el-form-item>
          <el-form-item label="整场比分">
            <el-input v-model="ruleForm.allScore"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addShow = false">取 消</el-button>
          <el-button type="primary" @click="addUpdate">确 定</el-button>
        </div>
      </el-dialog>
      <section>
        <el-input
          placeholder="输入比赛关键字查询"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @change="serachGame"
        ></el-input>
      </section>
    </div>
    <div class="game-list" v-loading="loading">
      <el-table :data="gameLists" border style="width: 100%">
        <el-table-column label="主场VS客场" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag type="success">{{scope.row.zhuTeam}}VS{{scope.row.keTeam}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="allianceName" label="所属联盟" align="center"></el-table-column>
        <el-table-column prop="firstScore" label="第一节比分" align="center"></el-table-column>
        <el-table-column prop="secondScore" label="第二节比分" align="center"></el-table-column>
        <el-table-column prop="thirdScore" label="第三节比分" align="center"></el-table-column>
        <el-table-column prop="forthScore" label="第四节比分" align="center"></el-table-column>
        <el-table-column prop="allScore" label="总比分" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openPopup('编辑比赛',scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="game-page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parse } from "path";
export default {
  data() {
    return {
      searchValue: "",
      gameLists: [],
      loading: true,
      addShow: false,
      ruleForm: {
        keTeamId: "",
        keTeam: "",
        zhuTeamId: "",
        zhuTeam: "",
        allianceId: "",
        allianceName: "",
        firstScore: "",
        secondScore: "",
        thirdScore: "",
        forthScore: "",
        allScore: "",
        id: ""
        // gameTime: "",
      },
      rules: {
        keTeamId: [{ required: true, message: "必填内容", trigger: "change" }]
      },
      popupTitle: "添加比赛",
      total: null,
      pageSize: 10,
      currentPage: 1
    };
  },
  created() {
    this.$store.commit("changeActiveTab", this.$route.path);
    this.getGame();
  },
  computed: {
    ...mapGetters(["allianceList", "teamList"])
  },
  methods: {
    gameList() {
      let id = this.$route.query.allianceId;
      let allianceId = id ? id : "";
      this.$server.gameApi
        .getGameAddress({
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
          gameName: this.searchValue,
          allianceId
        })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.total = res.data.total;
            this.gameLists = res.data.data;
            this.$store.commit("changeGame", this.gameLists);
          }
        });
    },
    getGame() {
      this.gameList();
    },
    serachGame() {
      this.gameList();
    },
    openPopup(title, row) {
      this.popupTitle = title;
      this.addShow = true;
      if (row) {
        this.ruleForm = row;
      }
    },

    addUpdate() {
      this.allianceList.forEach(item => {
        if (this.ruleForm.allianceName == item.allianceName) {
          this.ruleForm.allianceId = item.id;
          return false;
        }
      });
      this.teamList.forEach(item => {
        if (this.ruleForm.zhuTeam == item.teamName) {
          this.ruleForm.zhuTeamId = item.id;
        } else if (this.ruleForm.keTeam == item.teamName) {
          this.ruleForm.keTeamId = item.id;
        }
      });
      // (this.ruleForm.gameTime);
      debugger;
      if (!this.ruleForm.id) {
        this.addGame();
      } else {
        this.updateGame();
      }
    },
    // 添加比赛
    addGame() {
      let params = { ...this.ruleForm };
      this.$server.gameApi.addGameAddress(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "添加比赛成功"
          });
          this.addShow = false;
          this.gameList();
        }
      });
    },
    // 更新比赛
    updateGame() {
      let params = { ...this.ruleForm };
      this.$server.gameApi.updateGameAddress(params).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "修改比赛成功"
          });
          this.addShow = false;
          this.gameList();
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该比赛, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$server.gameApi.deleteGameAddress({ id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.gameList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.loading = true;
      this.pageSize = val;
      this.gameList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.gameList();
    }
  }
};
</script>

<style lang="less" scoped>
.game {
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  .game-header {
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
  .game-list {
    padding: 20px 40px 10px;
  }
  .game-page {
    text-align: center;
    padding: 20px 40px;
  }
}
</style>