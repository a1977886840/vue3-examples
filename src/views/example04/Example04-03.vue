<template>
  <div>
    <h1>v-for</h1>
    <ul>
      <li v-for="c in courses" :key="c.id">
        <router-link :to="`/homeworks/${c.id}`">
          {{ c.name }} / {{ formatDate(c.createDate) }}
        </router-link>
      </li>
    </ul>
    <p>vue3，可直接修改响应式数组数据，改变数组长度，无需vue3的$set等方法</p>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>createDate</th>
          <th>do</th>
        </tr>
      </thead>
      <tr v-for="(c, index) in courses" :key="index">
        <td>{{ index }}</td>
        <td>{{ c.name }}</td>
        <td>{{ formatDate(c.createDate) }}</td>
        <td>
          <button @click="removeItem(index)">remove item</button>
        </td>
      </tr>
    </table>

    <button @click="addItem">add item</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    courses: [
      { id: 4, name: "Java", createDate: "2046-05-10T12:00" },
      { id: 5, name: "Web开发技术", createDate: "2046-04-10T09:00" },
      { id: 6, name: "系统程序设计", createDate: "2046-06-10T21:30" }
    ]
  }),
  computed: {
    formatDate() {
      return (date: string) => date.replace("T", " ").substring(0, 16);
    }
  },
  methods: {
    addItem() {
      this.courses.push({
        id: this.courses.length + 1,
        name: "Vue 3.0",
        createDate: new Date().toISOString()
      });
    },
    removeItem(index: number) {
      // splice()参数，预删除元素索引，删除之后的几个
      this.courses.splice(index, 1);
    }
  }
});
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
