<template>
  <div>
    <p>
      <b>一定在router配置声明启用props支持，否则无法获取数据。</b>
      <br />
      在vue props属性中声明同名变量
    </p>
    studentID: {{ sid }}
    <br />
    homeworksID: {{ hid }}
    <br />
    也可通过$route.params调用
    <br />
    {{ $route.params.sid }}
    <hr />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["sid", "hid"],
  created() {
    this.init();
  },
  beforeUpdate() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.sid);
    }
  }
});
</script>
