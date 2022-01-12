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
          World release 2022
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
    </section>

    <section class="center text-center">
      <header>
        <h1>The Movie</h1>
      </header>

      <movie-credits-row/>

      <div class="playerWrap py-16 text-left text-justify">
        <p>
          From the beginning, Man has allowed his pride and the lies of Satan to convince himself he had no need for
          a relationship with God, his maker. God made Man in his own image and likeness, yet from Adam to Nimrod to
          now, Man has tried to craft the world in his own image. God reset the world with the flood, preserving
          Noah - the only righteous man left on Earth. Now, the elites of the world are on the brink of implementing
          their so called ‘Great Reset’, remaking society into the image of their own darkened minds and hardened
          hearts. They remain unprepared for God’s GREATEST RESET, the second coming of his Son, Jesus Christ. This
          documentary film is unlike any to date. No stone is left unturned to explain where we came from, how we
          got here, who is pulling the strings, why we are in the state we are in, what is coming for humanity, and
          where to find the Ark to ride out the flood. Don’t forget. Noah was a conspiracy theorist as well. And
          then it started to rain.
        </p>
      </div>

      <div class="container max-w-screen-sm px-8 pt-6 mx-auto">
        <mailchimp-form/>
      </div>
    </section>

    <section>
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

      <div class="!flex flex-row flex-wrap justify-center lg:justify-between w-full">

        <div class="social">
          <div class="facebook" @click="util.shareViaFacebook()">
            <div>
              <svg width="49" height="50" viewBox="0 0 49 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24.7441 48.4668C12.1829 48.4668 2 38.0405 2 25.179C2 12.3174 12.1829 1.89111 24.7441 1.89111C37.3053 1.89111 47.4882 12.3174 47.4882 25.179C47.4882 38.0405 37.3053 48.4668 24.7441 48.4668ZM24.7441 48.4668V20.5214C24.7441 17.9491 26.7807 15.8638 29.2929 15.8638H32.7045M16.7837 29.8365H32.7045"
                  stroke="#767676" stroke-width="2.1858"/>
              </svg>
            </div>
            <div class="whitespace-nowrap">Share to Facebook</div>
          </div>
        </div>

        <div class="social">
          <div class="twitter" @click="util.shareViaTweet('WATCH: The Greatest Reset')">
            <div>
              <svg width="49" height="43" viewBox="0 0 49 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M47.418 1.35938L48.4938 1.28876C48.4654 0.855155 48.1794 0.481019 47.7684 0.339782C47.3575 0.198546 46.9019 0.317821 46.6129 0.642316L47.418 1.35938ZM45.252 11.0702C45.252 10.4747 44.7693 9.99204 44.1739 9.99204C43.5784 9.99204 43.0957 10.4747 43.0957 11.0702H45.252ZM24.7441 13.9946V15.0728H25.8222V13.9946H24.7441ZM5.24414 1.35938L6.25505 0.984644C6.10544 0.581029 5.73008 0.305089 5.30021 0.282704C4.87034 0.26032 4.46835 0.495781 4.27762 0.881672L5.24414 1.35938ZM17.9209 31.2246L18.6876 31.9825C18.9491 31.718 19.0557 31.3375 18.9699 30.9756C18.884 30.6138 18.6178 30.3218 18.2654 30.2029L17.9209 31.2246ZM2 37.4601V36.382C1.52597 36.382 1.10755 36.6916 0.968971 37.145C0.830391 37.5983 1.00417 38.0889 1.39717 38.354L2 37.4601ZM41.6919 4.5539L40.8886 5.27299L41.2779 5.7079L41.8549 5.61963L41.6919 4.5539ZM46.3422 1.42999C46.5117 4.01157 46.3615 5.6532 45.9137 6.92829C45.474 8.18038 44.7098 9.18586 43.4241 10.4304L44.9237 11.9797C46.3187 10.6295 47.3495 9.3473 47.9482 7.64279C48.5387 5.96128 48.6703 3.97742 48.4938 1.28876L46.3422 1.42999ZM45.252 13.4613V11.205H43.0957V13.4613H45.252ZM45.252 11.205V11.0702H43.0957V11.205H45.252ZM23.666 11.6973V13.9946H25.8222V11.6973H23.666ZM34.5748 0.281246C28.4659 0.281246 23.666 5.65665 23.666 11.6973H25.8222C25.8222 6.7138 29.7862 2.4375 34.5748 2.4375V0.281246ZM43.0957 13.4613C43.0957 27.9642 31.0506 40.4844 16.7837 40.4844V42.6406C32.3036 42.6406 45.252 29.0919 45.252 13.4613H43.0957ZM4.23323 1.73411C5.96413 6.40354 12.4905 15.0728 24.7441 15.0728V12.9165C13.6398 12.9165 7.7683 5.06691 6.25505 0.984644L4.23323 1.73411ZM4.27762 0.881672C0.93346 7.64781 0.375523 14.2137 2.67867 19.7809C4.98252 25.3498 10.0637 29.7128 17.5764 32.2462L18.2654 30.2029C11.1794 27.8135 6.67807 23.8077 4.67115 18.9566C2.66352 14.1037 3.06654 8.19849 6.21067 1.83708L4.27762 0.881672ZM17.1541 30.4666C15.1438 32.5004 9.4336 36.382 2 36.382V38.5383C10.1383 38.5383 16.3725 34.3246 18.6876 31.9825L17.1541 30.4666ZM42.4952 3.83481C40.5445 1.65567 37.719 0.281246 34.5748 0.281246V2.4375C37.0759 2.4375 39.3266 3.52806 40.8886 5.27299L42.4952 3.83481ZM41.8549 5.61963C44.1987 5.26108 46.4968 4.01468 48.2231 2.07643L46.6129 0.642316C45.2053 2.22273 43.3545 3.20889 41.5289 3.48817L41.8549 5.61963ZM1.39717 38.354C6.49752 41.7938 11.406 42.6406 16.7837 42.6406V40.4844C11.6769 40.4844 7.23492 39.6903 2.60283 36.5663L1.39717 38.354Z"
                  fill="#767676"/>
              </svg>
            </div>
            <div class="whitespace-nowrap">Share to Twitter</div>
          </div>
        </div>

        <div class="social">
          <div class="whatsapp" @click="util.shareViaWhatsapp()">
            <div>
              <svg width="49" height="52" viewBox="0 0 49 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.54817 40.7968L7.57764 41.2799L7.85843 40.6816L7.47757 40.1415L6.54817 40.7968ZM11.0963 45.6425L11.807 44.7547L11.2224 44.2869L10.5617 44.6389L11.0963 45.6425ZM2 50.4883L0.970524 50.0052C0.762485 50.4485 0.861586 50.9752 1.21651 51.3125C1.57144 51.6499 2.10248 51.7222 2.53467 51.492L2 50.4883ZM15.6465 16.5633L14.9366 15.6748C14.6665 15.8906 14.5093 16.2176 14.5093 16.5633H15.6465ZM33.8417 35.949V37.0862C34.1895 37.0862 34.5182 36.927 34.7339 36.6542L33.8417 35.949ZM17.0599 15.4338L16.35 14.5454L16.35 14.5454L17.0599 15.4338ZM20.6814 17.0718L19.5519 17.2043L19.5519 17.2043L20.6814 17.0718ZM21.1945 21.4453L22.324 21.3128L22.324 21.3128L21.1945 21.4453ZM20.5459 23.4593L19.7167 22.6811L19.7167 22.6811L20.5459 23.4593ZM34.85 34.6734L33.9578 33.9682L33.9578 33.9682L34.85 34.6734ZM33.4396 30.7148L33.6148 29.5912L33.6148 29.5912L33.4396 30.7148ZM29.2857 30.0671L29.4609 28.9435L29.2857 30.0671ZM27.3482 30.7513L28.1773 31.5296L28.1773 31.5296L27.3482 30.7513ZM0.862823 26.2561C0.862823 31.949 2.62912 37.2121 5.61877 41.4521L7.47757 40.1415C4.75554 36.281 3.13723 31.4748 3.13723 26.2561H0.862823ZM24.7441 0.886721C11.488 0.886721 0.862823 12.3139 0.862823 26.2561H3.13723C3.13723 13.4321 12.8778 3.16113 24.7441 3.16113V0.886721ZM48.6254 26.2561C48.6254 12.3139 38.0002 0.886721 24.7441 0.886721V3.16113C36.6105 3.16113 46.351 13.4321 46.351 26.2561H48.6254ZM24.7441 51.6255C38.0002 51.6255 48.6254 40.1983 48.6254 26.2561H46.351C46.351 39.0801 36.6105 49.3511 24.7441 49.3511V51.6255ZM10.3857 46.5304C14.3765 49.7246 19.3496 51.6255 24.7441 51.6255V49.3511C19.8971 49.3511 15.4191 47.6459 11.807 44.7547L10.3857 46.5304ZM2.53467 51.492L11.631 46.6462L10.5617 44.6389L1.46533 49.4846L2.53467 51.492ZM5.51869 40.3137L0.970524 50.0052L3.02948 50.9714L7.57764 41.2799L5.51869 40.3137ZM14.5093 16.5633V18.9865H16.7837V16.5633H14.5093ZM31.5673 37.0862H33.8417V34.8118H31.5673V37.0862ZM14.5093 18.9865C14.5093 28.9137 22.0796 37.0862 31.5673 37.0862V34.8118C23.4694 34.8118 16.7837 27.7955 16.7837 18.9865H14.5093ZM16.3564 17.4517L17.7698 16.3222L16.35 14.5454L14.9366 15.6748L16.3564 17.4517ZM19.5519 17.2043L20.0651 21.5778L22.324 21.3128L21.8109 16.9393L19.5519 17.2043ZM19.7167 22.6811L17.0917 25.4779L18.7501 27.0344L21.3751 24.2376L19.7167 22.6811ZM20.0651 21.5778C20.1144 21.9984 19.9757 22.4052 19.7167 22.6811L21.3751 24.2376C22.1087 23.456 22.4487 22.3762 22.324 21.3128L20.0651 21.5778ZM17.7698 16.3222C18.3853 15.8304 19.4265 16.1354 19.5519 17.2043L21.8109 16.9393C21.503 14.3158 18.5286 12.8045 16.35 14.5454L17.7698 16.3222ZM34.7339 36.6542L35.7422 35.3785L33.9578 33.9682L32.9496 35.2438L34.7339 36.6542ZM33.6148 29.5912L29.4609 28.9435L29.1105 31.1908L33.2644 31.8384L33.6148 29.5912ZM26.519 29.9731L23.9149 32.7475L25.5733 34.304L28.1773 31.5296L26.519 29.9731ZM29.4609 28.9435C28.3647 28.7726 27.2745 29.1681 26.519 29.9731L28.1773 31.5296C28.4381 31.2518 28.7847 31.14 29.1105 31.1908L29.4609 28.9435ZM35.7422 35.3785C37.3711 33.3177 36.331 30.0147 33.6148 29.5912L33.2644 31.8384C34.0753 31.9649 34.625 33.1241 33.9578 33.9682L35.7422 35.3785Z"
                  fill="#767676"/>
              </svg>
            </div>
            <div class="whitespace-nowrap">Share to WhatApp</div>
          </div>
        </div>

      </div>
    </section>
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
import MailchimpForm from 'components/MailchimpForm'
import * as util from 'src/util/util'

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
    bio: '<p>Peter A. Mccullough, M.D., M.P.H.; Vice Chief of Internal Medicine: Baylor University Medical Center; Baylor University Medical Center, Dallas, TX; Baylor Heart and Vascular Institute, Dallas, TX; Baylor Jack and Jane Hamilton Heart and Vascular Hospital, Dallas, TX. Dr. Peter Mccullough is probably among the most published physician scientists in the world and published one of the first papers on the treatment of covid&ndash;19 in the american journal of medicine.</p>',
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
    name: 'Miklos Lucaks',
    bio: '<p>Miklos Lucaks is a Doctor (PhD) in Management and MSc in Innovation Management from the Alliance Manchester Business School (MBS) as well as a professor. He is a preeminent voice on Transhumanism, Artificial Intelligence and the 4th Industrial Revolution.</p>',
    bg: 'lucaks.jpg'
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
// did our own scoping manually because of the v-html used on the bios.
.PageIndex {
  //section {
  //  @apply py-28;
  //}

  //section:not(.w-full) {
  //  //@apply container max-w-screen-lg mx-auto text-center;
  //  @apply container max-w-screen-lg mx-auto;
  //}

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

  .social {
    @apply flex justify-center px-10 m-6;
    width: 100%; // cant apply above w-full because of circular dependency
    @apply sm:justify-end sm:w-auto;

    & div:first-child {
      @apply relative flex flex-col items-center justify-between text-base pb-1 cursor-pointer no-underline;
      width: 100%; // cant apply above w-full because of circular dependency
      height: 110px;
      @apply sm:w-auto;
      @apply md:text-xl;

      &::after {
        // bg color that begins as a bottom line.
        content: '';
        position: absolute;
        height: 2px;
        bottom: -10px;
        left: -10px;
        right: -10px;
        z-index: 1;
        border: 1px solid inherit;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        transition: height 0.2s ease-in-out;
      }

      &:hover {
        &:after {
          // animate the bg color up.
          height: 130%;
        }
      }

      & > div {
        // make sure the text & icon are on top of the animation
        position: relative;
        z-index: 2;
      }

      &.facebook {

        path {
          stroke: #3B5998;
        }

        &:after {
          background-color: #3B5998;
        }

        &:hover {
          path {
            stroke: #fff;
          }
        }
      }

      &.twitter {

        path {
          fill: #33CCFF;
        }

        &:after {
          background-color: #33CCFF;
        }

        &:hover {
          path {
            fill: #fff;
          }
        }
      }

      &.whatsapp {

        path {
          fill: #25D366;
        }

        &:after {
          background-color: #25D366;
        }

        &:hover {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
}
</style>
