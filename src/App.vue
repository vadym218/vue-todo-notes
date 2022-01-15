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
import Vue from "vue"
import Actions from "./components/Actions.vue"
import Notes from "./components/Notes.vue"
import Todos from "./components/Todos.vue"

export default Vue.extend({
  name: "App",

  components: {
    Notes,
    Actions,
    Todos
  }
})
</script>

<style lang="scss">
html {
  overflow: overlay;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(120, 120, 120, .5);
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

.v-main {
  min-width: 400px;
  font-family: 'Montserrat';
  padding: 0px 25px 25px 25px !important;
  background-color: #EEE;
  align-items: center;
}

#grid {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template: "a b" 1fr
                 "c c" auto
              / 1fr 1fr;
  gap: 25px;

  @media (max-width: 1000px) {
    grid-template: "a"
                   "b"
                   "c";
    gap: 0;

    >:last-child {
      margin-top: 25px;
    }
  }
}

h1 {
  margin: 25px 0;
  font-weight: 900;
  color: #777;
}

.page {
  display: flex;
  flex-direction: column;

  >div {
    background-color: #FFF;
    box-shadow: 0 1px 2px 1px #DDD, 0 0 1px #EEE;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  }
}
</style>