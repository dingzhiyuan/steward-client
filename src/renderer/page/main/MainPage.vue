<template>
  <div>
    <div class="account-info">
      <div style="text-align:center;">
        <el-image
          :src="url"
          :fit="fill"
          style="width:100px;height:100px;margin-top:30px;border-radius:100px"
        />
        <el-row style="color:white;margin-top:10px;">{{accountInfo.login}}</el-row>
      </div>
      <el-row class="row_all">
        <el-col>
          <span class="tag_all">All(已加载:{{currentLoadedCount}}/总计:{{totalCount}})</span>
        </el-col>
      </el-row>
      <el-collapse class="left-side-collapse">
        <el-collapse-item>
          <template slot="title">
            <span style="margin-left:20px;font-size:14px;">LANGUAGES</span>
          </template>
          <el-row v-for="languageName in languageNameList" :key="languageName">
            <el-row
              class="languages_item"
              @click.native="clickLanguage(languageName)"
            >{{languageName}}</el-row>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      class="infinite-list items-list"
      v-infinite-scroll="loadMore"
    >
      <el-row style="height:50px;padding:5px;">
        <el-input placeholder="请输入搜索内容" v-model="searchValue" @input="search">
          <i slot="prefix" class="el-input__icon el-icon-search"/>
        </el-input>
      </el-row>
      <el-row v-for="item in items" :key="item.node.nameWithOwner" class="infinite-list-item">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" @click="clickItem(item)">
            <p class="info-title">{{item.node.nameWithOwner.split('/')[1]}}</p>
            <p class="info-author">author:{{item.node.nameWithOwner.split('/')[0]}}</p>
            <p class="info-description">{{item.node.description}}</p>
            <el-row class="info-handler-col">
              <el-col :span="8">
                <i class="el-icon-s-opportunity"></i>
                {{1}}
              </el-col>
              <el-col :span="8">
                <i class="el-icon-star-off"></i>
                {{1}}
              </el-col>
              <el-col :span="8">
                <i class="el-icon-share"></i>
                {{1}}
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="readme-content">
      <vue-markdown :source="readme_content"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import "./main.css";
import {
  getStarItems,
  getReadmeInfo,
  getReadmeContent
} from "../../api/githubApi";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      accountInfo: null,
      currentLoadedCount: 0,
      totalCount: 0,
      url: "",
      items: [],
      totalStarItems: [],
      starItems: [],
      count: 0,
      nextUrl: "",
      lastUrl: "",
      readme_content: "",
      loading: true,
      fill: "fill",
      languageList: [],
      languageNameList: [],
      searchValue: ""
    };
  },
  created() {
    this.initItems();
  },
  methods: {
    loadMore() {
      if (this.count == this.starItems.length) {
        return;
      }
      this.count++;
      this.items = this.items.concat(this.starItems[this.count]);
    },
    initItems() {
      this.accountInfo = this.$route.params.accountInfo;
      let cacheAccountInfo = this.$store.state.global.accountInfo;
      if (undefined != cacheAccountInfo || null != cacheAccountInfo) {
        this.accountInfo = cacheAccountInfo;
      } else {
        this.$store.dispatch("setAccountInfo", this.$route.params.accountInfo);
      }
      let accessToken = this.accountInfo.accessToken;
      this.url = this.accountInfo.avatar_url;
      this.loadItems(accessToken, "", 0);
    },
    loadItems(accessToken, cursor, index) {
      getStarItems(accessToken, cursor)
        .then(data => {
          let starredRepositories = data.data.data.viewer.starredRepositories;
          let cacheStarItems = this.$store.state.global.starItems;
          let needLoadItems = false;
          if (null == cacheStarItems || cacheStarItems.length == 0) {
            needLoadItems = true;
          }
          if (
            this.$store.state.global.totalCount !=
            starredRepositories.totalCount
          ) {
            needLoadItems = true;
          }
          if (needLoadItems) {
            if (starredRepositories.edges.length > 0) {
              this.totalCount = starredRepositories.totalCount;
              this.currentLoadedCount += starredRepositories.edges.length;
              this.starItems.push(starredRepositories.edges);
              this.loadItems(
                accessToken,
                starredRepositories.pageInfo.endCursor,
                index++
              );
            } else {
              this.$store.dispatch("setStarItems", this.starItems);
              this.$store.dispatch("setTotalCount", this.currentLoadedCount);
              this.loadComplete(this.starItems, this.currentLoadedCount);
            }
          } else {
            this.loadComplete(
              cacheStarItems,
              this.$store.state.global.totalCount
            );
          }
        })
        .catch(error => {
          this.$store.dispatch("clearAccountInfo");
          this.$router.push("/");
        });
    },
    loadComplete(items, totalCount) {
      this.items = items[0];
      this.starItems = items;
      this.totalStarItems = items;
      this.loading = false;
      this.currentLoadedCount = totalCount;
      this.totalCount = totalCount;
      for (let i = 0; i < items.length; i++) {
        for (let item of items[i]) {
          let languageName =
            null == item.node.primaryLanguage
              ? "unknown"
              : item.node.primaryLanguage.name;
          let list = this.languageList[languageName];
          if (undefined == list) {
            list = [];
            this.languageNameList.push(languageName);
          }
          list.push(item);
          this.languageList[languageName] = list;
        }
      }
      for (let key in this.languageList) {
        let list = this.languageList[key];
        let count = list.length / 100 + 1;
        let lastCount = list.length % 100;
        let items = [];
        for (let i = 0; i < count; i++) {
          let array = list.splice(0, 100);
          if (array.length > 0) {
            items[i] = array;
          }
        }
        this.languageList[key] = items;
      }
    },
    search() {
      this.starItems = [];
      let list = [];
      let index = 0;
      for (let temp of this.totalStarItems) {
        for (let item of temp) {
          if (
            item.node.nameWithOwner.split("/")[1].startsWith(this.searchValue)
          ) {
            list.push(item);
            this.starItems[index] = list;
            if (list.length == 100) {
              list = [];
              index++;
            }
          }
        }
      }
      this.items = this.starItems[0];
      this.count = 0;
    },
    clickItem(item) {
      let nameWithOwner = item.node.nameWithOwner.split("/");
      this.getReadmeInfo(nameWithOwner[0], nameWithOwner[1]).then(data => {
        this.readme_content = data;
      });
    },
    clickLanguage(languageName) {
      let list = this.languageList[languageName];
      this.count = 0;
      this.items = list[0];
    },
    async getReadmeInfo(owner, repo) {
      let { data } = await getReadmeInfo(owner, repo);
      data = this.getReadmeContent(data.download_url);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    async getReadmeContent(readmeUrl) {
      let { data } = await getReadmeContent(readmeUrl);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  }
};
</script>