<template>
  <div>
    <h1>Form Binding</h1>
    <form>
      <input type="text" v-model="user.name" />
      <br />
      <label>
        <input type="radio" v-model="user.sex" value="male" />
        男
      </label>
      <br />
      <label>
        <input type="radio" v-model="user.sex" value="female" />
        女
      </label>
      <br />
      <select v-model="user.title">
        <option v-for="(t, index) in titles" :key="index" :value="{ id: t.id }">
          {{ t.name }}
        </option>
      </select>
      <br />
      <template v-for="(c, index) in courses" :key="index">
        <label>
          <input type="checkbox" v-model="user.courses" :value="{ id: c.id }" />
          {{ c.name }}
        </label>
        <br />
      </template>
      <button @click="submit" type="button">提交</button>
    </form>
    <p>{{ user }}</p>
    <hr />
    <br />
    <input type="file" @change="fileChange($event.target.files[0])" />
    <br />
    <p>{{ file.name }} / {{ file.size }}</p>
    <br />
  </div>
</template>
<script lang="ts">
import { listCourses, listTitles } from "@/datasource/DataSource";
import { User } from "@/datasource/Types.ts";
import { defineComponent, reactive } from "vue";

function useFile(file: { name: string; size: string }) {
  const fileChange = (f: File) => {
    file.name = f.name;
    file.size = `${(f.size / 1024 / 1024).toFixed(2)} MB`;
  };

  return {
    fileChange
  };
}

export default defineComponent({
  setup() {
    const user = reactive({
      name: "",
      sex: "",
      courses: [],
      title: null
    } as User);
    const file = reactive({ name: "", size: "" });
    console.log(file);

    const titles = listTitles();
    const courses = listCourses();
    const { fileChange } = useFile(file);
    return {
      user,
      titles,
      courses,
      file,
      fileChange
    };
  }
});
</script>
