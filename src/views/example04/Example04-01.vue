<template>
  <div>
    <h1>v-text</h1>
    <p>
      <span v-text="message"></span>
    </p>
    <h1>v-if</h1>
    <p v-if="user.level == 'admin'">此内容仅admin可见</p>

    <template v-if="userNameLogin">
      <p>vue3.0，input组件默认不会被复用了</p>
      <input placeholder="Enter your username" />
      <br />
      <input type="password" placeholder="Enter your password" />
    </template>
    <template v-else>
      <input placeholder="Enter your KEY" />
    </template>
    <br />
    <button v-on:click="changeInput">切换</button>
    <h1>v-show</h1>
    <p v-show="close">此内容仅close为true可见</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    message: "hello world",
    admin: true,
    userNameLogin: true,
    user: { username: "BO", level: "admin" },
    close: true
  }),
  methods: {
    changeInput() {
      this.userNameLogin = !this.userNameLogin;
    }
  }
});
</script>
