<template>
  <v-app>
    <div class="Login" v-if="!logado">
      <Login />
    </div>
  </v-app>
</template>

<script>
import Vue from "vue";
import Login from "../molecules/Login.vue";

export default Vue.extend({
  components: { Login },
  data: function () {
    return {
      logado: false,
    };
  },
  mounted() {
    console.log(this.$cookies.get("ContaWorldForum"));
  },
});
</script>
