<template>
  <q-page class="PageIndex w-full">
    <section class="center">
      <header class="pb-20">
        <!-- H1 is for seo -->
        <h1 style="display: none !important;">The Greatest Reset</h1>
        <img
          src="img/sitelogo.png"
          class="w-full mb-8 md:mb-12 px-16"
        />
        <div
          class="
            relative text-base sm:text-xl font-light tracking-wide uppercase text-center pt-6 pb-2
            before:h-px before:bg-white before:w-[370px] before:-ml-[185px] before:absolute before:top-0 before:left-1/2
          "
        >
          Truth Is Coming, To Stay
        </div>
      </header>

      <div class="playerWrap">
        <q-tab-panels
          v-model="previewTab"
          animated keep-alive
          class="bg-black"
          :swipeable="$q.platform.has.touch"
          :transition-prev="$q.platform.has.touch ? '' : 'scale'"
          :transition-next="$q.platform.has.touch ? '' : 'scale'"
        >
          <q-tab-panel name="one" class="p-0 overflow-hidden">
            <div :id="`zype_${$const.ZYPE_PREVIEW_VIDEO_ID}`" class="aspect-video">
              <!--
              This is where the zype player gets placed when the zype player script is loaded.
              -->
            </div>
            <q-inner-loading :showing="showPreviewLoading"/>
          </q-tab-panel>
          <q-tab-panel v-if="$const.ZYPE_PREVIEW_ALT1_VIDEO_ID" name="two" class="p-0 overflow-hidden">
            <div :id="`zype_${$const.ZYPE_PREVIEW_ALT1_VIDEO_ID}`" class="aspect-video">
              <!--
              This is where the zype player gets placed when the zype player script is loaded.
              -->
            </div>
            <q-inner-loading :showing="showPreviewLoading"/>
          </q-tab-panel>
          <q-tab-panel v-if="$const.ZYPE_PREVIEW_ALT2_VIDEO_ID" name="three" class="p-0 overflow-hidden">
            <div :id="`zype_${$const.ZYPE_PREVIEW_ALT2_VIDEO_ID}`" class="aspect-video">
              <!--
              This is where the zype player gets placed when the zype player script is loaded.
              -->
            </div>
            <q-inner-loading :showing="showPreviewLoading"/>
          </q-tab-panel>
        </q-tab-panels>

        <q-tabs
          v-if="$const.ZYPE_PREVIEW_ALT1_VIDEO_ID || $const.ZYPE_PREVIEW_ALT2_VIDEO_ID"
          v-model="previewTab"
          align="justify"
          narrow-indicator
          class="mb-6"
        >
          <q-tab :ripple="false" content-class="trailerTab" name="one" label="Trailer 1"/>
          <q-tab v-if="$const.ZYPE_PREVIEW_ALT1_VIDEO_ID" :ripple="false" content-class="trailerTab" name="two"
                 label="Trailer 2"/>
          <q-tab v-if="$const.ZYPE_PREVIEW_ALT2_VIDEO_ID" :ripple="false" content-class="trailerTab" name="three"
                 label="Trailer 3"/>
        </q-tabs>
      </div>

      <div class="grid place-items-center">
        <btn-register/>
      </div>
    </section>

    <section class="center text-center">
      <header>
        <h1>The Movie</h1>
      </header>

      <movie-credits-row/>

      <div class="playerWrap py-16 text-left text-justify">
        <p>
          History is the story of man&apos;s rejection of God and God&apos;s faithfulness to man in the form of a Three
          Act play: God creates, man rebels, God restores. Since ancient times, the pride of man and the lies of Satan
          have convinced man that he has no need for a relationship with his Creator. Despite being made in God's own
          image and likeness, from Adam to Nimrod to our day man has tried to remake the world in his own image. God
          reset the world with the flood and preserved the remnant of righteous Noah and his family. Now, the elites of
          the world are on the brink of implementing their own &ldquo;Great Reset,&rdquo; once again remaking society
          into the image of their own darkened minds and hardened hearts. But this latter day Tower of Babel will not
          stand. Even the current global load of evil is no match for God&apos;s GREATEST RESET, the second coming of
          his Son, Jesus Christ. This documentary film is unlike any to date. No stone is left unturned to explain where
          the current totalitarianism came from, why we are in the state we are in, who is pulling the strings, what is
          coming for humanity, and where to find the Ark to ride out the flood. Remember: Noah was a conspiracy
          theorist. And then it started to rain.
        </p>
      </div>

      <div class="container max-w-screen-sm px-8 py-6 mx-auto border rounded border-white/30">
        <form-mailchimp/>
      </div>

      <div class="grid place-items-center">
        <btn-register/>
      </div>
    </section>

    <section>
      <header class="text-center">
        <h1>Vital Interviews Include</h1>
      </header>

      <!-- parallax bios start -->
      <div
        v-for="(item, index) in bios" :key="index"
        class="
          relative bg-cover bg-center
          md:min-h-[400px]
          after:absolute after:inset-0 after:w-full after:h-full after:z-[1] after:bg-black/60
        "
        :style="{
          'background-image': `url(/img/home/bios/${item.bg})`,
          'background-attachment': $q.platform.is.ios ? 'unset' : 'fixed'
        }"
      >
        <div
          class="!flex flex-wrap relative z-[2] text-white py-12 px-10 md:px-12"
          :class="{
            ['text-center mx-auto']: index === 0,
            ['bio-right']: index % 2 !== 0,
            ['text-left']: index % 2 === 0,
          }"
        >
          <div
            class="bio-text w-full max-w-3xl block text-3xl italic font-normal mb-2"
            v-html="item.bio"
          ></div>
          <div class="w-full text-xl md:text-3xl font-bold pt-8">{{ item.name }}</div>
        </div>
      </div>
    </section>

    <section class="center text-center">
      <header>
        <h1 class="mb-20">Tell Your Friends About the Movie</h1>
      </header>

      <social-buttons/>

      <q-btn
        color="primary"
        label="Contact Us"
        size="xl"
        :to="{ name: 'Contact' }"
        class="mt-10"
      />

      <div class="grid place-items-center">
        <btn-register/>
      </div>
    </section>

    <footer class="p-12 bg-dark">
      <div class="max-w-md mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 186 12" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
             style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
              <g transform="matrix(1.36962,0,0,1.36962,-357.566,-376.701)">
                  <g transform="matrix(12,0,0,12,261.021,283.585)">
                      <path
                        d="M0.244,-0.613L0.004,-0.613L0.004,-0.7L0.583,-0.7L0.583,-0.613L0.343,-0.613L0.343,-0L0.244,-0L0.244,-0.613Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,268.065,283.585)">
                      <path
                        d="M0.707,-0.7L0.707,-0L0.607,-0L0.607,-0.312L0.205,-0.312L0.205,-0L0.105,-0L0.105,-0.7L0.205,-0.7L0.205,-0.399L0.607,-0.399L0.607,-0.7L0.707,-0.7Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,277.809,283.585)">
                      <path
                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,289.077,283.585)">
                      <path
                        d="M0.556,-0.361L0.704,-0.361L0.704,-0.077C0.666,-0.048 0.622,-0.026 0.572,-0.011C0.522,0.004 0.472,0.012 0.421,0.012C0.348,0.012 0.283,-0.004 0.225,-0.035C0.167,-0.066 0.122,-0.109 0.089,-0.164C0.055,-0.219 0.039,-0.281 0.039,-0.35C0.039,-0.419 0.055,-0.482 0.089,-0.537C0.122,-0.592 0.167,-0.634 0.226,-0.666C0.285,-0.697 0.351,-0.712 0.424,-0.712C0.485,-0.712 0.541,-0.702 0.591,-0.681C0.641,-0.66 0.683,-0.63 0.717,-0.591L0.613,-0.495C0.563,-0.548 0.503,-0.574 0.432,-0.574C0.387,-0.574 0.348,-0.565 0.313,-0.546C0.278,-0.527 0.251,-0.501 0.232,-0.467C0.213,-0.433 0.203,-0.394 0.203,-0.35C0.203,-0.307 0.213,-0.268 0.232,-0.234C0.251,-0.2 0.278,-0.173 0.313,-0.155C0.347,-0.135 0.386,-0.126 0.43,-0.126C0.477,-0.126 0.519,-0.136 0.556,-0.156L0.556,-0.361Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,298.329,283.585)">
                      <path
                        d="M0.529,-0L0.394,-0.195L0.245,-0.195L0.245,-0L0.083,-0L0.083,-0.7L0.386,-0.7C0.448,-0.7 0.502,-0.69 0.548,-0.669C0.593,-0.648 0.628,-0.619 0.653,-0.581C0.678,-0.543 0.69,-0.498 0.69,-0.446C0.69,-0.394 0.678,-0.349 0.653,-0.312C0.627,-0.274 0.592,-0.245 0.546,-0.225L0.703,-0L0.529,-0ZM0.526,-0.446C0.526,-0.485 0.513,-0.516 0.488,-0.537C0.463,-0.558 0.426,-0.568 0.377,-0.568L0.245,-0.568L0.245,-0.324L0.377,-0.324C0.426,-0.324 0.463,-0.335 0.488,-0.356C0.513,-0.377 0.526,-0.407 0.526,-0.446Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,307.149,283.585)">
                      <path
                        d="M0.625,-0.13L0.625,-0L0.083,-0L0.083,-0.7L0.612,-0.7L0.612,-0.57L0.244,-0.57L0.244,-0.418L0.569,-0.418L0.569,-0.292L0.244,-0.292L0.244,-0.13L0.625,-0.13Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,315.201,283.585)">
                      <path
                        d="M0.544,-0.15L0.219,-0.15L0.157,-0L-0.009,-0L0.303,-0.7L0.463,-0.7L0.776,-0L0.606,-0L0.544,-0.15ZM0.493,-0.273L0.382,-0.541L0.271,-0.273L0.493,-0.273Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,323.973,283.585)">
                      <path
                        d="M0.228,-0.568L0.004,-0.568L0.004,-0.7L0.614,-0.7L0.614,-0.568L0.39,-0.568L0.39,-0L0.228,-0L0.228,-0.568Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,331.389,283.585)">
                      <path
                        d="M0.625,-0.13L0.625,-0L0.083,-0L0.083,-0.7L0.612,-0.7L0.612,-0.57L0.244,-0.57L0.244,-0.418L0.569,-0.418L0.569,-0.292L0.244,-0.292L0.244,-0.13L0.625,-0.13Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,339.441,283.585)">
                      <path
                        d="M0.313,0.012C0.258,0.012 0.204,0.005 0.153,-0.011C0.101,-0.025 0.059,-0.045 0.028,-0.069L0.083,-0.191C0.113,-0.169 0.149,-0.151 0.19,-0.138C0.231,-0.125 0.273,-0.118 0.314,-0.118C0.36,-0.118 0.394,-0.125 0.416,-0.139C0.438,-0.152 0.449,-0.17 0.449,-0.193C0.449,-0.21 0.443,-0.224 0.43,-0.235C0.417,-0.246 0.4,-0.254 0.38,-0.261C0.359,-0.268 0.332,-0.275 0.297,-0.283C0.244,-0.296 0.2,-0.308 0.166,-0.321C0.132,-0.334 0.103,-0.354 0.079,-0.382C0.054,-0.41 0.042,-0.447 0.042,-0.494C0.042,-0.535 0.053,-0.572 0.075,-0.605C0.097,-0.638 0.13,-0.664 0.175,-0.683C0.219,-0.702 0.273,-0.712 0.337,-0.712C0.382,-0.712 0.425,-0.707 0.468,-0.696C0.511,-0.685 0.548,-0.67 0.58,-0.65L0.53,-0.527C0.465,-0.564 0.401,-0.582 0.336,-0.582C0.291,-0.582 0.257,-0.575 0.236,-0.56C0.214,-0.545 0.203,-0.526 0.203,-0.502C0.203,-0.478 0.216,-0.46 0.241,-0.449C0.266,-0.437 0.304,-0.425 0.355,-0.414C0.408,-0.401 0.452,-0.389 0.486,-0.376C0.52,-0.363 0.549,-0.343 0.574,-0.316C0.598,-0.289 0.61,-0.252 0.61,-0.205C0.61,-0.165 0.599,-0.128 0.577,-0.096C0.554,-0.063 0.521,-0.036 0.476,-0.017C0.431,0.002 0.377,0.012 0.313,0.012Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,346.977,283.585)">
                      <path
                        d="M0.228,-0.568L0.004,-0.568L0.004,-0.7L0.614,-0.7L0.614,-0.568L0.39,-0.568L0.39,-0L0.228,-0L0.228,-0.568Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,357.621,283.585)">
                      <path
                        d="M0.573,-0L0.422,-0.215C0.403,-0.214 0.389,-0.213 0.378,-0.213L0.205,-0.213L0.205,-0L0.105,-0L0.105,-0.7L0.378,-0.7C0.469,-0.7 0.54,-0.678 0.592,-0.635C0.644,-0.592 0.67,-0.532 0.67,-0.456C0.67,-0.402 0.657,-0.356 0.63,-0.318C0.603,-0.28 0.565,-0.252 0.516,-0.235L0.682,-0L0.573,-0ZM0.375,-0.298C0.438,-0.298 0.487,-0.312 0.52,-0.339C0.553,-0.366 0.57,-0.405 0.57,-0.456C0.57,-0.507 0.553,-0.546 0.52,-0.573C0.487,-0.6 0.438,-0.613 0.375,-0.613L0.205,-0.613L0.205,-0.298L0.375,-0.298Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,366.345,283.585)">
                      <path
                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,374.385,283.585)">
                      <path
                        d="M0.309,0.008C0.256,0.008 0.206,-0 0.157,-0.017C0.108,-0.033 0.069,-0.054 0.041,-0.08L0.078,-0.158C0.105,-0.134 0.139,-0.115 0.181,-0.1C0.222,-0.085 0.265,-0.077 0.309,-0.077C0.367,-0.077 0.41,-0.087 0.439,-0.107C0.468,-0.126 0.482,-0.152 0.482,-0.185C0.482,-0.209 0.474,-0.229 0.459,-0.244C0.443,-0.259 0.424,-0.27 0.401,-0.278C0.378,-0.286 0.345,-0.295 0.303,-0.305C0.25,-0.318 0.208,-0.33 0.176,-0.343C0.143,-0.356 0.116,-0.375 0.093,-0.402C0.07,-0.428 0.058,-0.463 0.058,-0.508C0.058,-0.545 0.068,-0.579 0.088,-0.609C0.107,-0.639 0.137,-0.663 0.177,-0.681C0.217,-0.699 0.267,-0.708 0.326,-0.708C0.367,-0.708 0.408,-0.703 0.448,-0.692C0.488,-0.681 0.522,-0.666 0.551,-0.646L0.518,-0.566C0.489,-0.585 0.457,-0.599 0.424,-0.609C0.391,-0.618 0.358,-0.623 0.326,-0.623C0.269,-0.623 0.227,-0.613 0.199,-0.592C0.17,-0.571 0.156,-0.545 0.156,-0.512C0.156,-0.488 0.164,-0.468 0.18,-0.454C0.196,-0.439 0.216,-0.427 0.24,-0.419C0.263,-0.41 0.295,-0.401 0.336,-0.392C0.389,-0.379 0.431,-0.367 0.463,-0.354C0.495,-0.341 0.523,-0.322 0.546,-0.296C0.568,-0.27 0.58,-0.235 0.58,-0.191C0.58,-0.154 0.57,-0.121 0.55,-0.091C0.53,-0.06 0.5,-0.036 0.459,-0.019C0.418,-0.001 0.368,0.008 0.309,0.008Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,381.837,283.585)">
                      <path
                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
                <g transform="matrix(12,0,0,12,389.877,283.585)">
                      <path
                        d="M0.244,-0.613L0.004,-0.613L0.004,-0.7L0.583,-0.7L0.583,-0.613L0.343,-0.613L0.343,-0L0.244,-0L0.244,-0.613Z"
                        style="fill:white;fill-rule:nonzero;"/>
                  </g>
              </g>
            </svg>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import * as $const from 'src/constants'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { delay } from 'lodash'
import { get, set } from '@vueuse/core'
import { useMeta } from 'quasar'
import MovieCreditsRow from 'components/MovieCreditsRow'
import FormMailchimp from 'components/FormMailchimp'
import SocialButtons from 'components/SocialButtons'
import BtnRegister from 'components/BtnRegister'

const route = useRoute()

let showLoadingDelayId = null
const showPreviewLoading = ref(true)
const previewTab = ref(route.meta?.previewTab)

onMounted(() => {
  showPreviewLoading.value = true
  // fake a loading animation while the zype video is added by their script.
  showLoadingDelayId = delay(() => {
    set(showPreviewLoading, false)
    showLoadingDelayId = false
  }, 2000)
})

onBeforeRouteLeave((to, from, next) => {
  set(showPreviewLoading, false)
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
        authParam: 'api_key',
        auth: $const.ZYPE_PLAYER_KEY
      })
    }
  }

  if ($const.ZYPE_PREVIEW_ALT1_VIDEO_ID && get(previewTab) === 'two') {
    meta.script.previewVideo2 = {
      src: $const.VIDEO_SRC_TEMPLATE({
        vid: $const.ZYPE_PREVIEW_ALT1_VIDEO_ID,
        authParam: 'api_key',
        auth: $const.ZYPE_PLAYER_KEY
      })
    }
  }
  if ($const.ZYPE_PREVIEW_ALT2_VIDEO_ID && get(previewTab) === 'three') {
    meta.script.previewVideo3 = {
      src: $const.VIDEO_SRC_TEMPLATE({
        vid: $const.ZYPE_PREVIEW_ALT2_VIDEO_ID,
        authParam: 'api_key',
        auth: $const.ZYPE_PLAYER_KEY
      })
    }
  }

  if (showLoadingDelayId) clearTimeout(showLoadingDelayId)
  set(showPreviewLoading, true)
  // fake a loading animation while the zype video is added by their script.
  showLoadingDelayId = delay(() => {
    set(showPreviewLoading, false)
    showLoadingDelayId = false
  }, 2000)

  return meta
})

const bios = [
  {
    name: 'Robert F Kennedy Jr.',
    bio: '<p>Robert F Kennedy Jr. is an American environmental lawyer, author, and chairman of Children&apos;s Health Defense. Kennedy is a son of U.S. senator Robert F. Kennedy and a nephew of President John F. Kennedy.</p>',
    bg: 'kennedyjr.jpg'
  },
  {
    name: 'Carlo Maria Viganò',
    bio: '<p>Carlo Maria Viganò is an archbishop of the Catholic Church who served as the Apostolic Nuncio to the United States from 19 October 2011 to 12 April 2016. He has been outspoken about the secret societies and elites that have influenced the Catholic Church and affect global politics.</p>',
    bg: 'vigano.jpg'
  },
  {
    name: 'Dr Judy Mikovits',
    bio: '<p>Dr Judy Mikovits a twenty&ndash;year veteran of the National Cancer Institute, worked at Fort Detrick and worked for years with Anthony Fauci at NIH.</p>',
    bg: 'mikovits.jpg'
  },
  {
    name: 'G. Edward Griffin',
    bio: '<p>G. Edward Griffin is a writer, documentary film producer, and Founder of Freedom Force International. Listed in Who’s Who in America, he is well known because of his talent for researching difficult topics and presenting them in clear terms that all can understand.</p>',
    bg: 'griffin.jpg'
  },
  {
    name: 'Gerald Celente',
    bio: '<p>Gerald Celente is the founder/director of the Trends Research Institute and publisher of the Weekly Trends Journal magazine. He is the author of the highly acclaimed and best&ndash;selling books &ldquo;Trend Tracking&rdquo; and &ldquo;Trends 2000&rdquo;</p><p>Self&ndash;described as a &ldquo;Warrior for the Prince of Peace,&rdquo; Gerald Celente is also the founder of &ldquo;Occupy Peace &amp; Freedom,&rdquo; a not&ndash;for&ndash;profit movement to honor the constitution and bill of rights and restore freedoms.</p>',
    bg: 'celente.jpg'
  },
  {
    name: 'Dane Wigington',
    bio: '<p>Dane Wigington is the executive producer for the ground breaking climate engineering documentary, &ldquo;the dimming&rdquo;. he has a background in solar energy and was a former employee of Bechtel Power Corporation. Dane was also a licensed contractor in California and Arizona.</p>',
    bg: 'wigington.jpg'
  },
  {
    name: 'Rosa Koire',
    bio: '<p>Rosa Koire is a retired forensic commercial real estate appraiser specializing in eminent domain valuation. Rosa speaks internationally on UN agenda 21, blogs regularly on the Democrats website, and is the author of behind The Green Mask: UN Agenda 21.</p>',
    bg: 'koire.jpg'
  },
  // Removed Doug per Rick - 10/11/2021
  // {
  //   name: 'Douglas Gabriel, PHD',
  //   bio: '<p>Douglas Gabriel, PHD is a retired Superintendent of Schools and Professor of Education who has worked with schools and organizations throughout the world. He has authored eleven books ranging from teacher training manuals to philosophical/spiritual works on the nature of the divine feminine. He was a Waldorf class teacher and administrator at the Detroit Waldorf School and taught courses at Mercy College, the University of Detroit, and Wayne State University for decades.</p>',
  //   bg: 'gabriel.jpg'
  // },
  {
    name: 'Michael McKibben',
    bio: '<p>Michael McKibben&apos;s career spans two phases: international christian music ministry, and technology innovation. In 2006, he was awarded U.S. patent no. 7,139,761 for what is now called &ldquo;social networking.&rdquo; he credits his earlier ministry experience with the inspiration to conceive perhaps one of the most important inventions since Thomas Edison&apos;s light bulb.</p>',
    bg: 'mckibben.jpg'
  },
  {
    name: 'Whitney Webb',
    bio: '<p>Whitney Webb has been a professional writer, researcher and journalist since 2016. She has written for several websites and, from 2017 to 2020, was a staff writer and senior investigative reporter for Mint Press News. She currently writes for the Last American Vagabond.</p>',
    bg: 'webb.jpg'
  },
  {
    name: 'Johnny Vedmore',
    bio: '<p>Johnny Vedmore is a completely independent investigative journalist and musician from Cardiff, Wales. His work aims to expose the powerful people who are overlooked by other journalists and bring new information to his readers.</p>',
    bg: 'vedmore.jpg'
  },
  {
    name: 'Peter A. Mccullough M.D., M.P.H',
    bio: '<p>Peter A. Mccullough, M.D., M.P.H.; Vice Chief of Internal Medicine: Dr. Peter Mccullough is probably among the most published physician scientists in the world and published one of the first papers on the treatment of covid&ndash;19 in the american journal of medicine.</p>',
    bg: 'mccallaugh.jpg'
  },
  {
    name: 'Vladimir Zelenko, M.D.',
    bio: '<p>Zelenko protocol innovator: 99% survival of high risk covid&ndash;19 patients</p><ul class="list-disc list-inside"> <li>Nominated for the Presidential Medal of Freedom</li><li>Recognized as a hero at U.S. Senate Homeland Security committee hearing</li><li>Published in top peer reviewed journals with world renowned physicians</li><li>Provided counsel to White House personnel, multiple governments, hospitals, physicians, public figures</li><li>Board certified family physician with over 20 years experience</li></ul>',
    bg: 'zelenko.jpg'
  },
  {
    name: 'Peter R. Breggin, MD',
    bio: '<p>Peter R. Breggin md is a Harvard&ndash;trained psychiatrist and former consultant at NIMH and for the FAA. He is known as &ldquo;The Conscience of Psychiatry&rdquo; for his many decades of successful efforts to reform the mental health field.</p>',
    bg: 'breggin.jpg'
  },
  {
    name: 'Patrick Coffin',
    bio: '<p>Patrick is the author of four books and was, for almost eight years, the host of the top&ndash;rated radio show, Catholic Answers Live. Founder of the Truth Over Fear summit which is an event produced by Patrick Coffin Media, LLC. PCM is an independent media platform that produces &ldquo;The Patrick Coffin Show&rdquo; and The Membership Site Coffin Nation.</p>',
    bg: 'coffin.jpg'
  },
  {
    name: 'Timothy J. Gordon J.D., PH.L.',
    bio: '<p>Studied philosophy in Pontifical Graduate Universities in Europe, taught it at Southern Californian Community Colleges, and then went on to law school. He holds degrees in literature, history, philosophy, and law. Currently, Gordon is considered one of the Godfathers of &ldquo;bro&ndash;man&rdquo; Catholicism and host of Rules for Retrogrades.</p>',
    bg: 'gordon.jpg'
  },
  {
    name: 'Tony Roman',
    bio: '<p>Restaurant owner of Basilico&apos;s Restaurant in Huntington Beach, CA, not only decided to never shut down, but doesn&apos;t allow people with masks to enter the premises.</p>',
    bg: 'roman.jpg'
  },
  {
    name: 'David L. Gray',
    bio: '<p>David L. Gray is a former 32nd degree Freemason. He now is an author and theologian, he&apos;s specializing in the disciplines of Liturgical, Christology, Pneumatology, Ecclesiology, Sacramental Theology, and the Gospel of John.</p>',
    bg: 'gray.jpg'
  },
  {
    name: 'David Lynn',
    bio: '<p>David Lynn is a Canadian Pastor and Street Preacher based out of Toronto, Ontario and is founder of Christ&apos;s Forgiveness Ministries and Christian Positive Space.</p>',
    bg: 'lynn.jpg'
  },
  {
    name: 'Rob Skiba',
    bio: '<p>Rob Skiba is an award winning documentary filmmaker and the best selling author of several books including: Babylon Rising: And The First Shall Be Last and Archon Invasion: The Rise, Fall and Return of the Nephilim.</p>',
    bg: 'skiba.jpg'
  },
  {
    name: 'Miklos Lukacs',
    bio: '<p>Miklos Lukacs is a Doctor (PhD) in Management and MSc in Innovation Management from the Alliance Manchester Business School (MBS) as well as a professor. He is a preeminent voice on Transhumanism, Artificial Intelligence and the 4th Industrial Revolution.</p>',
    bg: 'lukacs.jpg'
  },
  {
    name: 'Dr. Carrie Madej',
    bio: '<p>Dr. Carrie Madej is an Osteopathic Internal Medicine Doctor. She received her medical degree from Kansas City University of Medical Biosciences in 2001.</p>',
    bg: 'madej.jpg'
  },
  {
    name: 'George Gammon',
    bio: '<p>George Gammon is a Real Estate Investor, entrepreneur and teacher of macro economics on YouTube. Host of The Rebel Capitalist Show.</p>',
    bg: 'gammon.jpg'
  }
]

</script>

<style lang="scss">
// did our own scoping manually because of the v-html used on the bios and it can't pick up the scoped style.
.PageIndex {
  .trailerTab .q-tab__label {
    @apply font-bold;
    @apply sm:tracking-widest;
  }

  .bio-right {
    @apply text-right justify-end;
  }

  // p tags are added via v-html
  .bio-text {
    & p, & li {
      @apply text-base leading-normal;
      @apply md:text-2xl md:leading-loose;
    }
  }
}
</style>
