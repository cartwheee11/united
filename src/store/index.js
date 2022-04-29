import { createStore } from "vuex";

export default createStore({
  state: {
    user: JSON.parse(window.localStorage.getItem("user")),
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    removeUser(state) {
      state.user = null;
    },
  },
  actions: {
    logOut(context) {
      context.commit("removeUser");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("auth");
    },
  },
  modules: {},
});
