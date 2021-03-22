import axios from "@/axios";
import { listCourses } from "@/datasource/DataSource";
import { Course, User } from "@/datasource/Types";
import { ResultVO } from "@/mock";
import { AxiosResponse } from "axios";
import { ActionTree, createStore, GetterTree, MutationTree } from "vuex";
import * as vxt from "./VuexTypes";

export interface State {
  user?: User;
  courses?: Course[];
  exception?: string;
  userCourses?: Course[];
}

const myState: State = {
  user: {
    name: "BO",
    address: "956",
    level: 1
  },
  courses: [],
  userCourses: [],
  exception: ""
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_USER]: (state, data: User) => (state.user = data),
  [vxt.LIST_COURSES]: (state, data: Course[]) => (state.courses = data),
  [vxt.LIST_USER_COURSES]: (state, data: Course[]) =>
    (state.userCourses = data),
  [vxt.GET_EXCEPTION]: (state, data: string) => (state.exception = data)
};

const myActions: ActionTree<State, State> = {
  [vxt.UPDATE_USER]: ({ commit }, data: User) => {
    setTimeout(() => commit(vxt.UPDATE_USER, data), 2000);
  },
  [vxt.LIST_COURSES]: ({ commit }) => {
    const courses = listCourses();
    setTimeout(() => commit(vxt.LIST_COURSES, courses), 2000);
  },
  [vxt.LIST_GITHUBREPOS]: async ({ commit }, url: string) => {
    const resp = await axios.get(url);
    return resp.data;
  },
  // 10-01
  [vxt.LIST_USER_COURSES]: async ({ commit }, userId: string) => {
    const resp: AxiosResponse<ResultVO> = await axios.get(
      `users/${userId}/courses`
    );
    commit(vxt.LIST_USER_COURSES, resp.data.data.courses);
  },
  [vxt.LOGIN]: async ({ commit }, user: any) => {
    // try可避免控制台的未捕获异常信息
    try {
      const resp: AxiosResponse<ResultVO> = await axios.post("login", user);
      console.log(resp.headers.authorization);
      sessionStorage.setItem("authorization", resp.headers.authorization);
      commit(vxt.UPDATE_USER, resp.data.data.user);
    } catch (error) {
      // eslint默认禁止空执行体。加一段注释或关闭该检测
    }
  },
  [vxt.GET_HOME]: async ({ commit }) => {
    // 未捕获异常，请求失败在控制台输出信息
    const resp: AxiosResponse<ResultVO> = await axios.get("home");
    commit(vxt.LIST_COURSES, resp.data.data?.courses);
  }
  // 10-02
  // [vxt.LOGIN]: async ({ commit }, user: any) => {
  //   const resp: AxiosResponse<ResultVO> = await axios.post("login", user);
  //   if (resp.data.code == 200) {
  //     console.log(resp.headers.authorization);
  //     sessionStorage.setItem("authorization", resp.headers.authorization);
  //     commit(vxt.UPDATE_USER, resp.data.data.user);
  //   } else {
  //     commit(vxt.GET_EXCEPTION, resp.data.message);
  //   }
  // },
  // [vxt.GET_HOME]: async ({ commit }) => {
  //   const auth = sessionStorage.getItem("authorization");
  //   const resp: AxiosResponse<ResultVO> = await axios.get("home", {
  //     headers: { authorization: auth }
  //   });
  //   if (resp.data.code == 200) {
  //     commit(vxt.LIST_COURSES, resp.data.data?.courses);
  //   } else {
  //     commit(vxt.GET_EXCEPTION, resp.data.message);
  //   }
  // }
};

const myGetters: GetterTree<State, State> = {
  premission: state => (level: number) => state.user?.level == level,
  [vxt.GETTER_PREMISSION]: state => (level: number) =>
    state.user?.level == level
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
