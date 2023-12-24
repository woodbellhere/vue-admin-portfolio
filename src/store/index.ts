import { createStore } from "vuex";
import login from "./login/login";
import system from "./main/system";
import { IRootState } from "./types";
const store = createStore<IRootState>({
  state() {
    return {
      name: "wood",
      age: 25,
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system,
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}
setupStore();
export default store;
