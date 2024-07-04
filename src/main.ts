import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import store from "./store";

Vue.use(Vuetify);

const vuetify = new Vuetify();

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
