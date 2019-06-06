<template>
  <div>
    <div style="width:30%;float:left">
      <el-row v-for="(item, i) in items" :key="item.id">
        <el-col>
          <div class="grid-content bg-purple-dark" @click="clickItem(item)"></div>
          <div style="width:100%;height:1px;backgroundColor:white;"></div>
        </el-col>
      </el-row>
    </div>
    <div style="width:70%;height:100%;float:left"><webview ref="wbShow" style="display:inline-flex;width:100%;height:100%"/></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.getStars();
  },
  methods: {
    getStars() {
      this.$Request_get(
        "https://api.github.com/users/Darksknight/starred"
      ).then(({ headers, data }) => {
        this.items = data;
      });
    },
    clickItem(item) {
      this.$refs.wbShow.src = item.html_url + "/blob/master/README.md";
    }
  }
};
</script>

<style>
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
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>