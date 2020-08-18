<template>
  <v-row justify="center">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>{{ $t("label.addShipping") }}</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="mb-4" v-if="this.shippingList">
            <v-row v-for="(field, i) in shippingList" :key="i">
              <v-col>
                <p class="mb-0">
                  RM {{ field.minimum_price }} - RM {{ field.maximum_price }} =
                  RM{{ field.shipping_fee }}
                </p>
              </v-col>
              <v-col cols="auto" v-if="(shippingList.length - 1) == i">
                <v-btn
                  x-small
                  fab
                  color="red"
                  v-on:click="removeElement(i)">
                  <v-icon class="white--text">&times;</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <v-dialog v-model="dialogShipping" persistent max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn block color="primary" dark @click="openModal()"
                >Add Shipping Variant</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t("label.shippingFee") }}</span>
              </v-card-title>
              <v-card-text class="pb-0">
                <v-row>
                  <v-col cols="8">
                    <span>{{ $t("label.totalPurchase") }}</span>
                  </v-col>
                  <v-col cols="4">
                    <span>{{ $t("label.deliveryFee") }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      class="pa-0"
                      dense
                      outlined
                      disabled
                      v-model="this.min"
                      :label="$t('label.min')"
                      required
                      :error-messages="
                        formErrors ? formErrors.minimum_price : ''
                      "
                      prefix="RM"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      class="pa-0"
                      dense
                      outlined
                      v-model="formShipping.maximum_price"
                      :label="$t('label.max')"
                      required
                      :error-messages="
                        formErrors ? formErrors.maximum_price : ''
                      "
                      prefix="RM"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      outlined
                      v-model="formShipping.shipping_fee"
                      :label="$t('label.price')"
                      :error-messages="
                        formErrors ? formErrors.shipping_fee : ''
                      "
                      prefix="RM"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                <v-btn color="blue darken-1" text @click="submitShipping">{{
                  $t("label.save")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";

import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
  props: ["shippingList"],
  components: {
    AlertFormError,
    CrudFormAction
  },
  name: "AddShipping",
  data() {
    return {
      moduleName: "campaignShippings",
      dialogShipping: false,
      isCreate: true,
      price: null,
      variantShipping: [],
      formShipping: {
        minimum_price: "",
        maximum_price: "",
        shipping_fee: ""
      },
      min: 0
    };
  },
  create() {
    this.fetchItems();
  },
  methods: {
    openModal() {
      this.dialogShipping = true;
      this.min =
        this.shippingList.length > 0 ? parseFloat( this.shippingList[this.shippingList.length - 1].maximum_price ) + 0.01
          : 0;
    },
    close() {
      this.dialogShipping = false;
      this.resetForm();
    },
    async submitShipping() {
      try {
        this.formShipping.maximum_price = (
          this.formShipping.maximum_price
        );

        let res = await this.$api[this.moduleName].create(
          this.formShipping,
          this.$route.params.id
        );
        await this.fetchItems();
        this.handleApiSuccess(res);
        this.close();
      } catch (err) {
        this.handleApiErrors(err);
      }
    },
    async fetchItems() {
      await this.$store.dispatch(
        this.moduleName + "/fetchItemsShipping",
        this.$route.params.id
      );
    },
    resetForm() {
      this.formShipping = {
        minimum_price: "",
        maximum_price: "",
        shipping_fee: ""
      };
    },
    removeRule(key) {
      this.variantShipping.splice(key, 1);
    },
    removeElement: function(index) {
      console.log(this.shippingList[index].id);

      // this.$refs.confirmDialog
      //   .open(this.$t("label.delete"), this.$t("message.confirmDelete"), {
      //     color: "warning",
      //   })
      //   .then((confirm) => {
      //     if (confirm) {
      this.$store.dispatch(this.moduleName + "/deleteShipping", {
        campaignId: this.$route.params.id,
        id: this.shippingList[index].id
      });
      //   }
      // });
    }
  }
};
</script>
