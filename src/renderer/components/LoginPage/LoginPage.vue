<template>
  <div>
    <el-button @click="login">Github登录</el-button>
    <webview style="height:500px" ref="wbLogin"/>
  </div>
</template>

<script>
import axios from "axios";
import {
  GITHUB_LOGIN_OAUTH_ACCESS_TOKEN,
  GITHUB_USER_INFO
} from "../../internal/api";
import { resolve } from "url";

export default {
  mounted() {
    this.$refs.wbLogin.addEventListener("dom-ready", () => {
      let url = this.$refs.wbLogin.getURL();
      if (url.indexOf("/github/callback") > 0) {
        let params = url.split("?")[1].split("=");
        let code = params[1];
        this.githubLogin(code);
      }
    });
  },
  methods: {
    login() {
      this.$refs.wbLogin.src =
        "https://github.com/login/oauth/authorize?client_id=8a736a73dc49028beb67";
    },
    async githubLogin(code) {
      let { data } = await this.$Request_post(
        "https://github.com/login/oauth/access_token",
        {
          code: code,
          client_id: "8a736a73dc49028beb67",
          client_secret: "bad68883caf7e1fd6da21681aad5b753de43da62"
        }
      );
      data = await this.getAccountInfo(data.split("&")[0].split("=")[1]);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    async getAccountInfo(accessToken) {
      this.$store.dispatch("getStarItems", accessToken);
      let { data } = await this.$Request_get("https://api.github.com/user", {
        access_token: accessToken
      });
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  }
};
</script>
