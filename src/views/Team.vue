<template>
  <div class="team">
    <div class="team-header">
      <el-button type="Info" icon="el-icon-plus" @click="openPopup('添加球队')">添加球队</el-button>
      <el-dialog :title="popupTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="球队名称" :label-width="formLabelWidth">
            <el-input v-model="form.teamName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属联盟" :label-width="formLabelWidth">
            <el-select v-model="form.allianceName" placeholder="请选择所属联盟">
              <!-- 遍历联盟 -->
              <el-option
                :label="item.allianceName"
                :value="item.allianceName"
                v-for="item in form.allianceList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUpdate(form.allianceId)">确 定</el-button>
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
                <el-tag type="warning" @click="openPopup('修改球队',item.id)">更新球队</el-tag>
                <el-tag type="danger" @click="delTeam(item.id)">删除</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="team-page">
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
export default {
  data() {
    return {
      searchValue: "",
      teamLists: [],
      dialogFormVisible: false, //隐藏弹框
      form: {
        teamName: "",
        id: "",
        allianceId: "",
        allianceName: "",
        allianceList: this.$store.getters.allianceList
      },
      formLabelWidth: "120px",
      loading: true,
      popupTitle: "添加球队",
      total: null,
      currentPage: 1,
      pageSize: 10
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
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
          teamName: this.searchValue,
          allianceId
        })
        .then(res => {
          if (res.code == 200) {
            this.loading = false;
            this.total = res.data.total;
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
    openPopup(title, id) {
      this.dialogFormVisible = true;
      this.popupTitle = title;
      if (!id) {
        return false;
      } else {
        // 回显数据
        this.$server.teamApi
          .updateTeamDataAddress({
            id
          })
          .then(res => {
            if (res.code == 200) {
              let { allianceName, allianceId, teamName, id } = res.data;
              this.form.allianceName = allianceName;
              this.form.allianceId = allianceId;
              this.form.teamName = teamName;
              this.form.id = id;
            }
          });
      }
    },
    // 增加更新
    addUpdate() {
      this.form.allianceList.forEach(item => {
        if (this.form.allianceName == item.allianceName) {
          this.form.allianceId = item.id;
          if (!this.form.id) {
            this.addTeam();
            return false;
          } else {
            this.updateTeam();
            return false;
          }
        }
      });
    },
    // 添加球队
    addTeam() {
      this.$server.teamApi
        .addTeamAddress({
          teamName: this.form.teamName,
          allianceId: this.form.allianceId
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
    },
    // 更新球队
    updateTeam() {
      let { id, allianceId, teamName } = this.form;
      this.$server.teamApi
        .updateTeamAddress({
          id,
          allianceId,
          teamName
        })
        .then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "修改球队成功"
            });
            this.dialogFormVisible = false; //关闭弹出
            this.teamList();
          }
        });
    },
    delTeam(id) {
      this.$confirm("此操作将永久删除该球队, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$server.teamApi.deleteTeamAddress({ id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.teamList();
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
      this.teamList();
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.teamList();
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
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
  .team-page {
    text-align: center;
    padding: 20px 40px;
  }
}
</style>