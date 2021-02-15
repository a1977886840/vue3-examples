<template>
  <div>
    <p>{{ user.name }} / {{ user.address }}</p>
    <p>
      <input type="text" v-model="myUser.name" />
      <br />
      <input type="text" v-model="myUser.address" />
      <br />
      <button type="button" @click="updateUser">update</button>
    </p>
  </div>
</template>
<script lang="ts">
import { User } from "@/datasource/Types";
import { State } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { Store, useStore } from "vuex";
import { UPDATE_USER } from "@/store/VuexTypes.ts";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const user = computed(() => store.state.user);
    // 创建一个响应式对象用于双向绑定
    const myUser = ref<User>({});
    // 执行updateUser()函数时，从myUser获取值，创建对象。
    // 而非直接传递myUser对象
    const updateUser = () => {
      store.commit(UPDATE_USER, {
        name: myUser.value.name,
        address: myUser.value.address
      } as User);
    };
    return {
      user,
      myUser,
      updateUser
    };
  }
});
</script>
