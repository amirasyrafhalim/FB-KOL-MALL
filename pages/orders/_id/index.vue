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
                  <v-avatar size="80px" class="text-center">
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
                    <div class="text-center mb-4">
                      <h3 class="headline font-weight-black text-center mb-1">
                        {{ record.campaign_name }}
                      </h3>
                    </div>

                    <div v-for="(data, i) in record.order_packages" :key="i">
                      <v-row>
                        <v-col cols="2" class="subtitle-1">{{
                          $t("label.packageName")
                        }}</v-col>
                        <v-col cols="auto">:</v-col>
                        <v-col cols="auto" class="subtitle-1">{{
                          data.campaign_package_name || "-"
                        }}</v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2" class="subtitle-1">{{
                          $t("label.product")
                        }}</v-col>
                        <v-col cols="auto">:</v-col>
                        <v-col cols="auto" class="subtitle-1">
                          <div
                            v-for="(field,
                            i) in data.campaign_package_product_details"
                            :key="i"
                          >
                            {{ field.name }}
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2" class="subtitle-1">{{
                          $t("label.quantity")
                        }}</v-col>
                        <v-col cols="auto">:</v-col>
                        <v-col cols="auto" class="subtitle-1">{{
                          data.quantity || "-"
                        }}</v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="2"></v-col>
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
                      <v-col cols="auto" class="subtitle-1">{{
                        this.deliveryMethodString || "-"
                      }}</v-col>
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
                        record.tracking_no || "-"
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2" class="subtitle-1">{{
                        $t("label.deliverAt")
                      }}</v-col>
                      <v-col cols="auto">:</v-col>
                      <v-col cols="auto" class="subtitle-1">{{
                        record.delivered_at || "-"
                      }}</v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="2" class="text-right">
                  <update-delivery-modal
                    :records="record"
                    v-if="
                      record.payment_status && record.payment_status.value == 1
                    "
                  />
                </v-col>
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
                        record.subtotal_amount || "-"
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2" class="subtitle-1">{{
                        $t("label.deliveryAmount")
                      }}</v-col>
                      <v-col cols="auto">:</v-col>
                      <v-col cols="auto" class="subtitle-1">{{
                        record.delivery_amount || "-"
                      }}</v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2" class="subtitle-1">{{
                        $t("label.totalAmount")
                      }}</v-col>
                      <v-col cols="auto">:</v-col>
                      <v-col cols="auto" class="subtitle-1">{{
                        record.total_amount || "-"
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
                        >{{ $t("label.success") }}</v-col
                      >

                      <v-col
                        v-else-if="this.paymentStatusValue === 2"
                        cols="auto"
                        class="subtitle-1"
                        color="warning"
                        >{{ $t("label.pending") }}</v-col
                      >
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="2" class="text-right d-flex align-end">
                  <v-btn
                    :disabled="loading"
                    :to="localePath('orders')"
                    class="mr-3"
                  >
                    {{ $t("label.back") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        <!-- </v-container> -->
      </v-card>
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
      email: null
    };
  },
  watch: {
    record() {
      this.deliveryMethodString = this.record.delivery_method
        ? this.record.delivery_method.description
        : null;
      this.paymentStatusValue = this.record.payment_status
        ? this.record.payment_status.value
        : null;
      this.avatar = this.record.buyer ? this.record.buyer.avatar : null;
      this.name = this.record.buyer ? this.record.buyer.name : null;
      this.email = this.record.buyer ? this.record.buyer.email : null;
    }
  }
};
</script>

<style scoped></style>
