import { Note, State, Todo } from "./types";

export const saveToLocalStorage = (state: State) => {
  localStorage.setItem("data", JSON.stringify(state));
};

export const unshiftHistory = (state: State) => {
  state.history.unshift({
    notes: structuredClone(state.notes),
    selectedNoteIndex: state.selectedNoteIndex,
  });

  if (state.history.length > 50) {
    state.history.pop();
  }

  state.undoStep = 0;

  saveToLocalStorage(state);
};

export const stateToMarkdown = (state: State) => {
  let markdown = "";

  state.notes.forEach((note) => {
    markdown += `# ${note.name}\n`;

    note.todos.forEach((todo) => {
      markdown += `- [${todo.isDone ? "x" : " "}] ${todo.name}\n`;
    });

    markdown += "\n";
  });

  return markdown;
};

const findNextIndex = (str: string, query: string, pointer: number) =>
  str.indexOf(query, pointer + query.length);

enum Delimiter {
  Note = "#",
  InProgress = "- [ ]",
  Done = "- [x]",
}

const findClosest = (str: string, pointer: number) => {};

export const markdownToNotes = (markdown: string) => {
  const notes: Note[] = [];

  const pointer = findNextIndex(markdown, "#", 0);
  let isNoteName = true;
  let isDone = false;

  let noteName = "";
  let todos: Todo[] = [];

  while (pointer !== -1) {
    let newPointer = findNextIndex(markdown, "#", pointer);

    // Found a new note
    if (newPointer) {
      const name = markdown.substring(pointer, newPointer - 1).trim();

      if (isNoteName) {
        noteName = name;
      } else {
        todos.push({ name, isDone });
        isNoteName = true;
      }

      notes.push({
        name: noteName,
        todos,
      });

      todos = [];

      continue;
    }

    newPointer = findNextIndex(markdown, "- [ ]", pointer);

    // Found a todo in progress
    if (newPointer) {
      isDone = false;
    }
  }

  return notes;
};
