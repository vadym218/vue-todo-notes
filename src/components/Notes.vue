<template>
  <div class="page">
    <h1>Notes</h1>
    <div>
      <v-btn-toggle
        :value="selectedNoteIndex"
        v-if="allNotes.length"
        class="scrollable"
      >
        <div class="note" v-for="(note, index) in allNotes" :key="index">
          <v-btn text :value="index" @click="setSelectedNote(index)">
            {{ note.name }}
          </v-btn>
          <v-btn
            @click="deleteNote"
            icon
            class="delete-note"
            v-if="index == selectedNoteIndex"
            ><v-icon color="#888">mdi-delete</v-icon></v-btn
          >
        </div>
      </v-btn-toggle>
      <p v-else id="greeting">
        hello there<br />
        let's make some notes
      </p>
      <v-btn x-large elevation="0" @click="newNote" class="new-item"
        >New Note</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";

export default Vue.extend({
  computed: mapGetters(["allNotes", "selectedNoteIndex"]),
  methods: mapMutations(["newNote", "setSelectedNote", "deleteNote"]),
});
</script>

<style lang="scss" scoped>
.page {
  grid-area: a;
}

.note {
  display: flex;

  .v-btn {
    &:first-of-type {
      flex: 1;
      justify-content: left;
      font-size: 28px;
      text-transform: none;
    }

    &::before {
      border-radius: 3px;
    }
  }

  .delete-note {
    margin-left: 12.5px;
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
