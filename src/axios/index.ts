import { ResultVO } from "@/mock";
import axios from "axios";
import store from "@/store";
import { GET_EXCEPTION } from "@/store/VuexTypes";

axios.interceptors.request.use(
  config => {
    const auth = sessionStorage.getItem("authorization");
    // 判断,用于避免header包含authorization属性但数据值为空
    if (auth) {
      config.headers.authorization = auth;
    }
    return config;
  },
  error => {
    store.commit(GET_EXCEPTION, error.message);
    return Promise.reject();
  }
);
axios.interceptors.response.use(
  config => {
    const data: ResultVO = config.data;
    if (data.code != 200) {
      store.commit(GET_EXCEPTION, data.message);
      return Promise.reject();
    }
    return config;
  },
  // 在http状态码不是200时回调
  error => {
    store.commit(GET_EXCEPTION, error.message);
    return Promise.reject();
  }
);

export default axios;
