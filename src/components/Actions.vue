<template>
  <div id="container">
    <v-btn large icon>
      <v-icon color="#888">mdi-undo</v-icon>
    </v-btn>
    <v-btn large icon>
      <v-icon color="#888">mdi-redo</v-icon>
    </v-btn>
    <v-btn large text rounded color="#888">Import</v-btn>
    <v-btn large text rounded color="#888">Export</v-btn>
  </div>
</template>

<script lang="ts">
export default {

}
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  justify-content: center;
  grid-area: c;

  >* {
    margin: 0 5px;
  }
}
</style>
