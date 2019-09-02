<template>
  <div>
    <h1>我是首页</h1>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  created() {
    this.$server.indexApi
      .goodsAddress({ pageSize: 10, pageIndex: 1, companyName: "" })
      .then(res => {
        console.log(res);
      });
  }
};
</script>

<style lang="less" scoped>
</style>