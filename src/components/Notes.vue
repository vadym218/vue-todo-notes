<template>
  <div class="page">
    <h1>Notes</h1>
    <div>
      <v-btn-toggle @change="handleToggle" v-model="selectedNote" v-if="allNotes.length" class="scrollable">
        <div class="note" v-for="(note, index) in allNotes" :key="index">
          <v-btn text :value="index">
            {{ note.name }}
          </v-btn>
          <v-btn @mouseup="deleteNote" icon class="delete-note" v-if="index == selectedNote"><v-icon color="#888">mdi-delete</v-icon></v-btn>
        </div>
      </v-btn-toggle>
      <p v-else id="greeting">
        hello there<br />
        let's make some notes
      </p>
      <v-btn x-large elevation="0" @click="newNote" id="new-note">New Note</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      selectedNote: undefined
    }
  },
  computed: mapGetters(["allNotes"]),
  methods: {
    ...mapMutations(["newNote", "setSelectedNote", "deleteNote"]),
    handleToggle() {
      this.setSelectedNote(this.selectedNote);
    }
  }
});
</script>

<style lang="scss" scoped>
.page {
  grid-area: a;
}

.scrollable {
  margin-top: 25px;
  padding: 0 12.5px 12.5px 12.5px;

  &::-webkit-scrollbar-track {
    margin-bottom: 25px;
  }
}

.note {
  display: flex;
  margin: 12.5px;

  &:first-of-type {
    margin-top: 0;
  }

  .v-btn {
    border-radius: 4px !important;
    border: 1px solid black !important;

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

#new-note {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
