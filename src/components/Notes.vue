<template>
  <div>
    <h1>Notes</h1>

    <div>
      <p v-if="!allNotes.length" class="hint">
        hello there<br />
        let's make some notes
      </p>

      <div v-else class="pane">
        <div class="note" v-for="(note, index) in allNotes" :key="index">
          <v-btn
            v-if="index !== selectedNoteIndex"
            text
            :value="index"
            @click="setSelectedNote(index)"
          >
            {{ note.name }}
          </v-btn>

          <div v-else class="editable">
            <v-text-field
            disabled
              hide-details
              hide-spin-buttons
              color="#222"
              :value="selectedNote.name"
              :rules="[(value) => !!value || 'don\'t leave it empty']"
              @blur="setNoteName"
              @keydown="(e) => e.key === 'Enter' && setNoteName(e)"
            />

            <v-btn icon @click="deleteNote">
              <v-icon color="#888">mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <v-btn x-large elevation="0" class="add-button" @click="createNote">
        Add Note
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters(["allNotes", "selectedNote", "selectedNoteIndex"]),

  methods: {
    ...mapMutations(["createNote", "setSelectedNote", "deleteNote"]),

    setNoteName(e: Event) {
      this.$store.commit("setNoteName", (e.target as HTMLInputElement).value);
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  display: flex;

  & > * {
    flex: 1;
  }

  .v-btn {
    &:first-of-type {
      justify-content: left;
      font-size: 24px;
      text-transform: none;
    }

    &::before {
      border-radius: 3px;
    }
  }

  .editable {
    display: flex;
    gap: 24px;

    .v-text-field {
      flex: 1;
    }
  }
}
</style>
