<template>
  <div>
    <p>useStore()函数必须在setup()中使用。可以传递store对象给自定义use函数。</p>
    <p>{{ user.name }} / {{ user.address }}</p>
    <hr />
    <p>
      <input type="text" v-model="myUser.name" />
      <br />
      <input type="text" v-model="myUser.address" />
      <br />
      <button type="button" @click="update">update</button>
    </p>
    <hr />
    <p>
      <input type="text" v-model="myUser.name" />
      <br />
      <input type="text" v-model="myUser.address" />
      <br />
      <button type="button" @click="asyncUpdate">asyncUpdate</button>
    </p>
  </div>
</template>
<script lang="ts">
import { User } from "@/datasource/Types";
import { State } from "@/store";
import { defineComponent, reactive } from "vue";
import { Store, useStore } from "vuex";
import { updateUser } from "@/store/VuexTypes.ts";

function useUpdateUser(myUser: User, store: Store<State>) {
  const update = () => store.commit(updateUser, myUser);
  return {
    update
  };
}

function useAsyncUpdateUser(myUser: User, store: Store<State>) {
  const asyncUpdate = () => store.dispatch(updateUser, myUser);
  return {
    asyncUpdate
  };
}

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const user = store.state.user;

    const myUser = reactive({});
    const { update } = useUpdateUser(myUser, store);
    const { asyncUpdate } = useAsyncUpdateUser(myUser, store);
    return {
      user,
      myUser,
      update,
      asyncUpdate
    };
  }
});
</script>
