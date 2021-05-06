<template>
  <div class="home">
    <h3>Mensagens no fórum</h3>
    <v-card v-for="(post, index) in obterPostagens" :key="index">
        <v-card-title >{{post.titulo}}</v-card-title>
        <v-card-text>{{post.texto}}</v-card-text>
    </v-card>
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
    obterPostagens(){
       return store.state.Postagens.reverse();
    }
  }

});
</script>
