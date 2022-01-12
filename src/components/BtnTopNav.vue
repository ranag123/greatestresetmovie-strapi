<template>
  <q-btn
    stretch unelevated no-caps no-wrap
    class="BtnTopNav px-6"
    :style="activeStyles"
  >
    <slot/>
  </q-btn>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vue-router'

const attrs = useAttrs()
const route = useRoute()

const activeStyles = computed(() => {
  // make it bold when on that route
  try {
    if (attrs.to.name === route.name) {
      return 'font-weight: bold'
    }
  } catch (err) {}
  return 'font-weight: 300 !important'
})
</script>
