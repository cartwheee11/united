import { createRouter, createWebHistory } from "vue-router";
import Publication from "../views/Publication.vue";
// import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
// import About from "../views/About.vue";
import Tutorials from "../views/Tutorials.vue";
import Create from "../views/Create.vue";
import Developing from "../views/Developing.vue";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/gallery",
    name: "Галерея",
    component: Developing,
  },
  {
    path: "/tutorials",
    name: "Руководства",
    component: Tutorials,
  },
  {
    path: "/Auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/Players",
    name: "Участники",
    component: Developing,
  },
  {
    path: "/About",
    name: "О гильдии",
    component: Developing,
  },
  {
    path: "/create",
    name: "Создать",
    component: Create,
  },

  {
    path: "/news",
    name: "Новости",
    component: Developing,
  },
  {
    path: "/tutorials/:id",
    component: Publication,
    name: "Публикации",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
