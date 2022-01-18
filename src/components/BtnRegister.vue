<template>
  <template v-if="!userStore.isAuthenticated">
    <q-btn
      class="bg-yellow-500 mt-6"
      size="xl"
      :to="{ name: 'AuthRegister' }"
    >
      Register Now<span class="gt-xs">&nbsp;to Watch</span>
    </q-btn>
    <div class="text-base tracking-widest font-bold pl-1 pt-2">It&apos;s Free!</div>
  </template>
</template>

<script setup>
import { useUserStore } from 'src/stores/user'

const userStore = useUserStore()
</script>
