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
      <vue-markdown :source="readme_content"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
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
      items: [],
      starItems: [],
      count: 0,
      nextUrl: "",
      lastUrl: "",
      readme_content: ""
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
      this.items = this.items.concat(this.starItems[this.count]);
      this.count++;
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
      getStarItems(accessToken, cursor).then(data => {
        if (data.data.data.viewer.starredRepositories.edges.length > 0) {
          this.starItems.push(data.data.data.viewer.starredRepositories.edges);
        }
        this.loadItems(
          accessToken,
          data.data.data.viewer.starredRepositories.pageInfo.endCursor,
          index++
        );
      });
    },
    clickItem(item) {
      let nameWithOwner = item.node.nameWithOwner.split("/");
      this.getReadmeInfo(nameWithOwner[0], nameWithOwner[1]).then(data => {
        this.readme_content = data;
      });
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
