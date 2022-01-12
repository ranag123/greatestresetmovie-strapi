<template>
  <router-view/>
</template>

<script setup>
import { useMeta } from 'quasar'

useMeta(() => {
  return {
    canonical: { rel: 'canonical', href: window.location.href }
  }
})

</script>
