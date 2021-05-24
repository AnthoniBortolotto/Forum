<template>
  <v-app>
    <div class="login" v-if="!getLogado">
      <Login />
    </div>
    <div class="gerenciar" v-else>
      <Gerenciar />
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import Gerenciar from "../molecules/Gerenciar.vue";
import Login from "../molecules/Login.vue";

export default Vue.extend({
  components: { Login, Gerenciar },
  data: function () {
    return {};
  },
  mounted() {
    this.$store.commit(
      "checarLogin",
      this.$cookies.get("sessaoContaWorldForum")
    );
  },
  computed: {
    getLogado() {
      return this.$store.state.logado;
    },
  },
});
</script>
