<template>
  <div class="game">
    <h1>比赛</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.$server.GameApi.getGameAddress({
      pageSize: 10,
      pageIndex: 1,
      gameName: ""
    }).then(res => {
      if (res.code == 200) {
      }
    });
  }
};
</script>

<style lang="less" scoped>
.game {
  background-color: #fff;
}
</style>