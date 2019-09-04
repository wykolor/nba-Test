<template>
  <div class="team">
    <div class="team-header">
      <el-button type="Info" icon="el-icon-plus" @click="openPopup">添加球队</el-button>
      <el-dialog title="添加球队" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="球队名称" :label-width="formLabelWidth">
            <el-input v-model="form.teamName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属联盟" :label-width="formLabelWidth">
            <el-select v-model="form.commpanyId" placeholder="请选择所属联盟">
              <!-- 遍历联盟 -->
              <el-option
                :label="item.allianceName"
                :value="item.id"
                v-for="item in form.allianceList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTeam">确 定</el-button>
        </div>
      </el-dialog>
      <section>
        <el-input
          placeholder="输入球队关键字查询"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          @change="serachTeam"
        ></el-input>
      </section>
    </div>
    <div class="team-list" v-loading="loading">
      <el-row :gutter="15">
        <el-col :span="4" v-for="item in teamLists" :key="item.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div style="padding: 14px 0;text-align:center">
              <i class="el-icon-basketball"></i>
              <span style="font-size:20px;font-weight: bold;">{{item.teamName}}</span>
              <span
                style="display:block;line-height:34px;color:rgb(133, 133, 133);;"
              >{{item.allianceName}}</span>
              <div class="bottom">
                <el-tag type="success">比赛</el-tag>
                <el-tag type="warning">更新球队</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      teamLists: [],
      dialogFormVisible: false, //隐藏弹框
      form: {
        teamName: "",
        commpanyId: "",
        delivery: false,
        allianceList: this.$store.getters.allianceList
      },
      formLabelWidth: "120px",
      loading: true
    };
  },
  created() {
    this.$store.commit("changeActiveTab", this.$route.path);
    this.getTeam();
  },
  methods: {
    teamList() {
      let id = this.$route.query.allianceId;
      let allianceId = id ? id : "";
      this.$server.teamApi
        .getTeamAddress({
          pageSize: 10,
          pageIndex: 1,
          teamName: this.searchValue,
          allianceId
        })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.teamLists = res.data.data;
            this.$store.commit("changeTeam", this.teamLists);
          }
        });
    },
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
            this.form.allianceList = res.data.data;
          }
        });
    },
    // 获得球队
    getTeam() {
      this.teamList();
    },
    // 查询球队
    serachTeam() {
      this.loading = true;
      this.teamList();
    },
    // 打开弹出窗
    openPopup() {
      this.dialogFormVisible = true;
      // this.getAlliance();
    },
    // 真正的添加球队业务逻辑
    addTeam() {
      this.$server.teamApi
        .addTeamAddress({
          teamName: this.form.teamName,
          allianceId: this.form.commpanyId
        })
        .then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "添加球队成功"
            });
            this.dialogFormVisible = false; //关闭弹出
            this.teamList();
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.team {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  // padding: 20px 0px;
  .team-header {
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
  .team-list {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 40px 10px;
    .el-col-4 {
      margin-bottom: 15px;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>