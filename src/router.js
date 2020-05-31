import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import Home from "./views/Home";
import Test1 from "./views/Test1";
import Test2 from "./views/Test2";

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
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/test1",
          name: "Test1",
          component: Test1
        },
        {
          path: "/test2",
          name: "Test2",
          component: Test2
        }
      ]
    }
  ]
});
