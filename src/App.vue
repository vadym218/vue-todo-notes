<template>
  <v-app>
    <v-main>
      <div id="grid">
        <notes />
        <todos />
        <actions />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Actions from "./components/Actions.vue";
import Notes from "./components/Notes.vue";
import Todos from "./components/Todos.vue";

export default Vue.extend({
  name: "App",

  components: {
    Notes,
    Actions,
    Todos,
  },
});
</script>

<style lang="scss">
html {
  overflow: overlay;

  &::-webkit-scrollbar-thumb {
    border-radius: 4px 4px 0 0;
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 4px 0 0 4px;

  &:hover {
    background-color: #bbb;
  }
}

::-webkit-scrollbar-track {
  background: transparent;
}

.v-main {
  min-width: 350px;
  font-family: "Montserrat";
  padding: 0px 25px 25px 25px !important;
  background-color: #eee;
  align-items: center;
}

#grid {
  box-sizing: border-box;
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template:
    "a b" 1fr
    "c c" auto
    / 1fr 1fr;
  gap: 25px;

  @media (max-width: 1000px) {
    grid-template:
      "a"
      "b"
      "c";
    gap: 0;

    > :last-child {
      margin-top: 25px;
    }
  }
}

.page {
  display: flex;
  flex-direction: column;

  h1 {
    margin: 25px 0;
    font-weight: 900;
    color: #777;
  }

  > div {
    background-color: #fff;
    box-shadow: 0 1px 2px 1px #ddd, 0 0 1px #eee;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    .scrollable {
      padding: 12.5px;
      display: flex;
      flex-direction: column;
      overflow: overlay;

      > * {
        margin: 12.5px;
      }
    }

    .new-item {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
}

.v-dialog {
  font-family: "Montserrat";
  box-shadow: none;
  overflow: visible;
}
</style>
