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

interface HistoryItem {
  notes: Note[],
  selectedNoteIndex: number
}

interface State {
  notes: Note[],
  selectedNoteIndex: number,
  history: HistoryItem[],
  undoStep: number
}

function saveToLocalStorage(state: State) {
  localStorage.setItem("data", JSON.stringify(state));
}

function unshiftHistory(state: State) {
  state.history.unshift({
    notes: JSON.parse(JSON.stringify(state.notes)),
    selectedNoteIndex: state.selectedNoteIndex
  });
  state.history.length > 50 && state.history.pop();
  saveToLocalStorage(state);
}

let initialState
try {
  initialState = JSON.parse(localStorage.getItem("data") || "");
} catch {
  initialState = {
    notes: [],
    selectedNoteIndex: -1,
    history: [{
      notes: [],
      selectedNoteIndex: -1
    }],
    undoStep: 0,
  };
}

export default new Vuex.Store<State>({
  state: initialState,
  mutations: {
    newNote(state) {
      state.notes.unshift({
        name: "Note " + (state.notes.length + 1),
        todos: []
      });
      state.selectedNoteIndex = 0;
      unshiftHistory(state);
    },
    setSelectedNote(state, selectedNoteIndex) {
      state.selectedNoteIndex = state.selectedNoteIndex == selectedNoteIndex ? -1 : selectedNoteIndex;
      saveToLocalStorage(state);
    },
    deleteNote(state) {
      state.notes.splice(state.selectedNoteIndex, 1);
      state.selectedNoteIndex = -1;
      unshiftHistory(state);
    },
    newTodo(state) {
      state.notes[state.selectedNoteIndex].todos.push({
        name: "Todo " + (state.notes[state.selectedNoteIndex].todos.length + 1),
        done: false
      });
      unshiftHistory(state);
    },
    updateNoteName(state, noteName) {
      if (noteName) {
        state.notes[state.selectedNoteIndex].name = noteName;
        unshiftHistory(state);
      }
    },
    updateTodoName(state, { todoIndex, todoName }) {
      if (todoName) {
        state.notes[state.selectedNoteIndex].todos[todoIndex].name = todoName;
        unshiftHistory(state);
      }
    },
    updateTodoStatus(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos[todoIndex].done = !state.notes[state.selectedNoteIndex].todos[todoIndex].done;
      unshiftHistory(state);
    },
    deleteTodo(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos.splice(todoIndex, 1);
      unshiftHistory(state);
    },
    undo(state) {
      state.undoStep++;
      state.notes = state.history[state.undoStep].notes;
      state.selectedNoteIndex = state.history[state.undoStep].selectedNoteIndex;
    },
    redo(state) {
      state.undoStep--;
      state.notes = state.history[state.undoStep].notes;
      state.selectedNoteIndex = state.history[state.undoStep].selectedNoteIndex;
    }
  },
  getters: {
    allNotes: (state): Note[] => state.notes,
    selectedNoteIndex: (state): number => state.selectedNoteIndex,
    selectedNote: (state): Note | undefined => state.selectedNoteIndex >= 0 ? state.notes[state.selectedNoteIndex] : undefined,
    historyAvailability(state) {
      return {
        undo: state.undoStep < state.history.length - 1,
        redo: state.undoStep > 0
      }
    }
  }
});
