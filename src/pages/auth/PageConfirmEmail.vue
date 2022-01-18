<template>
  <q-page>

  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'

const $q = useQuasar()

onMounted(() => {
  try {
    $q.loading.show()
  } catch (err) {

  } finally {
    $q.loading.hide()
  }
})
</script>
