<template>
  <div style="height:100vh;width:100vh;display:table-cell;text-align:center;vertical-align:middle;">
    <el-button @click="login">Github登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push("/github/login");
    }
  }
};
</script>
