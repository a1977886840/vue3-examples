<template>
  <div>
    <h1>composition-api</h1>
    <p>
      基于composition-api重写example02实例
      <br />
      https://v3.cn.vuejs.org/guide/composition-api-introduction.html
    </p>
    <p>
      视图需要使用的数据/计算属性/方法，必须在setup()函数中返回。整合了data/computed/methods。
    </p>
    <p>
      isShow属性，静态数据。因此直接声明使用
      <br />
      {{ isShow ? "为true显示" : "为false显示" }}
    </p>
    <hr />
    <p>
      ref()函数将基本数据类型数据转为响应式数据，在TS中通过value()获取/修改，在视图模板中自动拆箱。
    </p>
    <p>
      messageRef属性，为响应式属性，即当其封装的数据改变时，动态响应式改变。
      <br />
      messageRef: {{ messageRef }};
    </p>
    <hr />
    <p>
      reactive()函数，将对象转为响应式对象，修改其中的属性值，动态响应式改变。
      <br />
      {{ user.name }} / {{ user.insertTime }} / {{ user.address }}
      <br />
      按钮绑定的执行函数，在setup()中返回
      <br />
      <button @click="changeName">changeName</button>
    </p>
    <hr />
    <p>
      将全部业务逻辑声明在setup()函数中过于臃肿。因此可按逻辑聚合为独立的函数/文件。在setup()中调用聚合。类似controller
      <br />
      创建独立的以use为前缀的函数，单独处理各种逻辑。useComputed()函数处理组件中与计算数据有关的逻辑。
      <br />
      computed()，封装计算属性的函数，必须有返回值。与computed属性相同。
      <br />
      {{ myDate }}
      <br />
      reversMessage: {{ reversMessage }}
    </p>
    <hr />
    <p>
      由独立的函数useMethods()提供此处逻辑的处理，暴露处理函数addAddress()。
      <br />
      <button @click="addAddress">changeAddress</button>
      <br />
      {{ user.address }}
    </p>
    <hr />
    <p>
      由独立的函数useComputedReturnFunction()函数处理。
      <br />
      {{ myReplace(user.insertTime) }}
    </p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref } from "vue";
// 应统一置于独立的类型文件
interface User {
  name: string;
  insertTime: string;
  address: string;
}
// 基本。独立的聚合逻辑的方法
function useComputed(user: User, message: Ref<string>) {
  const reversMessage = computed(() =>
    message.value
      .split("")
      .reverse()
      .join("")
  );
  const myDate = computed(() => user.insertTime.replace("T", " "));
  return {
    myDate,
    reversMessage
  };
}
// 独立的
function useMethods(user: User) {
  const addAddress = () => {
    user.address = "956";
  };
  return {
    addAddress
  };
}

function useComputedReturnFunction() {
  const myReplace = computed(() => (date: string) => date.replace("T", " "));
  return {
    myReplace
  };
}

export default defineComponent({
  setup() {
    const isShow = false;
    const messageRef = ref("hello");
    messageRef.value = "hello world";
    const user = reactive({
      name: "BO",
      insertTime: "2046-04-09T11:04:25",
      address: ""
    });
    const changeName = () => {
      user.name = "SUN";
    };

    const { myDate, reversMessage } = useComputed(user, messageRef);
    const { addAddress } = useMethods(user);
    const { myReplace } = useComputedReturnFunction();
    return {
      isShow,
      messageRef,
      user,
      reversMessage,
      changeName,
      myDate,
      addAddress,
      myReplace
    };
  }
});
</script>
