<template>
  <v-app>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="justify-space-between text-center"
          >Forum</v-toolbar-title
        >
        <template v-slot:extension>
          <v-tabs :value.sync="abaStore" right fixed-tabs>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab
              v-for="(aba, index) in abas"
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
        <v-tab-item :key="1">
          <Adicionar />
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

export default Vue.extend({
  name: "App",
  components: {
    Home,
    Adicionar,
  },
  data: function () {
    return {
      abas: [
        {
          nome: "Home",
          rota: "/",
        },
        {
          nome: "Adicionar",
          rota: "/adicionar",
        },
        {
          nome: "Conta",
          rota: "/conta",
        },
      ],
    };
  },
  mounted() {
    if (window.location.href === "http://localhost:8080/adicionar")
      store.commit("mudarAba", 1);
    else store.commit("mudarAba", 0);
  },
  methods: {
    atualizarAba: function (rota) {
      this.$router.push({ path: rota });
      if (rota == "/") store.commit("mudarAba", 0);
      else store.commit("mudarAba", 1);
    },
  },
  computed: {
    abaStore() {
      return store.state.aba;
    },
  },
});
</script>
