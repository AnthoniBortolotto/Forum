<template>
  <div class="home">
    <h3 class="text-center">Mensagens no fórum</h3>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
          lg="4"
          sm="12"
          v-for="(post, index) in obterPostagens"
          :key="index"
        >
          <v-card class="" outlined>
            <v-card-title class="text-center">{{ post.titulo }}</v-card-title>
            <v-card-subtitle>{{ post.autorNome }}</v-card-subtitle>
            <v-card-text class="black--text">{{ post.texto }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import store from "../store";

export default Vue.extend({
  name: "Home",
  components: {},
  computed: {
    obterPostagens() {
      return store.state.Postagens.reverse();
    },
  },
});
</script>
