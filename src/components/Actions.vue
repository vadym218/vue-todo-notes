<template>
  <div>
    <v-row class="action-row" justify="center">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            rounded
            color="#888"
            :disabled="!historyAvailability.undo"
            @click="undo"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon size="24">mdi-undo</v-icon>
          </v-btn>
        </template>
        <span>Undo (Ctrl + Z)</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            rounded
            color="#888"
            :disabled="!historyAvailability.redo"
            @click="redo"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon size="24">mdi-redo</v-icon>
          </v-btn>
        </template>
        <span>Redo (Ctrl + Shift + Y)</span>
      </v-tooltip>

      <v-tooltip v-if="$vuetify.breakpoint.mdAndDown" top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            rounded
            color="#888"
            @click="writeToFile"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon size="24">mdi-export</v-icon>
          </v-btn>
        </template>
        <span>Export</span>
      </v-tooltip>
      <v-btn v-else text rounded color="#888" @click="writeToFile">
        Export
      </v-btn>

      <v-tooltip top v-if="$vuetify.breakpoint.mdAndDown">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            rounded
            color="#888"
            @click="readFromFile"
            v-on="on"
            v-bind="attrs"
          >
            <v-icon size="24">mdi-import</v-icon>
          </v-btn>
        </template>
        <span>Import</span>
      </v-tooltip>
      <v-btn v-else text rounded color="#888" @click="readFromFile">
        Import
      </v-btn>

      <v-dialog max-width="500" v-model="clearDialog" overlay-opacity="0.1">
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-tooltip v-if="$vuetify.breakpoint.mdAndDown" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text rounded color="#888" v-on="on" v-bind="attrs">
                  <v-icon size="24">mdi-nuke</v-icon>
                </v-btn>
              </template>
              <span>Clear</span>
            </v-tooltip>
            <v-btn v-else text rounded color="#888">Clear</v-btn>
          </div>
        </template>

        <div class="dialog">
          <p>Delete all notes and history?</p>

          <div class="d-flex">
            <v-btn x-large elevation="0" @click="clearDialog = false">
              No
            </v-btn>

            <v-btn
              x-large
              elevation="0"
              @click="
                clear();
                clearDialog = false;
              "
            >
              Yes
            </v-btn>
          </div>
        </div>
      </v-dialog>
    </v-row>

    <v-row class="action-row py-4" justify="center">
      <v-btn
        class="author"
        rounded
        text
        href="https://linkedin.com/in/vrepetskyi/"
        target="blank"
      >
        Vadym Repetskyi
      </v-btn>

      <span class="px-4">2022 &ndash; {{ new Date().getFullYear() }}</span>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    clearDialog: false,
  }),
  computed: mapGetters(["historyAvailability"]),
  methods: {
    ...mapMutations(["undo", "redo", "writeToFile", "readFromFile", "clear"]),
    handleKeyDown(e: KeyboardEvent) {
      if (!e.ctrlKey) {
        return;
      }

      if (e.key === "z") {
        this.historyAvailability.undo && this.undo();
      } else if (["Z", "y"].includes(e.key)) {
        this.historyAvailability.redo && this.redo();
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  background-color: #eee;

  p {
    font-size: 24px;
    text-align: center;
    padding: 24px;
    margin: 0;
  }

  & > div > .v-btn {
    flex: 1;
    border-radius: 0;

    &:last-of-type::before {
      background-color: #f00;
    }
  }
}

.action-row {
  display: flex;
  align-items: center;
  color: #888;
}

.author {
  font-size: 16px;
  color: #888;
  text-transform: none;
}
</style>
