<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on }">
          <v-row>
            <div class="pr-2">
              <v-btn :to="localePath('campaigns')">
                {{ $t("label.back") }}
              </v-btn>
            </div>
            <div>
              <v-btn color="primary" dark v-on="on" class="button">
                <v-icon class="pr-1">mdi-plus</v-icon>Add New Package</v-btn
              >
            </div>
          </v-row>
        </template>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card-title>
                  <h3 style="color:black;">Package</h3>
                </v-card-title>
                <v-text-field
                  dense
                  v-model="formModel.name"
                  :label="$t('label.packageName')"
                  :hint="$t('label.enterNamePackage')"
                  required
                  :error-messages="formErrors ? formErrors.name : ''"
                  elevation="20"
                  solo
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- - -->

            <!-- color section -->
            <v-row>
              <v-col sm="12" md="6">
                <v-card-title>
                  <h3 style="color:black;" class="text-float-left">
                    {{ $t("label.selling") }}
                  </h3>
                </v-card-title>
                <v-card outlined width="auto">
                  <v-col>
                    <v-row>
                      <v-radio-group v-model="formModel.sell_method" row>
                        <v-radio
                          color="purple"
                          value="1"
                          label="Keyword"
                          class="pl-3"
                        ></v-radio>
                        <v-radio
                          color="purple"
                          value="2"
                          label="Bidding"
                          class="pl-3"
                        ></v-radio>
                      </v-radio-group>
                    </v-row>
                  </v-col>
                  <br />
                  <v-list-item-subtitle>
                    <v-col cols="10">
                      <v-text-field
                        v-model="formModel.keyword"
                        label="Insert Your Keyword"
                        :hint="$t('label.enterKeywordPackage')"
                      ></v-text-field>
                    </v-col>
                  </v-list-item-subtitle>
                </v-card>
              </v-col>

              <v-col sm="12" md="6" class="pl-1">
                <v-card-title>
                  <h3 class="black--text">
                    {{ $t("label.color") }}
                  </h3>
                </v-card-title>
                <v-color-picker
                  @input="updateValue($event)"
                  disabled
                  hide-inputs
                  width="320px"
                  :swatches="swatches"
                  canvas-height="200"
                  show-swatches
                  elevation="2"
                >
                </v-color-picker>
              </v-col>
            </v-row>
            <!-- - -->

            <!-- item section -->
            <v-card-title>
              <h3 class="black--text">
                {{ $t("label.packageItem") }}
              </h3>
            </v-card-title>

            <div>
              <v-card class="radius mb-2 background-color-grey py-0 px-5" max-width="770">
                <v-row justify="center" align-content="center">
                  <v-col cols="sm" md="6">
                    <v-autocomplete
                      class="mt-2"
                      elevation="20"
                      solo
                      dense
                      :items="products"
                      :label="$t('label.products')"
                      item-text="name"
                      item-value="id"
                      multiple
                      attach
                      chips
                      v-model="formModel.product_ids"
                      @input.native="fetchProducts($event.target.value)"
                      :error-messages="formErrors ? formErrors.product_ids : ''"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="sm" md="6">
                    <v-text-field
                      elevation="20"
                      class="mt-2"
                      solo
                      dense
                      :label="$t('label.quantity')"
                      :hint="$t('label.enterQuantityPackage')"
                      type="number"
                      :error-messages="formErrors ? formErrors.quantity : ''"
                      v-model="formModel.quantity"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <!-- text field for price and total order-->
                <v-row justify="center">
                  <v-col cols="sm" md="6">
                    <v-text-field
                      elevation="20"
                      solo
                      dense
                      type="number"
                      :label="$t('label.price')"
                      :hint="$t('label.enterPricePackage')"
                      :error-messages="formErrors ? formErrors.price : ''"
                      prefix="RM"
                      v-model="formModel.price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="sm" md="3">
                    <v-text-field
                      elevation="20"
                      solo
                      dense
                      :label="$t('label.minOrder')"
                      type="number"
                      :hint="$t('label.enterMin')"
                      v-model="formModel.min_per_user"
                      :error-messages="
                        formErrors ? formErrors.min_per_user : ''
                      "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="sm" md="3">
                    <v-text-field
                      elevation="20"
                      solo
                      dense
                      :label="$t('label.maxOrder')"
                      type="number"
                      :hint="$t('label.enterMax')"
                      v-model="formModel.limit_per_user"
                      :error-messages="
                        formErrors ? formErrors.limit_per_user : ''
                      "
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </div>

            <!-- shipping section -->
            <v-row>
              <v-card-title>
                <h3 class="black--text">Shipping</h3>
              </v-card-title>
              <v-radio-group v-model="formModel.free_shipping" row>
                <v-radio
                  color="purple"
                  value="0"
                  label="Free Shipping"
                  class="pl-3"
                ></v-radio>
                <v-radio
                  color="purple"
                  value="1"
                  label="Paid Shipping"
                ></v-radio>
              </v-radio-group>
            </v-row>

            <!-- text field packaging weight -->
            <div>
              <v-card
                class="radius background-color-grey py-0 px-5"
                max-width="770"
              >
                <v-row justify="center" align-content="center">
                  <v-col cols="sm" md="6">
                    <v-text-field
                      class="mt-2"
                      elevation="20"
                      solo
                      dense
                      type="number"
                      :label="$t('label.packagingWeight')"
                      :hint="$t('label.enterPackageWeight')"
                      v-model="shippingModel.weight"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-autocomplete
              elevation="20"
              solo
              dense
              :items="products"
              :label="$t('label.packagingWeight')"
              item-text="name"
              item-value="id"
              multiple
              attach
              chips
              v-model="formModel.product_ids"
              @input.native="fetchProducts($event.target.value)"
              :error-messages="formErrors ? formErrors.product_ids : ''"
            ></v-autocomplete> -->
                  <v-col cols="sm" md="6">
                    <v-text-field
                      class="mt-2"
                      elevation="20"
                      solo
                      dense
                      type="number"
                      :label="$t('label.packagingHeight')"
                      :hint="$t('label.enterPackageHeight')"
                      v-model="shippingModel.height"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="sm" md="6">
                    <v-text-field
                      elevation="20"
                      solo
                      dense
                      :label="$t('label.packagingLength')"
                      type="number"
                      :hint="$t('label.enterPackageLength')"
                      v-model="shippingModel.length"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="sm" md="6">
                    <v-text-field
                      elevation="20"
                      solo
                      dense
                      :label="$t('label.packagingWidth')"
                      type="number"
                      :hint="$t('label.enterPackageWidth')"
                      v-model="shippingModel.width"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <!-- - -->
          </v-card-text>

          <v-switch
            dense
            v-model="formModel.status"
            :label="
              `Status: ${
                formModel.status === 0
                  ? $t('label.inactive')
                  : $t('label.active')
              }`
            "
            color="red darken"
            true-value="1"
            false-value="0"
            class="flex text-xs-center pl-7"
          ></v-switch>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-col cols="12">
              <v-btn outlined color="indigo" class="ma-2" @click="close"
                >Close</v-btn
              >
              <v-btn
                class="default-button white--text ma-2"
                @click="submitPackage"
                >{{ $t("label.save") }}</v-btn
              >
            </v-col>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import formMixin from "@/mixins/form";
import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
import campaignPackagesVue from "@/pages/campaigns/_id/campaignPackages.vue";

export default {
  name: "FormPackage",
  mixins: [formMixin],
  props: ["totalOrder"],

  components: {
    AlertFormError,
    CrudFormAction,
    InputRadioGroup
  },
  data() {
    return {
      moduleName: "campaignPackages",
      dialog: false,

      // sections: [
      //   {
      //     product_ids: "",
      //     quantity: "",
      //     price: "",
      //     limit_per_user: "",
      //     min_per_user: "",
      //     additionals: []
      //   }
      // ],
      statusEnums: [],
      formModel: {
        product_ids: "",
        quantity: "",
        price: "",
        limit_per_user: "",
        min_per_user: "",
        name: "",
        slug: "",
        campaign_id: this.$route.params.id,
        sell_method: null,
        keyword: "",
        color: "",
        status: "",
        free_shipping: ""
      },
      shippingModel: {
        package_id: "",
        width: "",
        length: "",
        height: "",
        weight: ""
      },
      swatches: [
        ["#CC0000", "#0070C0"],
        ["#FF9900", "#002060"],
        ["#0FB694", "#7030A0"],
        ["#7ECA2D", "#ED2C67"],
        ["#109E51", "#DE6656"]
      ]
    };
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    products() {
      return this.$store.state.products.records;
    }
  },

  methods: {
    resetForm() {
      this.formModel = {
        product_ids: "",
        quantity: "",
        price: "",
        limit_per_user: "",
        min_per_user: "",
        name: "",
        slug: "",
        campaign_id: parseInt(this.$route.params.id),
        sell_method: 1,
        keyword: "",
        color: "",
        status: "",
        free_shipping: ""
      };
      this.shippingModel = {
        package_id: "",
        width: "",
        length: "",
        height: "",
        weight: ""
      };
    },
    uppercase() {
      this.formModel.keyword = this.formModel.keyword.toUpperCase();
      this.shippingModel.keyword = this.shippingModel.keyword.toUpperCase();
      console.log(this.formModel.keyword);
      console.log(this.shippingModel.keyword);
    },
    fetchProducts() {
      this.$store.dispatch("products/fetchItems");
    },
    updateValue(evt) {
      this.formModel.color = evt.hex;
      this.formModel.showPalette = false;
    },
    close() {
      this.dialog = false;
      this.resetForm();
    },

    async submitPackage() {
      try {
        let res = await this.$api[this.moduleName].create(
          this.formModel,
          this.$route.params.id
        );
        console.log(res);
        this.handleApiSuccess(res);
        this.shippingModel.package_id = res.data.id;
        console.log(this.shippingModel.package_id);
        let res1 = await this.$api.campaignShippings.create(
          this.shippingModel,
          this.$route.params.id
        );
        this.close();
        this.fetchItems();
      } catch (err) {
        this.handleApiErrors(err);
      }
    },

    async fetchItems() {
      await this.$store.dispatch(
        this.moduleName + "/fetchItems",
        {campaign_id :this.$route.params.id}
      );
    }

    // async fetchCounter() {
    //   try {
    //     let res = await this.$api.campaigns.orderCount(this.$route.params.id);
    //     var last =
    //       res.data.campaign_packages[res.data.campaign_packages.length - 1];
    //     this.totalOrder.push(last.order_count);
    //     // this.totalOrder.push({id: last.campaign_package_id, value: last.order_count});
    //     this.handleApiSuccess(this.totalOrder);
    //   } catch (err) {
    //     this.handleApiErrors(err);
    //   }
    // }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 25px !important;
}
</style>
