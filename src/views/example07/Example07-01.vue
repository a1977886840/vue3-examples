<template>
  <div>
    <p>
      可在视图直接通过$store.state获取state中数据。
      <br />
      {{ $store.state.user.name }} / {{ $store.state.user.address }}
    </p>
    <hr />
    <p>
      useStore()函数必须在setup()中使用。可以传递store对象给自定义use函数。
      <br />
      组件内声明的user变量必须通过计算属性绑定state user。否则state
      user更新，组件user变量不会响应式更新。
    </p>
    <p>{{ userS.name }} / {{ userS.address }}</p>
    <hr />
    <p>
      通过mapState，获取state指定属性名称的值。
      <br />
      {{ user.name }} / {{ user.address }}
      <br />
    </p>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { computed, defineComponent } from "vue";
import { mapState, Store, useStore } from "vuex";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const userS = computed(() => store.state.user);
    return {
      userS
    };
  },
  computed: {
    ...mapState(["user"])
  }
});
</script>
