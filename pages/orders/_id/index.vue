<template>
  <div>
    <h3 class="text-center mb-5">
      {{ record.campaign && record.campaign.name + " Campaign" }}
    </h3>
    <h5 class="text-center mb-5 font-base">
      Invoice Number ({{ record && record.invoice_no }})
    </h5>

    <vs-row class="mb-4">
      <vs-col vs-w="6" class="pr-2">
        <vx-card
          v-if="record"
          class="mb-5 h-full "
          title="Buyer Details"
          title-color="primary"
          subtitle-color="warning"
          subtitle=""
        >
          <div class="inner-border" v-if="record.detail">
            <div class="mb-2">
              <span class="font-semibold">Name: </span>
              <span>{{ record.detail.name || "-" }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Email: </span>
              <span>{{ record.detail.email }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Phone No: </span>
              <span>{{ record.detail.phone_no }}</span>
            </div>
            <div class="mb-2" v-if="record.address">
              <span class="font-semibold">Address: </span>
              <span class="mb-3">
                {{
                  record.address.address +
                    " " +
                    record.address.city +
                    " " +
                    record.address.postcode +
                    " " +
                    record.address.state +
                    " " +
                    record.address.country_code
                }}
              </span>
            </div>
          </div>
          <div v-else class="text-center">
            <h3>No Buyer Details</h3>
          </div>
        </vx-card>
      </vs-col>
      <vs-col vs-w="6" class="pl-2">
        <vx-card
          class="mb-5 h-full"
          title="Order Details"
          title-color="primary"
          subtitle-color="warning"
          subtitle=""
        >
          <div class="inner-border" v-if="record.package">
            <div class="mb-2">
              <span class="font-semibold">Package Name: </span>
              <span>{{ record.campaign.packages.name }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Product: </span>
              <vs-list
                v-for="(product, i) in record.package.products"
                :key="i"
                class="py-0"
              >
                <vs-list-item
                  icon="check"
                  class="py-0"
                  :title="product.name"
                ></vs-list-item>
              </vs-list>
            </div>
          </div>
          <div v-else class="text-center">
            <h3>No Order Details</h3>
          </div>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="6" class="pr-2">
        <vx-card
          class="mb-5 h-full"
          title="Delivery Details"
          title-color="primary"
          subtitle-color="warning"
          subtitle=""
        >
          <div class="inner-border" v-if="record.delivery">
            <div class="mb-2">
              <span class="font-semibold">Delivery Method: </span>
              <span>{{
                record.delivery.method == 1 ? "Postage" : "Self Pickup"
              }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Delivery Status: </span>
              <span>{{
                record.delivery.status == 1 ? "Success" : "Pending"
              }}</span>
            </div>
            <div v-if="record.delivery.method == 1">
              <div class="mb-2">
                <span class="font-semibold">Delivery Partner: </span>
                <span>{{ record.delivery.partner }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Tracking No: </span>
                <span>{{ record.delivery.tracking_no }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Remark: </span>
                <span>{{ record.delivery.remark }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Amount: </span>
                <span>{{ record.delivery.amount }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            <h3>No delivery Details</h3>
          </div>
        </vx-card>
      </vs-col>
      <vs-col vs-w="6" class="pl-2">
        <vx-card
          class="mb-5 h-full"
          title="Total Amount"
          title-color="primary"
          subtitle-color="warning"
          subtitle=""
        >
          <div class="inner-border" v-if="record.delivery">
            <div class="mb-2">
              <span class="font-semibold">Subtotal Amount: </span>
              <span>{{ record.subtotal_amount }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Tax Amount: </span>
              <span>{{ record.tax_amount }}</span>
            </div>

            <div class="mb-2">
              <span class="font-semibold">Total Amount: </span>
              <span>{{ record.total_amount }}</span>
            </div>
          </div>
        </vx-card>
      </vs-col>
    </vs-row>
  </div>

  <!-- </vs-card> -->
</template>

<script>
import getOneMixin from "@/mixins/getOne";
import UpdateDeliveryModal from "@/components/pages/orders/UpdateDeliveryModal";

export default {
  name: "index",
  layout: "main",
  mixins: [getOneMixin],
  components: {
    UpdateDeliveryModal
  },
  asyncData() {
    return {
      moduleName: "orders",
      deliveryMethodString: null,
      paymentStatusValue: null,
      avatar: null,
      name: null,
      email: null,
      campaign: null,
      packageName: null,
      packageQuantity: null,
      deliveredAt: null,
      trackingNo: null,
      product: null,
      subtotal: null,
      orderamount: null,
      totalamount: null
    };
  },
  watch: {}
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}

/* .inner-border {
  box-shadow: inset 0px 0px 0px 1px grey;
  box-sizing: border-box; 
  border-radius: 20px;
  padding: 20px;
} */
</style>
