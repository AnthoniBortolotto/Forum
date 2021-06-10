/* import auth0 from "auth0-js";
import router from "../router"; */
//import store from "../store";

/* const webAauth = new auth0.WebAuth({
  domain: "dev-br9dmv51.us.auth0.com",
  clientID: "ESUQyTTDNpczBHze0dTRkFjzNjyAcsty",
  redirectUri: "https://localhost:8080/callback",
  responseType: "token id_token",
  scope: "openid profile",
}); */

/* let token = {};

export const handlerAuth = (cb) => {
  webAauth.parseHash((error, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      token.accessToken = authResult.accessToken;
      token.idToken = authResult.idToken;
      token.expiry = new Date().getTime() + authResult.expiresIn + 1000;
      cb();
    } else {
      console.log(error);
      router.replace("Home");
    }
  });
};

/* export const isLogged = () => {
  return token.accessToken && new Date().getTime() < token, expiry;
}; */

/* export const logUserOut = () => {
  token = {};
}; */

/* export const login = () => {
  //webAauth.authorize();
  store.dispatch("auth0Login");
}; */
