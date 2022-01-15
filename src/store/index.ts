import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: {},
    history: [],
    historyStep: 0,
  },
  mutations: {
    /*newNote(state) {

    },*/
    updateNotes(state, notes) {
      state.notes = notes;
    },
    /*pushHistory() {

    },
    historyBack() {

    },
    historyForward() {

    }*/
  },
});
