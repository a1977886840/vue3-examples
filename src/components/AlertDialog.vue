<template>
  <div></div>
</template>
<script lang="ts">
import { State } from "@/store";
import { computed, defineComponent, Ref, watch } from "vue";
import { Store, useStore } from "vuex";
export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const exception = computed(() => store.state.exception);
    watch(exception, (newValue: Ref, o: Ref) => {
      alert(newValue);
    });
  }
});
</script>
