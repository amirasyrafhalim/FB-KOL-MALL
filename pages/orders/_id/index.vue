<template>
  <v-card id="pages__orders-id">
    <v-toolbar color="primary" dark text dense>
      <v-toolbar-title class="subheading">{{
        $t("pageTitle.order.edit")
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-card class="mx-auto">
        <!-- <v-container> -->
        <v-row>
          <v-col cols="12">
            <v-card-subtitle
              class="headline pb-0 font-weight-black"
              align="center"
              >Invoice No. {{ record.invoice_no }}</v-card-subtitle
            >
            <v-card-subtitle class="headline pt-0" align="center"
              >({{ record.code }})</v-card-subtitle
            >
            <v-divider></v-divider>

            <v-row>
              <v-col cols="auto">
                <v-avatar size="60px" class="text-center ml-1">
                  <v-img
                    :src="this.avatar || '/default_avatar.png'"
                    class="elevation-6"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-row>
                <v-col cols="12" class="my-auto pb-0">{{ this.name }}</v-col>
                <v-col cols="12" class="pt-0">{{ this.email }}</v-col>
              </v-row>
            </v-row>

            <v-divider />
            <v-row>
              <v-col>
                <v-card-text>
                    <v-card-subtitle
                      class="headline font-weight-black py-1"
                      align="center"
                      >Campaign {{ this.campaign }}</v-card-subtitle
                    >
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.packageName")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.packageName || "-"
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("menuTitle.product")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">
                      <div v-for="(field, i) in product" :key="i">
                        {{ field }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.quantity")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.packageQuantity || "-"
                    }}</v-col>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider />

            <v-row>
              <v-col>
                <v-card-text>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.deliveryMethod")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">
                      <div v-if="this.deliveryMethodString === 1">
                        {{ $t("label.delivery") }}
                      </div>
                      <div v-if="this.deliveryMethodString === 2">
                        {{ $t("label.selfPickup") }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.deliveryPartner")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      record.delivery_partner || "-"
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.trackingNo")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.trackingNo || "-"
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.deliverAt")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.deliveredAt || "-"
                    }}</v-col>
                  </v-row>
                </v-card-text>
              </v-col>
              <!-- <v-col cols="2" class="text-right">
                  <update-delivery-modal
                    :records="record"
                    v-if="
                      record.payment_status && record.payment_status.value == 1
                    "
                  />
                </v-col> -->
            </v-row>
            <v-divider />
            <v-row>
              <v-col>
                <v-card-text>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.subtotalAmount")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.subtotal || "-"
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.deliveryAmount")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.orderamount || "-"
                    }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.totalAmount")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col cols="auto" class="subtitle-1">{{
                      this.totalamount || "-"
                    }}</v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2" class="subtitle-1">{{
                      $t("label.paymentStatus")
                    }}</v-col>
                    <v-col cols="auto">:</v-col>
                    <v-col
                      v-if="this.paymentStatusValue === 0"
                      cols="auto"
                      class="subtitle-1"
                      color="error"
                      >{{ $t("label.fail") }}</v-col
                    >
                    <v-col
                      v-else-if="this.paymentStatusValue === 1"
                      cols="auto"
                      class="subtitle-1"
                      color="success"
                      >{{ $t("label.pending") }}</v-col
                    >
                    <v-col
                      v-else-if="this.paymentStatusValue === 2"
                      cols="auto"
                      class="subtitle-1"
                      color="warning"
                      >{{ $t("label.success") }}</v-col
                    >
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <v-btn :to="localePath('orders')" class="mt-2">
        {{ $t("label.back") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import getOneMixin from "@/mixins/getOne";
import UpdateDeliveryModal from "@/components/pages/orders/UpdateDeliveryModal";

export default {
  name: "index",
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
  watch: {
    record() {
      this.deliveryMethodString = this.record.order_deliveries.method
        ? this.record.order_deliveries.method
        : null;
      this.paymentStatusValue = this.record.order_payment.status
        ? this.record.order_payment.status
        : null;
      this.avatar = this.record.buyer ? this.record.buyer.avatar : null;
      this.name = this.record.order_details.name
        ? this.record.order_details.name
        : null;
      this.email = this.record.order_details.email
        ? this.record.order_details.email
        : null;
      this.campaign = this.record.campaign.name
        ? this.record.campaign.name
        : null;
      this.packageName = this.record.order_packages.package.name
        ? this.record.order_packages.package.name
        : null;
      this.packageQuantity = this.record.order_packages.quantity
        ? this.record.order_packages.quantity
        : null;
      this.deliveredAt = this.record.order_deliveries.delivered_at
        ? this.record.order_deliveries.delivered_at
        : null;
      this.trackingNo = this.record.order_deliveries.tracking_no
        ? this.record.order_deliveries.tracking_no
        : null;
      this.product = this.record.order_packages.package.product_ids
        ? this.record.order_packages.package.product_ids
        : null;
      this.subtotal = this.record.subtotal_amount
        ? this.record.subtotal_amount
        : null;
      this.orderamount = this.record.order_deliveries.amount
        ? this.record.order_deliveries.amount
        : null;
      this.totalamount = this.record.total_amount
        ? this.record.total_amount
        : null;
    }
  }
};
</script>

<style scoped></style>
