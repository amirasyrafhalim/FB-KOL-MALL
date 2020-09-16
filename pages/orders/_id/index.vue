<template>
  <div>
    <h3 class="text-center font-bold mb-1">
      {{ record.campaign && record.campaign.name + " Campaign" }}
    </h3>
    <h5 class="text-center mb-5">
      Invoice Number : {{ record && record.invoice_no }}
    </h5>

    <vs-row class="mb-4">
      <vs-col vs-w="12" class="pr-2">
        <vx-card v-if="record" class="h-full ">
          <vs-row>
            <vs-col vs-w="8" vs-xs="12">
              <h4 class="font-bold mb-3">Buyer Details</h4>
              <table style="width:100%; white-space: inherit" v-if="record.detail">
                <tr>
                  <td style="width:10%; white-space: inherit">Name</td>
                  <td>:</td>
                  <td>{{ record.detail.name || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit">Email</td>
                  <td>:</td>
                  <td>{{ record.detail.email || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit">Phone No</td>
                  <td>:</td>
                  <td>{{ record.detail.phone_no || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit ">Address</td>
                  <td>:</td>
                  <td>
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
                  </td>
                </tr>
              </table>
               <h4 vs-w="8" vs-xs="12" style="color: grey" v-else>No Record Found</h4>
            </vs-col>
            <vs-col vs-w="4" vs-xs="12">
              <div v-if="record.delivery">
                <div class="mb-2" v-if="record.delivery.method == 1">
                  <h4 class="font-bold">
                    <span>{{ "Postage" }}</span>
                    <vs-chip
                      :color="
                        getDeliveryStatusColor(record.delivery.status.value)
                      "
                    >
                      {{
                        record.delivery && record.delivery.status.description
                      }}
                    </vs-chip>
                  </h4>
                  <p>{{ record.delivery.partner }}</p>
                  <p>{{ record.delivery.tracking_no }}</p>
                  <p>{{ record.delivery.remark }}</p>
                  <p>{{ record.delivery.amount }}</p>
                </div>
                <div class="mb-2" v-else>
                  <h4 class="font-bold">
                    <span>{{ "Self Pickup" }}</span>
                    <vs-chip
                      :color="
                        getDeliveryStatusColor(record.delivery.status.value)
                      "
                    >
                      {{
                        record.delivery && record.delivery.status.description
                      }}
                    </vs-chip>
                  </h4>
                </div>
              </div>
            </vs-col>
          </vs-row>
          <vs-divider />

          <vs-row>
            <vs-col>
              <h4 class="font-bold">Package Details</h4>
              <table style="width:100%; text-align: left" v-if="record.package">
                <th></th>
                <th></th>
                <th class="px-0">Quantity</th>
                <th class="px-0">Price</th>
                <th class="px-0">Total</th>
                <tr>
                  <td style="width:20%">Package Name:</td>
                  <td>{{ record.campaign.packages[0].name }}</td>
                  <td>{{ record.package.quantity + " x" }}</td>
                  <td>{{ "RM " + record.campaign.packages[0].price }}</td>
                  <td>{{ "RM " + record.total_amount }}</td>
                </tr>
                <tr>
                  <td style="width:15%"></td>
                  <vs-list
                    v-for="(product, i) in record.package.products"
                    :key="i"
                    class="py-0"
                  >
                    <vs-list-item
                      class="py-0"
                      :title="product.name"
                    ></vs-list-item>
                  </vs-list>
                </tr>
              </table>
               <h4 vs-w="8" vs-xs="12" style="color: grey" class="text-center" v-else>No Record Found</h4>
            </vs-col>
          </vs-row>
          <vs-divider></vs-divider>
          <vs-row>
            <vs-col vs-w="6" class="pr-2"> </vs-col>
            <vs-col vs-w="6" class="pl-2">
              <!-- <vx-card class="mb-5 h-full"> -->
              <div class="text-right">
                <table style="width: 100%" v-if="record.delivery">
                  <tr>
                    <td class="font-semibold">Subtotal Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      {{ "RM " + record.subtotal_amount }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Tax Amount</td>
                    <td>:</td>
                    <td class="text-right">{{ "RM " + record.tax_amount }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Shipping Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      RM
                      {{
                        record.delivery.amount != null
                          ? record.delivery.amount
                          : "0.00"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Total Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      {{ "RM " + record.total_amount }}
                    </td>
                  </tr>
                </table>
                 <h4 vs-w="8" vs-xs="12" style="color: grey" class="text-center" v-else>No Record Found</h4>
              </div>
              <!-- </vx-card> -->
            </vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12" class="pl-2">
        <vx-card class="mb-5 h-full">
          <div v-if="record.payment">
            <table style="width: 100%" class="" v-if="record.payment.xenopayPayment">
              <tr>
                <td colspan="3">
                  <vs-chip
                    :color="getPaymentStatusColor(record.payment.status.value)"
                  >
                    {{ record.payment && record.payment.status.description }}
                  </vs-chip>
                </td>
              </tr>
              <tr>
                <td class="font-semibold" style="width: 20%">
                  Subtotal Amount
                </td>
                <td>:</td>
                <td>
                  {{ record.payment.method == 1 ? "Xenopay" : "Bank Transfer" }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Attachment</td>
                <td>:</td>
                <td>
                  <v-img
                    width="50%"
                    :src="record.payment && record.payment.image"
                  ></v-img>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Update Time</td>
                <td>:</td>
                <td>
                  {{ record.payment.updated_at }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Total Amount</td>
                <td>:</td>
                <td>{{ record.payment }}</td>
              </tr>
            </table>

            <table style="width: 100%" v-else>
              <tr>
                <td colspan="3">
                  <vs-chip
                    :color="getPaymentStatusColor(record.payment.status.value)"
                  >
                    {{ record.payment && record.payment.status.description }}
                  </vs-chip>
                </td>
              </tr>
              <tr>
                <td class="font-semibold" style="width: 20%">
                  Subtotal Amount
                </td>
                <td>:</td>
                <td>
                  {{ "Bank Transfer" }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Attachment</td>
                <td>:</td>
                <td>
                  <v-img
                    width="50%"
                    :src="record.payment && record.payment.image"
                  ></v-img>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Update Time</td>
                <td>:</td>
                <td>
                  {{ record.payment.updated_at }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">
                  <vs-button
                    color="danger"
                    type="gradient"
                    @click="openModel()"
                  >
                    {{ $t("label.updateStatus") }}
                  </vs-button>
                </td>
              </tr>
            </table>
          </div>
          <h4 vs-w="8" vs-xs="12" style="color: grey" class="text-center" v-else>No Payment</h4>
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
      moduleName: "orders"
    };
  },
  methods: {
    getDeliveryStatusColor(status) {
      if (status === 2) return "success";
      if (status === 0) return "danger";
      if (status === 1) return "warning";
    },
    getPaymentStatusColor(status) {
      if (status === 1) return "success";
      if (status === 0) return "danger";
      if (status === 2) return "warning";
    },
    openModal(){

    },
    async updateStatus(status, id) {
      //add order payment Api file in services folder
      // try {
      //   let res = await this.$api.orderPayment.update({ status: status }, id);
      //   this.handleApiSuccess(res, "merchants");
      // } catch (err) {
      //   this.handleApiErrors(err);
      // }
    }
  }
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
.vuesax-app-is-ltr .con-vs-chip {
  float: right !important;
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
