<template>
  <v-app>
    <v-main>
      <v-container fill-height class="px-6">
        <v-container id="layout" class="pa-0">
          <Notes />
          <Todos />
        </v-container>
      </v-container>
    </v-main>
    <v-footer>
      <v-container>
        <Actions />
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Actions from "./components/Actions.vue";
import Notes from "./components/Notes.vue";
import Todos from "./components/Todos.vue";

export default {
  components: {
    Notes,
    Todos,
    Actions,
  },
};
</script>

<style lang="scss">
* {
  font-family: "Montserrat";
}

html {
  overflow: hidden;
}

html ::-webkit-scrollbar-thumb {
  border-radius: 4px 4px 0 0;
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

::-webkit-scrollbar,
.v-main,
.v-footer {
  background-color: #eee !important;
}

.container {
  max-width: 1400px;
}

#layout {
  display: flex;
  gap: 24px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > h1 {
      font-size: 28px;
      margin-bottom: 16px;
      font-weight: 900;
      color: #777;
    }

    & > div {
      background-color: #fff;
      box-shadow:
        0 1px 2px 1px #ddd,
        0 0 1px #eee;
      border-radius: 4px;
      display: flex;
      flex-direction: column;

      .hint {
        color: #999;
        font-size: 18px;
        display: block;
        text-align: center;
        margin: 24px;
      }

      .pane {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        overflow: overlay;

        .v-text-field {
          padding-top: 0;
          margin-top: 0;
          font-size: 24px;
        }
      }

      .add-button {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
}
</style>
