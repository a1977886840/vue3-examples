<template>
  <div>
    <p>
      通过mapState，获取state指定属性名称的值。
      <br />
      {{ user.name }} / {{ user.address }}
      <br />
    </p>
    <p>
      <span v-if="premission(1)">用户权限为1显示</span>
      <br />
      <span v-if="premission(2)">用户权限为2显示</span>
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["premission"])
  }
});
</script>
