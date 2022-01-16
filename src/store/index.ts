import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface Todo {
  name: string,
  done: boolean
}

interface Note {
  name: string,
  todos: Todo[]
}

interface State {
  notes: Note[],
  selectedNoteIndex: number,
  history: Note[],
  historyStep: number
}

export default new Vuex.Store<State>({
  state: {
    notes: [],
    selectedNoteIndex: -1,
    history: [],
    historyStep: 0,
  },
  mutations: {
    newNote(state) {
      state.notes.unshift({
        name: "Note " + (state.notes.length + 1),
        todos: []
      });
      state.selectedNoteIndex = 0;
    },
    setSelectedNote(state, selectedNoteIndex) {
      state.selectedNoteIndex = selectedNoteIndex;
    },
    deleteNote(state) {
      state.notes.splice(state.selectedNoteIndex, 1);
      state.selectedNoteIndex = -1;
    },
    newTodo(state) {
      state.notes[state.selectedNoteIndex].todos.push({
        name: "Todo " + (state.notes[state.selectedNoteIndex].todos.length + 1),
        done: false
      });
    },
    updateNoteName(state, noteName) {
      if (noteName) state.notes[state.selectedNoteIndex].name = noteName;
    },
    updateTodoName(state, { todoIndex, todoName }) {
      if (todoName) state.notes[state.selectedNoteIndex].todos[todoIndex].name = todoName;
    },
    updateTodoStatus(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos[todoIndex].done = !state.notes[state.selectedNoteIndex].todos[todoIndex].done;
    },
    deleteTodo(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos.splice(todoIndex, 1);
    }
  },
  getters: {
    allNotes: (state): Note[] => state.notes,
    selectedNote: (state): Note | undefined => state.selectedNoteIndex >= 0 ? state.notes[state.selectedNoteIndex] : undefined
  }
});
