<template>
  <div id="container">
    <div id="actions">
      <v-btn :disabled="!historyAvailability.undo" @click="undo" icon>
        <v-icon size="24" color="#888">mdi-undo</v-icon>
      </v-btn>
      <v-btn :disabled="!historyAvailability.redo" @click="redo" icon>
        <v-icon size="24" color="#888">mdi-redo</v-icon>
      </v-btn>
      <v-btn text rounded color="#888" @click="readFromFile">Import</v-btn>
      <v-btn text rounded color="#888" @click="writeToFile">Export</v-btn>
      <v-dialog max-width="500" v-model="clearDialog" overlay-opacity=".1">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text rounded color="#888" v-bind="attrs" v-on="on"
            >Clear</v-btn
          >
        </template>
        <div class="page">
          <div>
            <p>Delete all notes and history?</p>
            <div class="d-flex">
              <v-btn
                x-large
                elevation="0"
                @click="clearDialog = false"
                id="clear-no"
                >No</v-btn
              >
              <v-btn
                x-large
                elevation="0"
                @click="
                  clear();
                  clearDialog = false;
                "
                id="clear-yes"
                >Yes</v-btn
              >
            </div>
          </div>
        </div>
      </v-dialog>
    </div>
    <span id="author"
      >made by
      <v-btn
        rounded
        text
        href="https://linkedin.com/in/vrepetskyi/"
        target="blank"
        >Vadym Repetskyi</v-btn
      ></span
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      clearDialog: false,
    };
  },
  computed: mapGetters(["historyAvailability"]),
  methods: mapMutations([
    "undo",
    "redo",
    "writeToFile",
    "readFromFile",
    "clear",
  ]),
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: c;
}

#actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > * {
    margin: 0 4px;
  }
}

.page {
  p {
    font-size: 24px;
    text-align: center;
    margin: 25px;
  }

  > div {
    box-shadow:
      0 1px 2px 1px #fbb,
      0 0 1px #fcc;
  }

  #clear-no {
    flex: 1;
    border-radius: 0 0 0 4px;
  }

  #clear-yes {
    flex: 1;
    border-radius: 0 0 4px 0;
  }
}

#author {
  display: flex;
  margin-top: 25px;
  align-items: center;
  color: #888;

  .v-btn {
    font-size: 16px;
    color: #888;
    margin-left: 12.5px;
    padding: 12.5px;
    text-transform: none;
  }
}
</style>
