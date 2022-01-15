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
  selectedNote: number,
  history: Note[],
  historyStep: number
}

export default new Vuex.Store<State>({
  state: {
    notes: [],
    selectedNote: -1,
    history: [],
    historyStep: 0,
  },
  mutations: {
    newNote(state) {
      state.notes.unshift({
        name: "New Note",
        todos: []
      })
    },
    setSelectedNote(state, selectedNote) {
      state.selectedNote = selectedNote;
    },
    deleteNote(state) {
      state.notes.splice(state.selectedNote, 1);
      state.selectedNote = -1;
    },/*
    updateNotes(state, notes) {
      state.notes = notes;
    },
    pushHistory() {

    },
    historyBack() {

    },
    historyForward() {

    }*/
  },
  getters: {
    allNotes: (state): Note[] => state.notes,
    selectedNote(state): number { return state.selectedNote},
    allTodos: (state): Todo[] => state.selectedNote > 0 ? state.notes[state.selectedNote].todos : []
  }
});
