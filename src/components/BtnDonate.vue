<template>
  <div class="pt-12 text-center max-w-md">
    <div class="text-lg sm:text-2xl font-bold pb-6">
      Someone donated so you can watch part 1 free,
      will you donate so others can watch part 2?
    </div>

    <q-btn
      color="accent"
      label="Donate Now"
      size="xl"
      @click="openDonationDialog"
    />
  </div>
</template>

<script setup>
import { openDonationDialog } from 'src/util/donate'
</script>
