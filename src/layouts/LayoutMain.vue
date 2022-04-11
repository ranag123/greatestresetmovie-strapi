<template>
  <q-layout view="lHh lpR lFr">
    <q-header class="!flex justify-center bg-dark">
      <q-toolbar class="pr-0 md:pl-0">
        <q-btn
          flat dense
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="lt-md mx-2"
        />

        <btn-top-nav :dense="denseTopNavItems" to="/" :ripple="false">
          <!-- NOTE: If you change this svg, it is in the store also -->
<!--          <svg width="100%" height="100%" viewBox="0 0 186 12" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
<!--               xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"-->
<!--               style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">-->
<!--              <g transform="matrix(1.36962,0,0,1.36962,-357.566,-376.701)">-->
<!--                  <g transform="matrix(12,0,0,12,261.021,283.585)">-->
<!--                      <path-->
<!--                        d="M0.244,-0.613L0.004,-0.613L0.004,-0.7L0.583,-0.7L0.583,-0.613L0.343,-0.613L0.343,-0L0.244,-0L0.244,-0.613Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,268.065,283.585)">-->
<!--                      <path-->
<!--                        d="M0.707,-0.7L0.707,-0L0.607,-0L0.607,-0.312L0.205,-0.312L0.205,-0L0.105,-0L0.105,-0.7L0.205,-0.7L0.205,-0.399L0.607,-0.399L0.607,-0.7L0.707,-0.7Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,277.809,283.585)">-->
<!--                      <path-->
<!--                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,289.077,283.585)">-->
<!--                      <path-->
<!--                        d="M0.556,-0.361L0.704,-0.361L0.704,-0.077C0.666,-0.048 0.622,-0.026 0.572,-0.011C0.522,0.004 0.472,0.012 0.421,0.012C0.348,0.012 0.283,-0.004 0.225,-0.035C0.167,-0.066 0.122,-0.109 0.089,-0.164C0.055,-0.219 0.039,-0.281 0.039,-0.35C0.039,-0.419 0.055,-0.482 0.089,-0.537C0.122,-0.592 0.167,-0.634 0.226,-0.666C0.285,-0.697 0.351,-0.712 0.424,-0.712C0.485,-0.712 0.541,-0.702 0.591,-0.681C0.641,-0.66 0.683,-0.63 0.717,-0.591L0.613,-0.495C0.563,-0.548 0.503,-0.574 0.432,-0.574C0.387,-0.574 0.348,-0.565 0.313,-0.546C0.278,-0.527 0.251,-0.501 0.232,-0.467C0.213,-0.433 0.203,-0.394 0.203,-0.35C0.203,-0.307 0.213,-0.268 0.232,-0.234C0.251,-0.2 0.278,-0.173 0.313,-0.155C0.347,-0.135 0.386,-0.126 0.43,-0.126C0.477,-0.126 0.519,-0.136 0.556,-0.156L0.556,-0.361Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,298.329,283.585)">-->
<!--                      <path-->
<!--                        d="M0.529,-0L0.394,-0.195L0.245,-0.195L0.245,-0L0.083,-0L0.083,-0.7L0.386,-0.7C0.448,-0.7 0.502,-0.69 0.548,-0.669C0.593,-0.648 0.628,-0.619 0.653,-0.581C0.678,-0.543 0.69,-0.498 0.69,-0.446C0.69,-0.394 0.678,-0.349 0.653,-0.312C0.627,-0.274 0.592,-0.245 0.546,-0.225L0.703,-0L0.529,-0ZM0.526,-0.446C0.526,-0.485 0.513,-0.516 0.488,-0.537C0.463,-0.558 0.426,-0.568 0.377,-0.568L0.245,-0.568L0.245,-0.324L0.377,-0.324C0.426,-0.324 0.463,-0.335 0.488,-0.356C0.513,-0.377 0.526,-0.407 0.526,-0.446Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,307.149,283.585)">-->
<!--                      <path-->
<!--                        d="M0.625,-0.13L0.625,-0L0.083,-0L0.083,-0.7L0.612,-0.7L0.612,-0.57L0.244,-0.57L0.244,-0.418L0.569,-0.418L0.569,-0.292L0.244,-0.292L0.244,-0.13L0.625,-0.13Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,315.201,283.585)">-->
<!--                      <path-->
<!--                        d="M0.544,-0.15L0.219,-0.15L0.157,-0L-0.009,-0L0.303,-0.7L0.463,-0.7L0.776,-0L0.606,-0L0.544,-0.15ZM0.493,-0.273L0.382,-0.541L0.271,-0.273L0.493,-0.273Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,323.973,283.585)">-->
<!--                      <path-->
<!--                        d="M0.228,-0.568L0.004,-0.568L0.004,-0.7L0.614,-0.7L0.614,-0.568L0.39,-0.568L0.39,-0L0.228,-0L0.228,-0.568Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,331.389,283.585)">-->
<!--                      <path-->
<!--                        d="M0.625,-0.13L0.625,-0L0.083,-0L0.083,-0.7L0.612,-0.7L0.612,-0.57L0.244,-0.57L0.244,-0.418L0.569,-0.418L0.569,-0.292L0.244,-0.292L0.244,-0.13L0.625,-0.13Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,339.441,283.585)">-->
<!--                      <path-->
<!--                        d="M0.313,0.012C0.258,0.012 0.204,0.005 0.153,-0.011C0.101,-0.025 0.059,-0.045 0.028,-0.069L0.083,-0.191C0.113,-0.169 0.149,-0.151 0.19,-0.138C0.231,-0.125 0.273,-0.118 0.314,-0.118C0.36,-0.118 0.394,-0.125 0.416,-0.139C0.438,-0.152 0.449,-0.17 0.449,-0.193C0.449,-0.21 0.443,-0.224 0.43,-0.235C0.417,-0.246 0.4,-0.254 0.38,-0.261C0.359,-0.268 0.332,-0.275 0.297,-0.283C0.244,-0.296 0.2,-0.308 0.166,-0.321C0.132,-0.334 0.103,-0.354 0.079,-0.382C0.054,-0.41 0.042,-0.447 0.042,-0.494C0.042,-0.535 0.053,-0.572 0.075,-0.605C0.097,-0.638 0.13,-0.664 0.175,-0.683C0.219,-0.702 0.273,-0.712 0.337,-0.712C0.382,-0.712 0.425,-0.707 0.468,-0.696C0.511,-0.685 0.548,-0.67 0.58,-0.65L0.53,-0.527C0.465,-0.564 0.401,-0.582 0.336,-0.582C0.291,-0.582 0.257,-0.575 0.236,-0.56C0.214,-0.545 0.203,-0.526 0.203,-0.502C0.203,-0.478 0.216,-0.46 0.241,-0.449C0.266,-0.437 0.304,-0.425 0.355,-0.414C0.408,-0.401 0.452,-0.389 0.486,-0.376C0.52,-0.363 0.549,-0.343 0.574,-0.316C0.598,-0.289 0.61,-0.252 0.61,-0.205C0.61,-0.165 0.599,-0.128 0.577,-0.096C0.554,-0.063 0.521,-0.036 0.476,-0.017C0.431,0.002 0.377,0.012 0.313,0.012Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,346.977,283.585)">-->
<!--                      <path-->
<!--                        d="M0.228,-0.568L0.004,-0.568L0.004,-0.7L0.614,-0.7L0.614,-0.568L0.39,-0.568L0.39,-0L0.228,-0L0.228,-0.568Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,357.621,283.585)">-->
<!--                      <path-->
<!--                        d="M0.573,-0L0.422,-0.215C0.403,-0.214 0.389,-0.213 0.378,-0.213L0.205,-0.213L0.205,-0L0.105,-0L0.105,-0.7L0.378,-0.7C0.469,-0.7 0.54,-0.678 0.592,-0.635C0.644,-0.592 0.67,-0.532 0.67,-0.456C0.67,-0.402 0.657,-0.356 0.63,-0.318C0.603,-0.28 0.565,-0.252 0.516,-0.235L0.682,-0L0.573,-0ZM0.375,-0.298C0.438,-0.298 0.487,-0.312 0.52,-0.339C0.553,-0.366 0.57,-0.405 0.57,-0.456C0.57,-0.507 0.553,-0.546 0.52,-0.573C0.487,-0.6 0.438,-0.613 0.375,-0.613L0.205,-0.613L0.205,-0.298L0.375,-0.298Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,366.345,283.585)">-->
<!--                      <path-->
<!--                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,374.385,283.585)">-->
<!--                      <path-->
<!--                        d="M0.309,0.008C0.256,0.008 0.206,-0 0.157,-0.017C0.108,-0.033 0.069,-0.054 0.041,-0.08L0.078,-0.158C0.105,-0.134 0.139,-0.115 0.181,-0.1C0.222,-0.085 0.265,-0.077 0.309,-0.077C0.367,-0.077 0.41,-0.087 0.439,-0.107C0.468,-0.126 0.482,-0.152 0.482,-0.185C0.482,-0.209 0.474,-0.229 0.459,-0.244C0.443,-0.259 0.424,-0.27 0.401,-0.278C0.378,-0.286 0.345,-0.295 0.303,-0.305C0.25,-0.318 0.208,-0.33 0.176,-0.343C0.143,-0.356 0.116,-0.375 0.093,-0.402C0.07,-0.428 0.058,-0.463 0.058,-0.508C0.058,-0.545 0.068,-0.579 0.088,-0.609C0.107,-0.639 0.137,-0.663 0.177,-0.681C0.217,-0.699 0.267,-0.708 0.326,-0.708C0.367,-0.708 0.408,-0.703 0.448,-0.692C0.488,-0.681 0.522,-0.666 0.551,-0.646L0.518,-0.566C0.489,-0.585 0.457,-0.599 0.424,-0.609C0.391,-0.618 0.358,-0.623 0.326,-0.623C0.269,-0.623 0.227,-0.613 0.199,-0.592C0.17,-0.571 0.156,-0.545 0.156,-0.512C0.156,-0.488 0.164,-0.468 0.18,-0.454C0.196,-0.439 0.216,-0.427 0.24,-0.419C0.263,-0.41 0.295,-0.401 0.336,-0.392C0.389,-0.379 0.431,-0.367 0.463,-0.354C0.495,-0.341 0.523,-0.322 0.546,-0.296C0.568,-0.27 0.58,-0.235 0.58,-0.191C0.58,-0.154 0.57,-0.121 0.55,-0.091C0.53,-0.06 0.5,-0.036 0.459,-0.019C0.418,-0.001 0.368,0.008 0.309,0.008Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,381.837,283.585)">-->
<!--                      <path-->
<!--                        d="M0.613,-0.087L0.613,-0L0.105,-0L0.105,-0.7L0.599,-0.7L0.599,-0.613L0.205,-0.613L0.205,-0.398L0.556,-0.398L0.556,-0.313L0.205,-0.313L0.205,-0.087L0.613,-0.087Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--                <g transform="matrix(12,0,0,12,389.877,283.585)">-->
<!--                      <path-->
<!--                        d="M0.244,-0.613L0.004,-0.613L0.004,-0.7L0.583,-0.7L0.583,-0.613L0.343,-0.613L0.343,-0L0.244,-0L0.244,-0.613Z"-->
<!--                        style="fill:white;fill-rule:nonzero;"/>-->
<!--                  </g>-->
<!--              </g>-->
<!--            </svg>-->
          <img src="img/sitelogo-top.png" style="min-width: 140px">
        </btn-top-nav>

        <q-space/>

        <!-- NOTE: These buttons hide on small screens. -->
        <!-- REMINDER: Don't forget about the small screen left drawer nav links! -->
        <div class="!flex self-stretch gt-sm">
          <btn-top-nav :to="{ name: 'Home' }" label="Home" class="gt-sm"/>

          <btn-top-nav :to="{ name: 'Watch' }" class="gt-sm">
            Watch<span class="gt-sm">&nbsp;Movie</span>
          </btn-top-nav>

          <!-- Auth buttons -->
          <btn-top-nav v-if="userStore.isAuthenticated" label="Sign Out" @click="userStore.signOut"/>
          <template v-else>
            <btn-top-nav label="Register" :to="{ name: 'AuthRegister' }" class="gt-sm"/>
            <btn-top-nav label="Sign In" :to="{ name: AUTH_ROUTE_NAME }" class="gt-sm"/>
          </template>

          <btn-top-nav :to="{ name: 'Contact' }" class="gt-sm">
            Contact<span class="gt-sm">&nbsp;Us</span>
          </btn-top-nav>

          <btn-top-nav color="accent" @click="openDonationDialog">
            <span class="font-bold">Donate</span>
          </btn-top-nav>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      elevated
      v-model="leftDrawerOpen"
      behavior="mobile"
    >
      <q-scroll-area class="w-full h-full">
        <div class="!flex justify-end pt-2 pr-2">
          <q-btn
            flat dense
            icon="close"
            aria-label="Close"
            @click="leftDrawerOpen = false"
          />
        </div>

        <q-list padding class="text-white">
          <q-item
            v-for="item in leftDrawerLinks" :key="item.label"
            v-ripple
            clickable :to="item?.to"
            active-class="text-white"
            @click="item?.click"
          >
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="pb-32">
        <router-view/>
      </div>
    </q-page-container>

    <q-footer class="!flex justify-center md:justify-end bg-dark flex-nowrap shadow-up-20" style="height: 30px">
      <!--          <q-btn no-caps no-wrap flat stretch class="OpenSans" size="sm" type="a" :to="{ name: 'Policies' }" label="Policies" :ripple="false"/>-->
      <q-btn no-caps no-wrap flat stretch class="OpenSans" size="sm" type="a" :to="{ name: 'Privacy' }"
             label="Privacy" :ripple="false"/>
      <q-btn no-caps no-wrap flat stretch class="OpenSans" size="sm" type="a" :to="{ name: 'Terms' }"
             label="Terms & Conditions" :ripple="false"/>
    </q-footer>

  </q-layout>
</template>

<script setup>
import BtnTopNav from 'components/BtnTopNav'
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'src/stores/user'
import { AUTH_ROUTE_NAME } from 'src/router/routes'
import { openDonationDialog } from 'src/util/donate'

const $q = useQuasar()
const userStore = useUserStore()

const leftDrawerOpen = ref(false)
const leftDrawerLinks = computed(() => {
  let links = [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: 'Watch Movie',
      to: { name: 'Watch' }
    }
  ]

  if (userStore.isAuthenticated) {
    links.push({
      label: 'Sign Out',
      click: userStore.signOut
    })
  } else {
    links = links.concat([
      {
        label: 'Register',
        to: { name: 'AuthRegister' }
      },
      {
        label: 'Sign In',
        to: { name: AUTH_ROUTE_NAME }
      }
    ])
  }

  links = links.concat([
    {
      label: 'Contact Us',
      to: { name: 'Contact' }
    },
    {
      label: 'Donate',
      click: openDonationDialog
    }
  ])

  return links
})

const denseTopNavItems = computed(() => $q.screen.lt.sm)
</script>
