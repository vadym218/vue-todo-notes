<template>
  <div id="container">
    <v-btn :disabled="!historyAvailability.undo" @click="undo" large icon>
      <v-icon color="#888">mdi-undo</v-icon>
    </v-btn>
    <v-btn :disabled="!historyAvailability.redo" @click="redo" large icon>
      <v-icon color="#888">mdi-redo</v-icon>
    </v-btn>
    <v-btn large text rounded color="#888" @click="loadFromFile">Import</v-btn>
    <v-btn large text rounded color="#888" @click="saveToFile">Export</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default Vue.extend({
  computed: mapGetters(["historyAvailability"]),
  methods: mapMutations(["undo", "redo", "loadFromFile", "saveToFile"]),
});
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  grid-area: c;

  > * {
    margin: 0 5px;
  }
}
</style>
