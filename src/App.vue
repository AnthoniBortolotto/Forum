<template>
  <v-app>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-container class="justify-space-between">
          <v-toolbar-title class="text-center">Forum</v-toolbar-title>
          <v-toolbar-items class="justify-end"
            ><v-btn
              v-if="this.$store.isAuthorized"
              class="pa-2"
              color="secondary"
              @click="loginClick()"
              >Login</v-btn
            >
            <v-btn v-else class="pa-2" color="secondary" @click="logoutClick()"
              >Logout</v-btn
            ></v-toolbar-items
          >
        </v-container>
        <template v-slot:extension>
          <v-tabs :value.sync="abaStore" right fixed-tabs>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab
              v-for="(aba, index) in getAbas"
              @click="atualizarAba(aba.rota)"
              :key="index"
            >
              {{ aba.nome }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items :value.sync="abaStore">
        <v-tab-item :key="0">
          <Home />
        </v-tab-item>
        <v-tab-item :key="1" :disabled="getLogado">
          <Adicionar />
        </v-tab-item>
        <v-tab-item :key="2">
          <Conta />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-main></v-main>
    <v-footer color="secondary" class="d-flex justify-center mb-6">
      {{ new Date().getFullYear() }} | Forum
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import Home from "./pages/Home.vue";
import Adicionar from "./pages/Adicionar.vue";
import store from "./store/index";
import Conta from "./pages/Conta.vue";

export default Vue.extend({
  name: "App",
  components: {
    Home,
    Adicionar,
    Conta,
  },
  mounted() {
    if (window.location.href === "https://localhost:8080/adicionar")
      store.commit("mudarAba", 1);
    else if (window.location.href === "https://localhost:8080/")
      store.commit("mudarAba", 0);
    else store.commit("mudarAba", 2);
    console.log(this.$cookies.get("sessaoWorldForum"));
    this.$store.commit("checarLogin", this.$cookies.get("sessaoWorldForum"));
  },
  methods: {
    atualizarAba: function (rota) {
      if (rota == "/") {
        store.commit("mudarAba", 0);
        if (window.location.href !== "https://localhost:8080/")
          this.$router.push({ path: rota });
      } else if (rota == "/adicionar" && store.state.logado) {
        store.commit("mudarAba", 1);
        if (window.location.href !== "https://localhost:8080/adicionar")
          this.$router.push({ path: rota });
      } else {
        store.commit("mudarAba", 2);
        if (window.location.href !== "https://localhost:8080/conta")
          this.$router.push({ path: "/conta" });
      }
    },
    loginClick() {
      store.dispatch("auth0Login");
    },
    logoutClick() {
      store.dispatch("auth0Logout");
    },
  },
  computed: {
    abaStore() {
      return store.state.abaAtiva;
    },
    getAbas() {
      return store.state.abas;
    },
    getLogado() {
      return store.state.logado;
    },
  },
});
</script>
