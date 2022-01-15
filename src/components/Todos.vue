<template>
  <div class="page">
    <h1>Todos</h1>
    <div>
      <div v-if="selectedNote >= 0">{{ allTodos }}</div>
      <p v-else id="greeting">your todos will appear there</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: mapGetters(["selectedNote", "allTodos"])
});
</script>

<style lang="scss" scoped>
.page {
  grid-area: b;
}

#greeting {
  color: #999;
  font-size: 28px;
  display: block;
  text-align: center;
  margin: 25px;
}
</style>
