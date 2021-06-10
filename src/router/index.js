import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import store from "../store/index";
import Callback from "../pages/Callback.vue";

Vue.use(VueRouter);
// function authCheck(to, from, next) {
//   if (!isLogged()) {
//     next({
//       path: "/", //not authorized path
//     });
//   } else {
//     next({});
//   }
// }

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
  {
    path: "/adicionar",
    name: "Adicionar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Adicionar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/conta",
    name: "Conta",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/Conta.vue"),
  },
  {
    path: "/signin",
    name: "CriarConta",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../molecules/CriarConta.vue"),
  },
  // {
  //   path: "/gerenciar",
  //   name: "Gerenciar",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../pages/Gerenciar.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.path == "/callback")) {
    console.log("found /callback");
    store.dispatch("auth0Authentication");
    next(false);
  }
  let routerAuthCheck = false;
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("id_token") &&
    localStorage.getItem("expires_at")
  ) {
    console.log("local storage found");
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    routerAuthCheck = new Date().getTime() < expiresAt;
  }
  store.commit("setAuthorization", routerAuthCheck);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (routerAuthCheck) {
      next();
    } else {
      router.replace("/"); //pagina login
    }
  } else {
    next();
  }
});
export default router;
