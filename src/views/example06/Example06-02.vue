<template>
  <div>
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
            v-model="selectedCourses"
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
        :disabled="!agreed || !(selectedCourses.length >= amount)"
      >
        submit
      </button>
    </form>

    <p>{{ selectedCourses }}</p>
  </div>
</template>
<script lang="ts">
import { listCourses } from "@/datasource/DataSource";
import { defineComponent, Ref, ref } from "vue";

function useSelectCourses(
  checkboxs: HTMLInputElement[],
  amount: number,
  sCourses: Ref<{ id: number }[]>
) {
  const check = () => {
    const checkboxDis = sCourses.value.length >= amount;
    checkboxs.filter(c => !c.checked).forEach(c => (c.disabled = checkboxDis));
  };

  return {
    check
  };
}

export default defineComponent({
  setup() {
    const checkboxs: HTMLInputElement[] = [];
    const chRefs = (el: HTMLInputElement) => checkboxs.push(el);

    const amount = 2;
    // 由于是数组，不是对象中的数组，不能使用reactive()函数
    const selectedCourses = ref([{ id: 7 }]);
    const agreed = ref(false);
    const courses = listCourses();

    const { check } = useSelectCourses(checkboxs, amount, selectedCourses);
    return {
      amount,
      selectedCourses,
      agreed,
      courses,
      chRefs,
      check
    };
  }
});
</script>
