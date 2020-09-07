<template>
  <v-dialog v-model="dialog" width="680">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" small v-on="on" class="mt-1 mb-1">
        <span>{{ $t("label.edit") }}</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ $t("label.updateDeliveryDetails") }}
        <v-spacer></v-spacer>
        <v-btn elevation="0%" style="background-color:transparent;" @click="reset"><v-icon>mdi-refresh</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
          class="mt-2"
            v-model="formModel.tracking_no"
            :label="$t('label.trackingNo')"
            required
            v-if="
              records.order_deliveries && records.order_deliveries.method === 1
            "
          ></v-text-field>

          <v-text-field
            v-model="formModel.delivery_partner"
            :label="$t('label.courierName')"
            required
            v-if="
              records.order_deliveries && records.order_deliveries.method === 1
            "
          ></v-text-field>

          <v-text-field
            v-model="formModel.remarks"
            :label="$t('label.remarks')"
            required
          ></v-text-field>

          <v-col>
            <v-row>
              <v-radio-group
                v-model="formModel.delivery_status"
                :label="$t('label.status')"
                row
              >
                <span>:</span>
                <v-radio
                  color="purple"
                  value="2"
                  class="mx-2"
                  label="Out For Delivery"
                ></v-radio>
                <v-radio
                  color="purple"
                  value="3"
                  class="pr-1 mx-2"
                  label="Delivered"
                ></v-radio>
                <v-radio
                  color="purple"
                  value="4"
                  class="pr-1 mx-2"
                  label="Return"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>

          <v-btn color="success" class="mr-4" @click="updateDetails(records.id)"
            >Update</v-btn
          >
          <v-btn color="lightgrey" class="mr-4" @click="close">Back</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import formMixin from "@/mixins/form";
import AlertFormError from "@/components/widgets/alerts/AlertFormError";

export default {
  name: "UpdateDeliveryModal",
  mixins: [formMixin],
  components: { AlertFormError },
  props: ["records"],
  data() {
    return {
      moduleName: "orders",
      dialog: false,
      deliveryMethodValue: null,
      formModel: {
        tracking_no: null,
        delivery_partner: null,
        remarks: null,
        delivery_status: 0
      }
    };
  },
  created() {
    this.formModel.tracking_no = this.records.order_deliveries.tracking_no;
    this.formModel.delivery_partner = this.records.order_deliveries.partner;
    this.formModel.remarks = this.records.order_deliveries.remark;
    this.formModel.delivery_status = this.records.order_deliveries.status;
  },
  methods: {
    close() {
      this.dialog = false;
    },
    reset() {
      this.$refs.form.reset();
    },
    async updateDetails(id) {
      try {
        let res =
          this.records.order_deliveries.method === 1
            ? await this.$api.orders.updateDelivery(this.formModel, id)
            : await this.$api.orders.updatePickup(this.formModel, id);

        this.handleApiSuccess(res);
        this.dialog = false;
        location.reload();
      } catch (err) {
        console.log(err);
        this.handleApiErrors(err);
      }
    }
  }
};
</script>

<style scoped></style>
