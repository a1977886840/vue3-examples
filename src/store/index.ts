import { listCourses } from "@/datasource/DataSource";
import { Course, User } from "@/datasource/Types";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";

export interface State {
  user?: User;
  courses?: Course[];
  exception?: string;
}

const myState: State = {
  user: {
    name: "BO",
    address: "956",
    level: 1
  },
  courses: []
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  [vxt.LIST_COURSES]: (state, data: Course[]) => (state.courses = data)
};

const myActions: ActionTree<State, State> = {
  [vxt.UPDATE_USER]: ({ commit }, data: User) => {
    setTimeout(() => commit(vxt.UPDATE_USER, data), 2000);
  },
  [vxt.LIST_COURSES]: ({ commit }) => {
    const courses = listCourses();
    setTimeout(() => commit(vxt.LIST_COURSES, courses), 2000);
  }
};

const myGetters: GetterTree<State, State> = {
  premission: state => (level: number) => state.user?.level == level
};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  getters: myGetters,
  modules: {}
});
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
//const key: InjectionKey<Store<State>> = Symbol()
// export function useStore () {
//   return baseUseStore(key)
// }
