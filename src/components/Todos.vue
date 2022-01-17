<template>
  <div class="page">
    <h1>Todos</h1>
    <div>
      <div v-if="selectedNote" class="scrollable">
        <v-text-field
          :rules="[(value) => !!value || 'don\'t leave it empty']"
          hint="your note name here"
          :value="selectedNote.name"
          @blur="(e) => updateNoteName(e.target.value)"
          class="note-name"
        />
        <div
          v-for="(todo, index) in selectedNote.todos"
          :key="index"
          class="todo"
        >
          <v-checkbox
            :input-value="todo.done"
            :key="todo.done"
            @change="updateTodoStatus(index)"
            hide-details
            color="#888"
          />
          <v-text-field
            hide-details
            :class="{ done: todo.done }"
            :rules="[(value) => !!value || 'don\'t leave it empty']"
            hide-spin-buttons
            :value="todo.name"
            @blur="
              (e) =>
                updateTodoName({ todoIndex: index, todoName: e.target.value })
            "
          />
          <v-btn icon @click="deleteTodo(index)" class="delete-note"
            ><v-icon color="#888">mdi-close</v-icon></v-btn
          >
        </div>
        <p v-if="!selectedNote.todos.length" id="greeting">no todos yet</p>
      </div>
      <p v-else id="greeting">your todos will appear here</p>
      <v-btn
        v-if="selectedNote"
        x-large
        elevation="0"
        @click="newTodo"
        class="new-item"
        >New Todo</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";

export default Vue.extend({
  computed: mapGetters(["selectedNote"]),
  methods: mapMutations([
    "newTodo",
    "updateNoteName",
    "updateTodoName",
    "updateTodoStatus",
    "deleteTodo",
  ]),
});
</script>

<style lang="scss" scoped>
.page {
  grid-area: b;
}

.note-name {
  font-size: 28px;
}

.todo {
  display: flex;
  align-items: center;
  margin: 12.5px;

  .v-input {
    margin: 0;
    padding: 0;
  }

  .v-text-field {
    font-size: 24px;
    margin: 0 12.5px;

    &.done {
      opacity: 0.5;
      text-decoration: line-through !important;
    }
  }
}

#greeting {
  color: #999;
  font-size: 28px;
  display: block;
  text-align: center;
  margin: 25px;
}
</style>
