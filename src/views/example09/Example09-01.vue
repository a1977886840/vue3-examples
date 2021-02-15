<template>
  <div>
    <p>
      https://api.github.com/users/bwhyman
    </p>
    <p>
      <img :src="user.avatar_url" alt="" style="width: 30%" />
      <br />
      login: {{ user?.login }}
      <br />
      company: {{ user?.company }}
      <br />
      repos_url:
      <!-- :to="{ name: 'example09-02', query: { url: user?.repos_url } }" -->
      <router-link :to="`/example09-02?url=${user?.repos_url}`">
        {{ user?.repos_url }}
      </router-link>
      <br />
      public_repos: {{ user?.public_repos }}
      <br />
      followers: {{ user?.followers }}
      <br />
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import axios from "@/axios/index";
import { GithubUser } from "@/datasource/Types";
export default defineComponent({
  setup() {
    const user: Ref<GithubUser> = ref({});
    axios
      .get("https://api.github.com/users/bwhyman")
      .then(resp => (user.value = resp.data));
    return {
      user
    };
  }
});
</script>
