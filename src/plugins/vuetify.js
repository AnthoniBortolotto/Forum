import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#002884",
        secondary: "#757ce8",
        accent: "#4a148c",
        error: "#e53935",
      },
    },
  },
});
