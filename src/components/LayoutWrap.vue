<template>
  <!-- TODO: trash this file if not used -->
  <div :class="{ LayoutWrapMax: useMax }">
    <slot/>
  </div>
</template>

<script setup>
const props = defineProps({
  useMax: {
    type: Boolean,
    default () {
      return true
    }
  }
})
</script>

<style lang="scss" scoped>
// Per Chris, no max-width
//.LayoutWrapMax {
//  max-width: $breakpoint-lg-min
//}
</style>
