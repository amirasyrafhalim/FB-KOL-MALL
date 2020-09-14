<template>
  <!-- <vs-card id="pages__orders-id"> -->

  <div
  >
  <h3 class="text-center mb-5">{{record.campaign && record.campaign.name + ' Campaign'}}</h3>
  <h5 class="text-center mb-5 font-base">Invoice Number ({{record && record.invoice_no}})</h5>
    <div>
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
            <div class="inner-border" v-if="record.order_details">
              <div class="mb-2">
                <span class="font-semibold">Name: </span>
                <span>{{ record.order_details.name }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Email: </span>
                <span>{{ record.order_details.email }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Phone No: </span>
                <span>{{ record.order_details.phone_no }}</span>
              </div>
              <div class="mb-2" v-if=" record.order_address">
                <span class="font-semibold">Address: </span>
                <span class="mb-3">
                  {{
                    record.order_address.address +
                      " " +
                      record.order_address.city +
                      " " +
                      record.order_address.postcode +
                      " " +
                      record.order_address.state +
                      " " +
                      record.order_address.country_code
                  }}
                </span>
              </div>
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
            <div class="inner-border" v-if="record.order_packages">
              <div class="mb-2">
                <span class="font-semibold">Package Name: </span>
                <span>{{ record.order_packages.package.name }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Product: </span>
                <vs-list
                  v-for="(product, i) in record.order_packages.products"
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
          <div class="inner-border" v-if="record.order_deliveries">
              <div class="mb-2">
                <span class="font-semibold">Delivery Method: </span>
                <span>{{ record.order_deliveries.method == 1 ? "Postage" : "Self Pickup" }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Delivery Status: </span>
                <span>{{ record.order_deliveries.status == 1 ? "Success" : "Pending" }}</span>
              </div>
              <div v-if="record.order_deliveries.method == 1">
                <div class="mb-2">
                <span class="font-semibold">Delivery Partner: </span>
                <span>{{ record.order_deliveries.partner }}</span>
              </div>
               <div class="mb-2">
                <span class="font-semibold">Tracking No: </span>
                <span>{{ record.order_deliveries.tracking_no }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Remark: </span>
                <span>{{ record.order_deliveries.remark }}</span>
              </div>
               <div class="mb-2">
                <span class="font-semibold">Amount: </span>
                <span>{{ record.order_deliveries.amount }}</span>
              </div>
            </div>
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
          <div class="inner-border" v-if="record.order_deliveries">
              <div class="mb-2">
                <span class="font-semibold">Delivery Method: </span>
                <span>{{ record.order_deliveries.method == 1 ? "Postage" : "Self Pickup" }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Delivery Status: </span>
                <span>{{ record.order_deliveries.status == 1 ? "Success" : "Pending" }}</span>
              </div>
              <div v-if="record.order_deliveries.method == 1">
                <div class="mb-2">
                <span class="font-semibold">Delivery Partner: </span>
                <span>{{ record.order_deliveries.partner }}</span>
              </div>
               <div class="mb-2">
                <span class="font-semibold">Tracking No: </span>
                <span>{{ record.order_deliveries.tracking_no }}</span>
              </div>
              <div class="mb-2">
                <span class="font-semibold">Remark: </span>
                <span>{{ record.order_deliveries.remark }}</span>
              </div>
               <div class="mb-2">
                <span class="font-semibold">Amount: </span>
                <span>{{ record.order_deliveries.amount }}</span>
              </div>
            </div>
          </div> 
          </vx-card>
        </vs-col>
      </vs-row>
    </div>
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
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
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


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
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
