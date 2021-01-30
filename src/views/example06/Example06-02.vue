<template>
  <div>
    <p>
      与视图元素的绑定与vue2完全不同。需要声明元素，以及绑定函数，在视图元素通过:ref绑定函数
    </p>
    <p>
      需求：必须同意条款才能选择操作以及提交；必须选择2项才能提交；等于2项时checkbox变为不可用状态
    </p>
    <form>
      <label>
        <input type="checkbox" v-model="agreed" />
        同意条款
      </label>
      <br />
      <template v-for="(c, index) in courses" :key="index">
        <label>
          <input
            :ref="chRefs"
            type="checkbox"
            v-model="sCoursesRef"
            :value="{ id: c.id }"
            :disabled="!agreed"
            @change="check"
          />
          {{ c.name }}
        </label>
        <br />
      </template>
      <br />
      <button
        type="button"
        :disabled="!agreed || !(sCoursesRef.length >= amount)"
      >
        submit
      </button>
    </form>
    <p>
      {{ sCoursesRef }}
    </p>
  </div>
</template>
<script lang="ts">
import { listCourses } from "@/datasource/DataSource";
import { Course } from "@/datasource/Types";
import { defineComponent, Ref, ref } from "vue";

function useSelectCourses(
  checkboxs: HTMLInputElement[],
  amount: number,
  sCourses: Ref<Course[]>
) {
  const check = () => {
    const checkboxDis = sCourses.value.length >= amount;
    checkboxs.filter(c => !c.checked).forEach(c => (c.disabled = checkboxDis));
  };
  return {
    check
  };
}
// 模拟曾经选中的数据
const selectedCourses: Course[] = [{ id: 7 }];
export default defineComponent({
  setup() {
    const checkboxs: HTMLInputElement[] = [];
    const chRefs = (el: HTMLInputElement) => checkboxs.push(el);
    const amount = 2;
    const sCoursesRef: Ref<Course[]> = ref(selectedCourses);
    const agreed = ref(false);
    const courses = listCourses();
    const { check } = useSelectCourses(checkboxs, amount, sCoursesRef);
    return {
      amount,
      sCoursesRef,
      agreed,
      courses,
      chRefs,
      check
    };
  }
});
</script>
