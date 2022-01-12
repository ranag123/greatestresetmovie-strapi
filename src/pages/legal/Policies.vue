<template>
  <q-page>
    <header>
      <h1>Fulfillment Policy</h1>
    </header>

    <p>
      Shipping rates for US and International are calculated upon checkout. Please enter your address and choose your
      carrier. We offer various shipping options, including USPS and FedEx.
    </p>
    <p>
      We are happy to support access to the digital product, as well as service related questions, such as replacement
      of defective disks or lost shipments. We do not offer refunds except for damaged goods.
    </p>
    <p>
      If you have any questions about your order or our shipping policies, please reach out directly to us at <a
      class="email" :href="`mailto:${$const.ADDRESS.infoEmail}`">{{ $const.ADDRESS.infoEmail }}</a>.
    </p>
  </q-page>
</template>

<script>
import * as $const from 'src/constants'
</script>
