<template>
  <div style="height:100vh;width:100vw;display:table-cell;text-align:center;vertical-align:middle;">
    <el-button @click="login">Github登录</el-button>
  </div>
</template>

<script>
export default {
  created() {
    let cacheAccountInfo = this.$store.state.global.accountInfo;
    if (undefined != cacheAccountInfo || null != cacheAccountInfo) {
      this.login();
    }
  },
  methods: {
    login() {
      this.$router.push("/github/login");
    }
  }
};
</script>