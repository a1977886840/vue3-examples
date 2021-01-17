import { User } from "@/datasource/Types";
import { ActionContext, createStore } from "vuex";
import * as vt from "./VuexTypes";

export interface State {
  user: User;
}

const myState: State = {
  user: {
    name: "BO",
    address: "956"
  }
};
const myMutations = {
  [vt.updateUser](state: State, data: User) {
    state.user.name = data.name;
    state.user.address = data.address;
  }
};

const myActions = {
  [vt.updateUser]({ commit }: ActionContext<State, State>, data: User) {
    setTimeout(() => commit(vt.updateUser, data), 2000);
  }
};
export default createStore<State>({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
//const key: InjectionKey<Store<State>> = Symbol()
// export function useStore () {
//   return baseUseStore(key)
// }
