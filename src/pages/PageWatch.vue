<template>
  <q-page class="PageWatch p-8 sm:p-12">
    <div class="container mx-auto">
      <header>
        <h1>Watch The Truth</h1>
      </header>

      <p class="font-bold">Jesus Christ is coming back!</p>

      <div class="pt-10">
        <div class="relative">
          <div :id="`zype_${$const.ZYPE_DOCUMENTARY_VIDEO_ID}`" class="w-full aspect-video bg-black">
            <!--
            This is where the zype player gets placed when the zype player script is loaded.
            -->
          </div>
          <q-inner-loading :showing="showLoading"/>
        </div>
      </div>

      <div class="pt-10">
        <h2 class="text-center mb-10">Thank you for watching and be sure to share with your friends and neighbors!</h2>
        <social-buttons/>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useMeta } from 'quasar'
import * as $const from 'src/constants'
import { useUserStore } from 'src/stores/user'
import SocialButtons from 'components/SocialButtons'
import { onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { delay } from 'lodash'
import { set } from '@vueuse/core'

const userStore = useUserStore()

let showLoadingDelayId = null
const showLoading = ref(true)

onMounted(() => {
  set(showLoading, true)
  // fake a loading animation while the zype video is added by their script.
  showLoadingDelayId = delay(() => {
    set(showLoading, false)
    showLoadingDelayId = false
  }, 2000)
})

onBeforeRouteLeave((to, from, next) => {
  set(showLoading, false)
  if (showLoadingDelayId) {
    clearTimeout(showLoadingDelayId)
  }
  next()
})

useMeta(() => {
  const meta = {}

  // This loads the requested preview video.
  meta.script = {
    previewVideo: {
      src: $const.VIDEO_SRC_TEMPLATE({
        vid: $const.ZYPE_PREVIEW_VIDEO_ID,
        authParam: 'access_token',
        auth: userStore.authUser.zypeOAuth.access_token
      })
    }
  }

  return meta
})
</script>
