import Vue from "vue";
import Vuex from "vuex";
import { saveAs } from "file-saver";

Vue.use(Vuex);

interface Todo {
  name: string;
  done: boolean;
}

interface Note {
  name: string;
  todos: Todo[];
}

interface HistoryItem {
  notes: Note[];
  selectedNoteIndex: number;
}

interface State {
  notes: Note[];
  selectedNoteIndex: number;
  history: HistoryItem[];
  undoStep: number;
}

function saveToLocalStorage(state: State) {
  localStorage.setItem("data", JSON.stringify(state));
}

function unshiftHistory(state: State) {
  state.history.unshift({
    notes: JSON.parse(JSON.stringify(state.notes)),
    selectedNoteIndex: state.selectedNoteIndex,
  });
  state.history.length > 50 && state.history.pop();
  state.undoStep = 0;
  saveToLocalStorage(state);
}

function findClosestChar(
  string: string,
  chars: string[],
  start: number
): { char: string; index: number } {
  for (let i = start; i < string.length; i++) {
    const char = chars.find((char) => char == string[i]);
    if (char) return { char, index: i };
  }
  return { char: "", index: -1 };
}

function notesFromText(text: string): Note[] {
  let pointer = 0;
  const notes: Note[] = [];

  // parse notes while "#"" can be found after the pointer
  let noteDelimiterIndex = text.indexOf("#", pointer);
  while (noteDelimiterIndex != -1) {
    const noteNameEndIndex = text.indexOf("\n", noteDelimiterIndex + 1);
    const noteName = text
      .substring(noteDelimiterIndex + 1, noteNameEndIndex)
      .trim();
    pointer = noteNameEndIndex != -1 ? noteNameEndIndex + 1 : text.length - 1;
    if (noteName.length) {
      // note name is good
      // parse note's todos while "+" or "-" is closer to the pointer than "#"
      const todos: Todo[] = [];
      let { char: closestDelimiter, index: closestDelimiterIndex } =
        findClosestChar(text, ["+", "-", "#"], pointer);
      while (closestDelimiter && closestDelimiter != "#") {
        const todoNameEndIndex = text.indexOf("\n", closestDelimiterIndex + 1);
        const todoName = text
          .substring(closestDelimiterIndex + 1, todoNameEndIndex)
          .trim();
        pointer =
          todoNameEndIndex != -1 ? todoNameEndIndex + 1 : text.length - 1;
        // push if todo name is good
        todoName.length &&
          todos.push({ name: todoName, done: closestDelimiter == "+" });
        // check if todo is left
        ({ char: closestDelimiter, index: closestDelimiterIndex } =
          findClosestChar(text, ["+", "-", "#"], pointer));
      }
      notes.push({ name: noteName, todos });
    }
    // check if "#" is left
    noteDelimiterIndex = text.indexOf("#", pointer);
  }

  return notes;
}

let initialState;
try {
  initialState = JSON.parse(localStorage.getItem("data") || "");
} catch {
  initialState = {
    notes: [],
    selectedNoteIndex: -1,
    history: [
      {
        notes: [],
        selectedNoteIndex: -1,
      },
    ],
    undoStep: 0,
  };
}

export default new Vuex.Store<State>({
  state: initialState,
  mutations: {
    newNote(state) {
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
    deleteNote(state) {
      state.notes.splice(state.selectedNoteIndex, 1);
      state.selectedNoteIndex = -1;
      unshiftHistory(state);
    },
    newTodo(state) {
      state.notes[state.selectedNoteIndex].todos.push({
        name: "Todo " + (state.notes[state.selectedNoteIndex].todos.length + 1),
        done: false,
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
      state.notes[state.selectedNoteIndex].todos[todoIndex].done =
        !state.notes[state.selectedNoteIndex].todos[todoIndex].done;
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
      saveToLocalStorage(state);
    },
    redo(state) {
      state.undoStep--;
      state.notes = state.history[state.undoStep].notes;
      state.selectedNoteIndex = state.history[state.undoStep].selectedNoteIndex;
      saveToLocalStorage(state);
    },
    loadFromFile(state) {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.onchange = () => {
        const reader = new FileReader();
        reader.onload = () => {
          state.notes = notesFromText(reader.result as string);
          state.selectedNoteIndex = -1;
          unshiftHistory(state);
        };
        fileInput.files?.length && reader.readAsText(fileInput.files[0]);
      };
      fileInput.click();
      unshiftHistory(state);
    },
    saveToFile(state) {
      let formattedExport = "";
      state.notes.forEach((note) => {
        formattedExport += `# ${note.name}\n`;
        note.todos.forEach((todo) => {
          formattedExport += `${todo.done ? "+" : "-"} ${todo.name}\n`;
        });
        formattedExport += "\n";
      });
      saveAs(
        new Blob([formattedExport], { type: "text/plain;charset=utf-8" }),
        "todo-notes.txt"
      );
    },
    clear(state) {
      localStorage.removeItem("data");
      state.notes = [];
      state.selectedNoteIndex = -1;
      state.history = [{ notes: [], selectedNoteIndex: -1 }];
      state.undoStep = 0;
    },
  },
  getters: {
    allNotes: (state): Note[] => state.notes,
    selectedNoteIndex: (state): number => state.selectedNoteIndex,
    selectedNote: (state): Note | undefined =>
      state.selectedNoteIndex >= 0
        ? state.notes[state.selectedNoteIndex]
        : undefined,
    historyAvailability(state) {
      return {
        undo: state.undoStep < state.history.length - 1,
        redo: state.undoStep > 0,
      };
    },
  },
});
