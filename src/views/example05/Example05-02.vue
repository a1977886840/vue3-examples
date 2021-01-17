<template>
  <div>
    <p>
      整合独立的类型文件/数据仓库文件/业务逻辑
    </p>
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
import { computed, defineComponent, reactive } from "vue";

import { listCourses } from "@/datasource/DataSource";
import { Course } from "@/datasource/Types";

/**
 * 抽取出独立的，对指定时间格式化的逻辑
 */
function useDateFormat() {
  const formatDate = computed(() => (date: string) =>
    date.replace("T", " ").substring(0, 16)
  );
  return {
    formatDate
  };
}
/**
 * 抽取出独立的，对homework的增删逻辑
 */
function useHomeworks(courses: Course[]) {
  const addItem = () => {
    courses.push({
      id: courses.length + 1,
      name: "Vue 3.0",
      createDate: new Date().toISOString()
    });
  };
  const removeItem = (index: number) => {
    // splice()参数，预删除元素索引，删除之后的几个
    courses.splice(index, 1);
  };
  return {
    addItem,
    removeItem
  };
}

export default defineComponent({
  setup() {
    const courses = reactive(listCourses());
    const { formatDate } = useDateFormat();
    const { addItem, removeItem } = useHomeworks(courses);
    return {
      courses,
      formatDate,
      addItem,
      removeItem
    };
  }
});
</script>
