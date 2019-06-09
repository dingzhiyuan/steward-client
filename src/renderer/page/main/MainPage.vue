<template>
  <div>
    <div
      class="infinite-list"
      v-infinite-scroll="loadMore"
      style="width:20%;float:left;height:100vh;box-sizing:border-box;border-right:1px solid #ccc;overflow-y:auto;"
    >
      <el-row v-for="item in items" :key="item.node.id" class="infinite-list-item">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" @click="clickItem(item)">
            <p class="info-title">{{item.node.nameWithOwner.split('/')[1]}}</p>
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
    <div
      style="width:80%;float:left;box-sizing:border-box;height:100vh;overflow-y:auto;padding:20px 40px;"
    >
      <vue-markdown :source="readme_contents"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { getStarItems } from "../../api/githubApi";

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      items: [],
      starItems: [],
      count: 0,
      nextUrl: "",
      lastUrl: "",
      readme_contents: null
    };
  },
  created() {
    this.initItems();
  },
  methods: {
    loadMore() {
      if (this.count == this.starItems.length - 1) {
        return;
      }
      this.count++;
      this.items = this.items.concat(this.starItems[this.count]);
      console.log(this.items);
    },
    initItems() {
      this.loadItems(this.$route.params.accountInfo.accessToken, "", 0);
    },
    loadItems(accessToken, cursor, index) {
      if (cursor == null) {
        this.items = this.starItems[0];
        return;
      }
      console.log(cursor)
      getStarItems(accessToken, cursor).then(data => {
        this.starItems.push(data.data.data.viewer.starredRepositories.edges);
        console.log(this.starItems)
        this.loadItems(
          accessToken,
          data.data.data.viewer.starredRepositories.pageInfo.endCursor,
          index++
        );
      });
    },
    clickItem(item) {
      console.log(item);
      this.getReadmeInfo(item.owner.login, item.name).then(data => {
        this.readme_contents = data;
      });
    },
    async getReadmeInfo(owner, repo) {
      let { data } = await this.$Request_get(
        "https://api.github.com/repos/" + owner + "/" + repo + "/readme"
      );
      data = await this.getReadme(data.download_url);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    },
    async getReadme(readmeUrl) {
      let { data } = await this.$Request_get(readmeUrl);
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    }
  }
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
  border-bottom: 3px solid #fff;
  box-sizing: border-box;
  background: #fafafa;
  padding: 5px 15px 5px 20px;
}
.grid-content:hover {
  background: #f2f2f2;
}
.grid-content .info-title {
  color: #72c453;
  word-break: break-all;
}
.grid-content .info-description {
  color: #222;
  word-break: break-all;
  font-size: 12px;
}
.grid-content .info-handler-col {
  margin: 5px 0;
  font-size: 12px;
  color: #666;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>