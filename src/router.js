import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Home from "./views/Home";

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
      hidden: true
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      hidden: true
    }
  ]
});
