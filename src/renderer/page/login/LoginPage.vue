<template>
  <div>
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