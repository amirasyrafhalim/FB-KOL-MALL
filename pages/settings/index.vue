<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <a :href="localePath({ name: 'settings-shippings' })">
          <vx-card slot="no-body" class="text-center greet-user h-full">
            <feather-icon
              style="background: rgba(var(--vs-primary),0.15)"
              icon="TruckIcon"
              class="p-6 mb-5 inline-flex rounded-full text-primary shadow"
              svgClasses="h-8 w-8"
            ></feather-icon>
            <p
              class="text-xl font-bold text-black xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto"
            >Shippings</p>
            <p
              class="p-2 xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-black"
            >Set up and edit your shipping options</p>
          </vx-card>
        </a>
      </div>

        <!-- <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <a :href="localePath({ name: 'settings-paymentMethod' })">
          <vx-card
            slot="no-body"
            class="text-center greet-user h-full">
            <feather-icon
              style="background: rgba(var(--vs-primary),0.15)"
              icon="CreditCardIcon" 
              class="p-6 mb-5  inline-flex rounded-full text-primary shadow"
              svgClasses="h-8 w-8"
            ></feather-icon>
            <p class="text-xl font-bold text-black xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto">Payment Method</p>
            <p class="p-2 xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-black">
              Set up and edit your payment method</p>
          </vx-card>
        </a>
      </div> -->

    </div>
  </div>
</template>

<script>
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";

export default {
  layout: "main",
  components: {
    StatisticsCardLine,
  },
  data() {
    return {};
  },
};
</script>