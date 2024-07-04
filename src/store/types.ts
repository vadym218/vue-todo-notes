export type Todo = {
  name: string;
  isDone: boolean;
};

export type Note = {
  name: string;
  todos: Todo[];
};

export type HistoryEntry = {
  notes: Note[];
  selectedNoteIndex: number;
};

export type State = HistoryEntry & {
  history: HistoryEntry[];
  undoStep: number;
};
