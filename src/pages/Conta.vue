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
    return {
      criarConta: false,
    };
  },
  created() {
    if (window.location.href === "https://localhost:8080/signin") {
      this.criarConta = true;
    }
  },
  mounted() {
    console.log(this.$cookies.get("sessaoWorldForum"));
    this.$store.commit("checarLogin", this.$cookies.get("sessaoWorldForum"));
  },
  computed: {
    getLogado() {
      return this.$store.state.logado;
    },
  },
});
</script>
