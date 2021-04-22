<template>
  <div class="adicionar">
    <v-form v-model="valid">
      <v-container>
        <v-col>
          <v-text-field
            v-model="titulo"
            :rules="regrasTitulo"
            :counter="20"
            label="Título"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="mensagem"
            :rules="regrasMsg"
            :counter="200"
            label="Mensagem"
            required
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn color="accent" :disabled="!valid">Adicionar</v-btn>
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Vue from "vue";
import store from '../store/index'
export default Vue.extend({
  name: "Home",
  components: {},
  data: function () {
    return {
      valid: false,
      autor: String,
      mensagem: String,
      titulo: String,
      regrasMsg: [
        v => !!v || 'A mensagem é obrigatória',
        v => v.length > 3 || 'A mensagem deve ter mais de 3 caracteres',
        v => v.length < 201 || 'A mensagem deve ter menos de 201 caracteres',
        v => !/[^a-z0-9 A-Zãâõêáéíóúàç.,:;?!]+/.test(v) || 'Não é permitido caracteres especiais'
      ],
      regrasTitulo: [
       v => !!v || 'O titulo é obrigatório',
       v => !/[^a-z0-9 A-Zãâõêáéíóúàç.,:;?!]+/.test(v) || 'Não é permitido caracteres especiais',
       v => v.length < 21 || 'O titulo deve ter menos de 21 caracteres',
       v => store.commit('tituloRepetido', v) || 'Já existe uma postagem com esse título'
      ]
    };
  },
});
</script>

<style>
</style>