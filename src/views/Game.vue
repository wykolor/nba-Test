<template>
  <div class="game">
    <div class="game-header">
      <el-button type="Info" icon="el-icon-plus" @click="openPopup">添加比赛</el-button>
      <!-- 添加弹窗 -->
      <el-dialog title="新增比赛" :visible.sync="addShow">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :inline="true">
          <el-form-item label="主队">
            <el-select v-model="ruleForm.zhuTeamId" placeholder="请选择主队名称">
              <el-option
                :label="zhu.teamName"
                :value="zhu.id"
                v-for="zhu in teamList"
                :key="zhu.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客队">
            <el-select v-model="ruleForm.keTeamId" placeholder="请选择客队名称">
              <el-option :label="ke.teamName" :value="ke.id" v-for="ke in teamList" :key="ke.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联盟名称">
            <el-select v-model="ruleForm.allianceId" placeholder="请选择联盟名称">
              <el-option
                :label="alli.allianceName"
                :value="alli.id"
                v-for="alli in allianceList"
                :key="alli.id"
              ></el-option>
            </el-select>
          </el-form-item>
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
          <el-button type="primary" @click="addShow = false">确 定</el-button>
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
    <div class="game-list">
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
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      gameLists: [],
      loading: true,
      addShow: false,
      ruleForm: {
        keTeamId: "",
        zhuTeamId: "",
        allianceId: "",
        firstScore: "",
        secondScore: "",
        thirdScore: "",
        forthScore: "",
        allScore: ""
      },
      rules: {
        keTeamId: [{ required: true, message: "必填内容", trigger: "change" }]
      }
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
          pageSize: 10,
          pageIndex: 1,
          gameName: this.searchValue,
          allianceId
        })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
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
    openPopup() {
      this.addShow = true;
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
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
}
</style>