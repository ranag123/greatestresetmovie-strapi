<template>
  <form
    :action="`https://trunews.us6.list-manage.com/subscribe/post?u=d55fcedea0&amp;id=${$const.MAILCHIMP_LIST_ID}`"
    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
    target="_blank" novalidate
    class="validate"
  >
    <div class="mb-4" id="mc_embed_signup_scroll">
      <h3 class="text-3xl">Stay Connected</h3>

      <label class="block py-6 tracking-wide" for="mce-EMAIL">
        <span class="block pb-2 font-bold">Signup to stay up to date with the latest news regarding The Greatest Reset.</span>
        <span class="block">This is an important step to stay informed as social media accounts are frequently shadow banned.</span>
      </label>

      <q-input
        dark standout
        id="mce-EMAIL"
        type="email"
        name="EMAIL"
        placeholder="you@somewhere.com"
        aria-label="email"
      />

      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="b_d55fcedea0_6d6a7cc687" tabindex="-1" value="">
      </div>
    </div>

    <div class="!flex items-center">
      <q-btn
        type="submit"
        color="dark"
        size="lg"
        class="w-full"
        label="Subscribe"
        name="subscribe"
        id="mc-embedded-subscribe"
      />
    </div>
  </form>
</template>

<script setup>
import * as $const from 'src/constants'
</script>
