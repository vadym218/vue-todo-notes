import { saveAs } from "file-saver";
import Vue from "vue";
import Vuex from "vuex";
import {
  markdownToNotes,
  saveToLocalStorage,
  stateToMarkdown,
  unshiftHistory,
} from "./helpers";
import type { State } from "./types";

Vue.use(Vuex);

const emptyHistoryEntry = {
  notes: [],
  selectedNoteIndex: -1,
};

const emptyState: State = {
  ...emptyHistoryEntry,
  history: [emptyHistoryEntry],
  undoStep: 0,
};

const data = localStorage.getItem("data");
const initialState = data && JSON.parse(data);

export default new Vuex.Store<State>({
  state: initialState ?? structuredClone(emptyState),

  getters: {
    allNotes: (state) => state.notes,

    selectedNoteIndex: (state) => state.selectedNoteIndex,

    selectedNote: (state) =>
      state.selectedNoteIndex >= 0
        ? state.notes[state.selectedNoteIndex]
        : undefined,

    historyAvailability: (state) => ({
      undo: state.undoStep < state.history.length - 1,
      redo: state.undoStep > 0,
    }),
  },

  mutations: {
    createNote(state) {
      state.notes.unshift({
        name: "Note " + (state.notes.length + 1),
        todos: [],
      });
      state.selectedNoteIndex = 0;
      unshiftHistory(state);
    },

    setSelectedNote(state, selectedNoteIndex) {
      state.selectedNoteIndex =
        state.selectedNoteIndex == selectedNoteIndex ? -1 : selectedNoteIndex;
      saveToLocalStorage(state);
    },

    setNoteName(state, noteName) {
      if (noteName) {
        state.notes[state.selectedNoteIndex].name = noteName;
        unshiftHistory(state);
      }
    },

    deleteNote(state) {
      state.notes.splice(state.selectedNoteIndex, 1);
      state.selectedNoteIndex = -1;
      unshiftHistory(state);
    },

    createTodo(state) {
      state.notes[state.selectedNoteIndex].todos.push({
        name: "Todo " + (state.notes[state.selectedNoteIndex].todos.length + 1),
        isDone: false,
      });
      unshiftHistory(state);
    },

    setTodoName(state, { todoIndex, todoName }) {
      if (todoName) {
        state.notes[state.selectedNoteIndex].todos[todoIndex].name = todoName;
        unshiftHistory(state);
      }
    },

    toggleTodo(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos[todoIndex].isDone =
        !state.notes[state.selectedNoteIndex].todos[todoIndex].isDone;
      unshiftHistory(state);
    },

    deleteTodo(state, todoIndex) {
      state.notes[state.selectedNoteIndex].todos.splice(todoIndex, 1);
      unshiftHistory(state);
    },

    undo(state) {
      state.undoStep += 1;

      const target = state.history[state.undoStep];
      state.notes = target.notes;
      state.selectedNoteIndex = target.selectedNoteIndex;

      saveToLocalStorage(state);
    },

    redo(state) {
      state.undoStep -= 1;

      const target = state.history[state.undoStep];
      state.notes = target.notes;
      state.selectedNoteIndex = target.selectedNoteIndex;

      saveToLocalStorage(state);
    },

    writeToFile(state) {
      const markdown = stateToMarkdown(state);

      const date = new Date();
      const month = date.toLocaleString("en-US", { month: "long" });
      const fileName = `todos-${month.toLowerCase()}-${date.getDate()}.md`;

      saveAs(
        new Blob([markdown], { type: "text/plain;charset=utf-8" }),
        fileName
      );
    },

    readFromFile(state) {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");

      fileInput.addEventListener("change", () => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result === "string") {
            state.notes = markdownToNotes(reader.result);
            state.selectedNoteIndex = -1;
            unshiftHistory(state);
          }
        });

        if (fileInput.files?.length) {
          reader.readAsText(fileInput.files[0]);
        }
      });

      fileInput.click();
    },

    clear(state) {
      for (const key in emptyState) {
        // @ts-expect-error correct
        state[key] = emptyState[key];
      }
      localStorage.removeItem("data");
    },
  },
});
