<template>
  <div>
    <h3 class="text-center font-bold mb-5">
      {{ record.campaign && record.campaign.name }}
    </h3>
    <!-- <h5 class="text-center mb-5">
      Invoice Number : {{ record && record.invoice_no }}
    </h5> -->

    <vs-row class="mb-4">
      <vs-col vs-w="12" class="pr-2">
        <vx-card v-if="record" class="h-full ">
          <vs-row>
            <vs-col vs-w="8" vs-xs="12">
              <h4 class="font-bold mb-3">Buyer Details</h4>

    

              <table
                style="width:100%; white-space: inherit"
                v-if="record.detail"
              >
                <tr>
                  <td style="width:10%; white-space: inherit">Name</td>
                  <td>:</td>
                  <td>{{ (record.detail && record.detail.name) || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit">Email</td>
                  <td>:</td>
                  <td>{{ (record.detail && record.detail.email) || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit">Phone No</td>
                  <td>:</td>
                  <td>{{ record.detail &&record.detail.phone_no || "-" }}</td>
                </tr>
                <tr>
                  <td style="width:10%; white-space: inherit ">Address</td>
                  <td>:</td>
                  <td v-if="record.address">
                    {{
                      record.address.address +
                        " " +
                        record.address.city +
                        " " +
                        record.address.postcode +
                        " " +
                        record.address.state +
                        " " +
                        record.address.country_code || '-'
                    }}
                  </td>
                </tr>
              </table>

              <h4 vs-w="8" vs-xs="12" style="color: grey" v-else>
                No Buyer Details
              </h4>
            </vs-col>
            <vs-col vs-w="4" vs-xs="12">
              <div v-if="record.delivery">
                <div class="mb-2" v-if="record && record.delivery && record.delivery.method.value == 1">
                  <h4 class="font-bold">
                    <span>{{ "Postage" }}</span>
                    <vs-chip :color=" getDeliveryStatusColor(record.delivery.status.value) ">
                      {{  record.delivery && record.delivery.status.description }}
                    </vs-chip>
                  </h4>
                  <table style="width:100%; white-space: inherit" v-if="record.delivery" >
                <tr v-if="record.delivery.partner">
                  <td style="width:20%; white-space: inherit">Partner Name</td>
                  <td style="width:1%">:</td>
                  <td>{{record.delivery.partner || null }}</td>
                </tr>
                <tr v-if="record.delivery.tracking_no">
                  <td style="white-space: inherit">Tracking No</td>
                  <td>:</td>
                  <td>{{ record.delivery.tracking_no || null }}</td>
                </tr>
                <tr v-if="record.delivery.remark">
                  <td style="white-space: inherit">Remark</td>
                  <td>:</td>
                  <td>{{ record.delivery.remark || null }}</td>
                </tr>
                <tr v-if="record.delivery.amount">
                  <td style="white-space: inherit">Fee</td>
                  <td>:</td>
                  <td>{{ record.delivery.amount || null }}</td>
                </tr>
                  </table>

          
                </div>
                <div class="mb-2" v-else>
                  <h4 class="font-bold">
                    <span>{{ "Self Pickup" }}</span>
                    
                    <vs-chip
                      :color="
                        getStatusColor(record.delivery.status.value)
                      "
                    >
                      {{
                        record.delivery.status && record.delivery.status.description || '-'
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
                  <td>{{ record.campaign.packages[0].name || null }}</td>
                  <td>{{ record.package.quantity + " x" || null}}</td>
                  <td>{{ "RM " + record.campaign.packages[0].price || null }}</td>
                  <td>{{ "RM " + record.package.total_amount || null }}</td>
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

              <h4
                vs-w="8"
                vs-xs="12"
                style="color: grey"
                class="text-center"
                v-else
              >
                No Record Found
              </h4>
            </vs-col>
          </vs-row>
          <vs-divider></vs-divider>
          <vs-row>
            <vs-col vs-w="6" class="pr-2"> </vs-col>
            <vs-col vs-w="6" class="pl-2">
              <div class="text-right">
                <table style="width: 100%">
                  <tr>
                    <td class="font-semibold">Subtotal Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      RM {{ record.subtotal_amount != null ? record.subtotal_amount : '0.00' }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Tax Amount</td>
                    <td>:</td>
                    {{record.tax_amount}}
                    <td class="text-right">RM {{ record.tax_amount != null ? record.tax_amount : '0.00' }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Shipping Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      RM
                      {{
                        record.delivery ? record.delivery.amount : "-"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-semibold">Total Amount</td>
                    <td>:</td>
                    <td class="text-right">
                      RM {{ record.total_amount != null ? record.total_amount : '0.00' }}
                    </td>
                  </tr>
                </table>

  
              </div>
            </vs-col>
          </vs-row>
        </vx-card>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col vs-w="12" class="pl-2">
        <vx-card class="mb-5 h-full">
          <div v-if="record.payment">
            <table
              style="width: 100%"
              class=""
              v-if="record.payment.xenopayPayment"
            >
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
              <!-- <tr>
                <td class="font-semibold">Attachment</td>
                <td>:</td>
                <td>
                  <vs-images
                    width="50%"
                    :src="record.payment && record.payment.image"
                  ></vs-images>
                </td>
              </tr> -->
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
                <td>RM {{ record.payment.xenopayPayment.amount }}</td>
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
                  Payment Method
                </td>
                <td>:</td>
                <td>
                  {{ "Bank Transfer" }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Attachment</td>
                <td>:</td>
                <td @click="openAttachment" style="cursor: pointer;">
                  <vs-chip style="float: left!important">{{record.payment && record.payment.image}}</vs-chip>
                  <!-- <vs-images
                    width="50%"
                    :src="record.payment && record.payment.image"
                  ></vs-images> -->
                </td>
              </tr>
              <tr>
                <td class="font-semibold">Update Time</td>
                <td>:</td>
                <td>
                  {{ record.payment.created_at }}
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">
                  <vs-button
                    color="danger"
                    type="gradient"
                    @click="openModal()"
                  >
                    {{ $t("label.updateStatus") }}
                  </vs-button>
                </td>
              </tr>
            </table>
          </div>
          <h4
            vs-w="8"
            vs-xs="12"
            style="color: grey"
            class="text-center"
            v-else
          >
            No Payment
          </h4>
        </vx-card>
      </vs-col>
    </vs-row>

    <vs-prompt
      @cancel="val = ''"
      @accept="updatePaymentStatus()"
      @close="close"
      :active.sync="activePrompt"
      title="Update Payment Status"
    >
      <div class="con-exemple-prompt">
        <v-select
          :options="paymentEnums"
          label="description"
          placeholder="Select status"
          @input.native="fetchEnumPaymentStatus($event.target.value)"
          v-model="selectedStatus"
          :value="selectedStatus"
        ></v-select>
      </div>
    </vs-prompt>
  </div>

  <!-- </vs-card> -->
</template>

<script>
import getOneMixin from "@/mixins/getOne";
import UpdateDeliveryModal from "@/components/pages/orders/UpdateDeliveryModal";
import formMixin from "@/mixins/form";

export default {
  name: "index",
  layout: "main",
  mixins: [getOneMixin, formMixin],
  components: {
    UpdateDeliveryModal
  },
  asyncData() {
    return {
      moduleName: "orders",
      activePrompt: false,
      paymentStatus: [],
      selectedStatus: ""
    };
  },
  computed: {
    paymentEnums() {
      return this.$store.state[this.moduleName].paymentEnums;
    }
  },
  created() {
    this.fetchEnumPaymentStatus()
  },
  methods: {
       openAttachment() {
         var a = this.record.payment.image;
         window.open( a, '_blank' );
        //  window.location.href= this.record.payment.image
       },
    getDeliveryStatusColor(status) {
      if (status === 1) return "success";
      if (status === 2) return "warning";
      if (status === 3) return "warning";
      if (status === 4) return "danger";
    },

    getStatusColor(status) {
      if (status === 2) return "success";
      if (status === 0) return "danger";
      if (status === 1) return "warning";
    },
    getPaymentStatusColor(status) {
      if (status === 1) return "success";
      if (status === 0) return "danger";
      if (status === 2) return "warning";
    },
    openModal() {
       this.activePrompt = true;
    },
      showSuccess() {
      this.$vs.notify({
        color: "success",
        title: "Update Payment Status",
        text: "The selected tracking number was successfully updated"
      });
    },
    close() {
      this.$vs.notify({
        color: "danger",
        title: "Closed",
        text: "You close a dialog!"
      });
    },
    async updatePaymentStatus() {
      try {
        let res = await this.$api.orders.updateOrderPayment({ status:  this.selectedStatus.value }, this.record.payment.id);
        console.log('res', res)
        this.handleApiSuccess(res, "orders");
      } catch (err) {
        console.log('err', err)
        this.handleApiErrors(err);
      }   
    },

    async fetchEnumPaymentStatus(value) {
       this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
      routeName: "paymentStatus",
      stateKey: "paymentEnums"
    });
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
