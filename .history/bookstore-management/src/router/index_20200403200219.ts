import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" }, // 重定向
  { path: "/login", name: "Login", component: Login }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
