<template>
  <div>
    <webview style="width:100%;height:100%;" ref="wbLogin"/>
  </div>
</template>

<script>
import { doLogin, getAccountInfo } from "../../api/githubApi";

export default {
  mounted() {
    this.$refs.wbLogin.addEventListener("dom-ready", () => {
      let url = this.$refs.wbLogin.getURL();
      if (url.indexOf("/github/callback") > 0) {
        let params = url.split("?")[1].split("=");
        let code = params[1];
        doLogin(code).then(data => {
          let accessToken = data.data.split("&")[0].split("=")[1];
          getAccountInfo(accessToken).then(data => {
            data.data.accessToken = accessToken;
            this.$router.push({
              name: "main-page",
              params: { accountInfo: data.data }
            });
          });
        });
      }
    });
    this.$refs.wbLogin.src =
      "https://github.com/login/oauth/authorize?client_id=8a736a73dc49028beb67";
  }
};
</script>
