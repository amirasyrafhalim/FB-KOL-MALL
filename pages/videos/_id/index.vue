<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 mb-base">
        <vx-card v-if="record">
          <div v-html="record.embed_html" class="responsive flex justify-center video-placeholder"></div>
          <h5 class="my-6">{{ record.title || 'Untitled'}}</h5>
          <vs-divider></vs-divider>
          <p class="text-grey" v-if="record.campaign">{{ record.campaign.name }}</p>
        </vx-card>
        <div v-if="record && record.campaign && record.campaign.packages" class="mt-3">
          <h3>Packages</h3>
          <vx-card
            :title="item.name"
            collapse-action
            v-for="(item, index) in record.campaign.packages"
            v-bind:key="index"
            class="mt-3"
          >
            <div>Keyword: {{ item.keyword }}</div>
            <div>Price: {{ item.price }} MYR</div>
            <div class="inline-block mt-3">
              <vs-chip color="orange" class="mr-2">{{ item.quantity }} stocks</vs-chip>
              <vs-chip color="green" class="mr-2">min {{ item.min_per_user }} per order</vs-chip>
              <vs-chip color="red" class="mr-2">limit {{ item.limit_per_user }} per buyer</vs-chip>
            </div>
          </vx-card>
        </div>
      </div>
      <div class="vx-col w-full sm:w-1/2 mb-base">
        <h2>Live Orders</h2>

        <perfect-scrollbar>
          <div class="pl-1 pr-2 pb-2">
            <p v-if="newOrders.length <=0 && orders.length <=0">No orders yet.</p>

            <vx-card class="mx-auto mt-3" v-for="(item, index) in newOrders" v-bind:key="index">
              <h5 class="mb-2">#{{item.invoice_no}}</h5>
              <div class="text--primary">
                <strong>{{ item.username }}</strong> ordered
                <strong>{{ item.package_name }}</strong>
              </div>
              <p class="text-grey text-sm">{{ item.created_at }}</p>
            </vx-card>

            <vx-card class="mx-auto mt-3" v-for="(item, index) in orders" v-bind:key="index">
              <h5 class="mb-2">#{{item.invoice_no}}</h5>
              <div class="text--primary">
                <strong v-if="item.user">{{ item.user.name }}</strong>
                <strong v-else>A buyer</strong> ordered
                <strong v-if="item.order_packages">{{ item.order_packages.package.name }}</strong>
                <strong v-else>an item</strong>
              </div>
              <p class="text-grey text-sm">{{ item.created_at }}</p>
            </vx-card>
          </div>
        </perfect-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import getOneMixin from "@/mixins/getOne";

export default {
  name: "index",
  layout: "main",
  mixins: [getOneMixin],
  asyncData() {
    return {
      moduleName: "videos",
      newOrders: [],
    };
  },
  computed: {
    orders() {
      return this.$store.state["orders"].records;
    },
  },
  mounted() {
    setTimeout(this.subscribeNewOrder, 3000);
  },
  created() {
    setTimeout(() => {
      this.fetchOrders();
    }, 2000);
  },
  methods: {
    subscribeNewOrder() {
      let channel = `order.${this.record.id}`;
      console.log(channel);

      this.$echo.channel(channel).listen("OrderCreated", (e) => {
        console.log(e);

        let name = e.order.social_id || "A buyer";

        if (e.detail && e.detail.name) {
          name = e.detail.name;
        }

        this.newOrders.unshift({
          username: name,
          package_name: e.package.name,
          invoice_no: e.order.invoice_no,
          created_at: e.order.created_at,
        });
      });
    },
    goBack(item) {
      this.$router.push({
        path: `/merchantkPage/${item.merchant_page_id}/liveVideo`,
      });
    },
    async fetchOrders() {
      try {
        await this.$store.dispatch("orders/fetchItems", {
          video_id: this.record.id,
          sort: "-created_at",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* .ps {
  height: 800px;
}

.video-placeholder {
  width: 100% !important;
  max-width: 640px;
  max-height: 360px;
}

.video-responsive {
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
} */
.video-placeholder {
  width: 100% !important;
  max-height: 500px;
}

@media only screen and (min-width: 1601px) {
  .video-placeholder {
    height: 420px !important;
  }
}

@media only screen and (max-width: 1600px) {
  .video-placeholder {
    height: 320px !important;
  }
}

@media only screen and (max-width: 1400px) {
  .video-placeholder {
    height: 260px !important;
  }
}

@media only screen and (max-width: 1300px) {
  .video-placeholder {
    height: 220px !important;
  }
}

@media only screen and (max-width: 1200px) {
  .video-placeholder {
    height: 260px !important;
  }
}

@media only screen and (max-width: 980px) {
  .video-placeholder {
    height: 200px !important;
  }
}

@media only screen and (max-width: 768px) {
  .video-placeholder {
    height: 150px !important;
  }
}
</style>