<template>
   <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
         <v-btn color="secondary" small v-on="on" class="mt-2">
            <span>{{ $t("label.edit") }}</span>
         </v-btn>
      </template>

      <v-card>
         <v-card-title class="headline grey lighten-2" primary-title>
            {{$t('label.updateDeliveryDetails')}}
         </v-card-title>
         <v-card-text>
            <v-form ref="form" lazy-validation>
               <v-text-field
                  v-model="formModel.tracking_no"
                  :label="$t('label.trackingNo')"
                  required
                  v-if="records.delivery_method && records.delivery_method.value === 0"
               ></v-text-field>

               <v-text-field
                  v-model="formModel.delivery_partner"
                  :label="$t('label.courierName')"
                  required
                  v-if="records.delivery_method && records.delivery_method.value === 0"
               ></v-text-field>

               <v-text-field
                  v-model="formModel.remarks"
                  :label="$t('label.remarks')"
                  required
               ></v-text-field>
               <v-switch
                  dense
                  v-model="formModel.delivery_status"
                  :label="
                      `Status: ${
                        formModel.delivery_status === 0
                          ? $t('label.pending')
                          : $t('label.delivered')
                      }`
                    "
                  :true-value="1"
                  :false-value="0"
                  class="mx-auto"
               ></v-switch>

               <v-btn color="success" class="mr-4" @click="updateDetails(records.id)">Update</v-btn>

               <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

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
    components: {AlertFormError},
    props: ['records'],
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
      }
    },
    created() {
      this.formModel.tracking_no = this.records.tracking_no;
      this.formModel.delivery_partner = this.records.delivery_partner;
      this.formModel.remarks = this.records.remarks;
      this.formModel.delivery_status = this.records.delivery_status.value;
    },
    methods: {
      close() {
        this.dialog = false;
      },
      reset() {
        this.$refs.form.reset()
      },
      async updateDetails(id) {
          try {
            let res = this.records.delivery_method.value === 0
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
  }
</script>

<style scoped>

</style>
