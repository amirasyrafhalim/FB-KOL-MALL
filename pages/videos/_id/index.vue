<template>
  <div>
    <h1 class="d-flex align-center">
      <span>Video Console</span>
      <v-btn v-if="record" icon class="ml-auto" @click="goBack(record)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </h1>

    <v-row>
      <v-col>
        <v-card max-width="640" class="mx-auto" v-if="record">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ record.title || 'Untitled'}}</v-list-item-title>
              <v-list-item-subtitle>{{ record.created_at }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <div v-html="record.embed_html" class="video-responsive"></div>
          <v-card-text v-if="record.campaign">
            <strong>Campaign</strong>
            :
            {{ record.campaign.name }}
          </v-card-text>
        </v-card>

        <div v-if="record && record.campaign && record.campaign.packages" class="mt-3">
          <h2>Packages</h2>
          <v-card
            class="mx-auto mt-3"
            v-for="(item, index) in record.campaign.packages"
            v-bind:key="index"
          >
            <v-card-text>
              <h3 class="text--primary font-weight-bold d-flex align-center">
                <div
                  class="pa-2 mr-2"
                  :style="
                          'background-color:' +
                            item.color +
                            '; border-radius: 50%; float: left'
                        "
                ></div>
                <span>{{ item.name }}</span>

                <v-switch
                  dense
                  color="primary"
                  value
                  :input-value="item.status.value"
                  class="ml-auto ma-0 pa-0"
                ></v-switch>
              </h3>
              <div>Keyword: {{ item.keyword }}</div>
              <div>Price: {{ item.price }} MYR</div>
              <div class="mt-2">
                <v-chip
                  class="mr-2"
                  color="orange"
                  text-color="white"
                  small
                >{{ item.quantity }} stocks</v-chip>

                <v-chip
                  class="mr-2"
                  color="green"
                  text-color="white"
                  small
                >min {{ item.min_per_user }} per order</v-chip>
                <v-chip
                  class="mr-2"
                  color="red"
                  text-color="white"
                  small
                >limit {{ item.limit_per_user }} per buyer</v-chip>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col>
        <h2>Live Orders</h2>
        <perfect-scrollbar>
          <div class="pl-1 pr-2">
            <p v-if="newOrders.length <=0">No orders yet.</p>

            <v-card class="mx-auto mt-3" v-for="(item, index) in newOrders" v-bind:key="index">
              <v-card-subtitle class="pb-0 d-flex subtitle-2">
                #{{ item.invoice_no }}
                <span class="ml-auto">{{ item.created_at }}</span>
              </v-card-subtitle>
              <v-card-text>
                <div class="text--primary">
                  <strong>{{ item.username }}</strong> ordered
                  <strong>{{ item.package_name }}</strong>.
                </div>
              </v-card-text>
            </v-card>
          </div>
        </perfect-scrollbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import getOneMixin from "@/mixins/getOne";

export default {
  name: "index",
  mixins: [getOneMixin],
  asyncData() {
    return {
      moduleName: "videos",
      newOrders: [],
    };
  },

  mounted() {
    setTimeout(this.subscribeNewOrder, 3000);
  },

  methods: {
    subscribeNewOrder() {
      let channel = `order.${this.record.id}`;
      console.log(channel);

      this.$echo.channel(channel).listen("OrderCreated", (e) => {
        console.log(e);

        let name = e.order.social_id || 'A buyer';

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
        path: `/facebookPage/${item.merchant_page_id}/liveVideo`,
      });
    },
  },
};
</script>

<style scoped>
.ps {
  height: 800px;
}

div >>> iframe {
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
}
</style>