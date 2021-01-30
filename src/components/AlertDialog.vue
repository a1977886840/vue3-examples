<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";

import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const exception = useStore().state.exception;
    watch(exception, (newValue: string, o: string) => {
      alert(newValue);
    });
  }
});
</script>
