<template>
  <div id="wrapper">
    <button @click="test">click me</button>
    <div>{{mainCount}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      mainCount:state => state.Counter.main
    })
  },
  methods: {
    test() {
      this.$store.dispatch("someAsyncTask");
    }
  }
};
</script>