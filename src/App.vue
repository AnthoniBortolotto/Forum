<template>
  <v-app>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title class="justify-space-between text-center"
          >Forum</v-toolbar-title
        >
        <template v-slot:extension>
          <v-tabs v-model="abaAtual" right fixed-tabs>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="(aba, index) in abas" @click="atualizarAba(aba.rota)" :key="index">
              {{ aba.nome }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="abaAtual">
        <v-tab-item :key="0">
          <Home />
        </v-tab-item>
        <v-tab-item :key="1">
          <Adicionar />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-main> </v-main>
    <v-footer color="secondary" class="d-flex justify-center mb-6">
      {{ new Date().getFullYear() }} | Forum
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import Home from "./pages/Home.vue";
import Adicionar from "./pages/Adicionar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Home,
    Adicionar,
  },
  data: function () {
    return {
      abaAtual: 0,
      abas: [
        {
          nome: "Home",
          rota: "/",
        },
        {
          nome: "Adicionar",
          rota: "/adicionar",
        },
      ],
    };
  },
  mounted() {
    if(window.location.href === 'http://localhost:8080/adicionar'){
        this.abaAtual = 1
    }
    else{
        this.abaAtual = 0
    }
  },
  methods: {
    atualizarAba: function (rota) {
        this.$router.push({ path: rota})
      }
    }
  });
</script>