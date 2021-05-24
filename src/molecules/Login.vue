<template>
  <v-app>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="campoConta"
            :rules="regra"
            label="Email"
          ></v-text-field>
          <v-text-field v-model="campoSenha" label="Senha"></v-text-field>
          <v-btn v-on:click="handlerClick()" color="accent" :disabled="false"
            >Adicionar</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-text
        >Não possui uma conta?
        <a class="text-decoration-underline">Faça uma aqui</a></v-card-text
      >
    </v-card>
  </v-app>
</template>

<script>
import Vue from "vue";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line no-unused-vars
import Conta from "../atoms/Conta";

export default Vue.extend({
  data: function () {
    return {
      campoConta: String,
      campoSenha: String,
      mostrarErro: false,
      regra: [() => !this.mostrarErro || "Verifique os dados digitados"],
    };
  },
  mounted() {
    this.campoConta = "";
    this.campoSenha = "";
  },
  methods: {
    handlerClick() {
      let conta = this.$store.getters.checarCampoConta(
        this.campoConta,
        this.campoSenha
      );
      if (conta === undefined) {
        this.mostrarErro = true;
      } else {
        this.mostrarErro = false;
        let hash = uuidv4();
        while (this.$store.getters.checarSessaoAtiva(hash) === true)
          hash = uuidv4();
        this.$store.commit("adicionarSessao", hash);
        this.$cookies.set("sessaoWorldForum", hash, "1h");
        this.$store.commit("checarLogin", hash);
        this.$store.commit("mudarAba", 0);
      }
    },
  },
  computed: {},
});
</script>
