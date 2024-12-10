<template>
  <div>
    <h1>Todos</h1>

    <div>
      <p v-if="!selectedNote" class="hint">
        select a note to see assigned todos
      </p>

      <div v-else class="pane">
        <p v-if="!selectedNote.todos.length" class="hint">
          create the first todo for this note
        </p>

        <div
          v-for="({ isDone, name }, index) in selectedNote.todos"
          :key="index"
          class="todo"
        >
          <div @keydown="(e) => e.key === 'Enter' && toggleTodo(index)">
            <v-checkbox
              :key="name"
              hide-details
              color="#888"
              :input-value="isDone"
              @change="toggleTodo(index)"
            />
          </div>

          <v-text-field
            hide-details
            hide-spin-buttons
            color="#222"
            :class="{ isDone }"
            :value="name"
            :rules="[(value) => !!value || 'don\'t leave it empty']"
            @blur="(e) => setTodoName(index, e)"
            @keydown="(e) => e.key === 'Enter' && setTodoName(index, e)"
          />

          <v-btn icon @click="deleteTodo(index)" class="delete-note"
            ><v-icon color="#888">mdi-close</v-icon></v-btn
          >
        </div>
      </div>

      <v-btn
        v-if="selectedNote"
        x-large
        elevation="0"
        @click="createTodo"
        class="add-button"
        >Add Todo</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["selectedNote"]),

  methods: {
    ...mapMutations(["createTodo", "toggleTodo", "deleteTodo"]),

    setTodoName(todoIndex: number, e: Event) {
      this.$store.commit("setTodoName", {
        todoIndex,
        todoName: (e.target as HTMLInputElement).value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  align-items: center;

  .v-input {
    margin: 0;
    padding: 0;
  }

  .v-text-field {
    font-size: 24px;
    margin: 0 12.5px;

    &.isDone {
      opacity: 0.5;
      text-decoration: line-through !important;
    }
  }
}
</style>
