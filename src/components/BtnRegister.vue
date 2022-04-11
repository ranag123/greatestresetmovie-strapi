<template>
  <template v-if="!userStore.isAuthenticated">
    <q-btn
      class="mt-6"
      color="accent"
      size="xl"
      :to="{ name: 'AuthRegister' }"
    >
      Register Now<span class="gt-xs">&nbsp;to Watch</span>
    </q-btn>
    <div class="text-base sm:text-2xl tracking-widest font-bold pl-1 pt-2">It&apos;s Free! No Credit Card Required!</div>

    <q-separator class="w-3/12 mt-8"/>
  </template>
</template>

<script setup>
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
</script>
