<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="!flex items-center">
        <q-avatar icon="notification_important" color="primary" text-color="white"/>
        <div class="text-xl pl-4">Agreement</div>
      </q-card-section>
      <q-card-section>
        <span class="text-base">
          <template v-if="message && message.length > 0">{{ message }}&nbsp;</template>Please confirm that you give permission for TruHistory to contact you via the information you provided and that you agree to our <a
          href="/terms" target="_blank" rel="noopener noreferrer" class="underline">Terms and Conditions</a> and <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          class="underline">Privacy Policy</a>.
          All transactions final. No refunds. I agree to not copy, reproduce, record or distribute any part of the video content or website to anyone.
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup color="negative">I Disagree</q-btn>
        <q-btn v-close-popup color="positive" @click="$emit('ok')" data-cy="btnPermissionYes">I Agree</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>
