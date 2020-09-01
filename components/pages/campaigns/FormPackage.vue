<template>
  <div>
    <v-card class="radius ">
      <v-card-title>
        <h3 class="mt-5 pl-3">Package</h3>
      </v-card-title>
      <v-card-text class="pb-5">
        <v-row>
          <v-col cols="5" class=" pl-3">
            <v-text-field
              dense
              v-model="formModel.name"
              :label="$t('label.packageName')"
              required
              :error-messages="formErrors ? formErrors.name : ''"
              elevation="20"
              solo
              class="pl-4"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-title>
          <h3 class="mt-10" style="color:black;">
            {{ $t("label.selling") }}
          </h3>
        </v-card-title>

        <!-- Card for package -->
        <v-col cols="10" sm="7" md="6" class="pl-3">
          <v-card class="mb-5 mt-2" outlined>
            <v-col cols="10">
              <v-row>
                <v-radio-group v-model="formModel.sell_method" row>
                  <v-radio
                    color="purple"
                    value="1"
                    label="Keyword"
                    class="pl-3"
                  ></v-radio>
                  <v-radio color="purple" value="2" label="Bidding"></v-radio>
                </v-radio-group>
              </v-row>
            </v-col>
            <br />
            <v-list-item-subtitle>
              <v-col cols="10">
                <v-text-field
                  v-model="formModel.keyword"
                  label="Insert Your Keyword"
                ></v-text-field>
              </v-col>
            </v-list-item-subtitle>
          </v-card>
        </v-col>
        <!-- - -->

        <!-- color section -->
        <h2 class="black--text mt-5 pl-3 mb-5">
          {{ $t("label.color") }}
        </h2>
        <v-col cols="10">
          <v-color-picker
            @input="updateValue($event)"
            disabled
            hide-inputs
            class="ma-2 mb-5"
            width="500px"
            :swatches="swatches"
            canvas-height="300"
            show-swatches
            elevation="2"
          >
          </v-color-picker>
        </v-col>
        <!-- - -->

        <!-- item section -->
        <v-row class="px-7">
          <h2 class="black--text mt-5 mb-5 pr-3">
            {{ $t("label.packageItem") }}
          </h2>
        </v-row>

        <!-- Card for item -->
        <!-- <div v-for="section in sections" :key="section"> -->
        <v-card class="radius mx-10 mb-10 mt-5 background-color-grey">
          <v-card class="mx-10 transparent elevation-0">
            <v-row>
              <!-- <v-card-title>
                <h4>Item {{ index + 1 }}</h4>
              </v-card-title> -->
              <!-- <v-spacer></v-spacer> -->
              <v-col sm="2">
                <!-- <v-btn icon dark large>
                  <img
                    width="15px"
                    height="20px"
                    color="white"
                    :src="require('~/assets/img/delete.png')"
                  />
                  <h4 style="color:red; text-transform: capitalize;">
                    {{ $t("label.delete") }}
                  </h4>
                </v-btn> -->
              </v-col>
            </v-row>

            <!-- text field products and quantity -->
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
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
              <v-col cols="12" md="6">
                <v-text-field
                  elevation="20"
                  solo
                  dense
                  :label="$t('label.quantity')"
                  type="number"
                  :error-messages="formErrors ? formErrors.quantity : ''"
                  :hint="$t('label.quantityError')"
                  v-model="formModel.quantity"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <!-- - -->

            <!-- text field for price and total order-->
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  elevation="20"
                  solo
                  dense
                  type="number"
                  :label="$t('label.price')"
                  :error-messages="formErrors ? formErrors.price : ''"
                  prefix="RM"
                  v-model="formModel.price"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  elevation="20"
                  solo
                  dense
                  :label="$t('label.minOrder')"
                  type="number"
                  :hint="$t('label.enterMin')"
                  v-model="formModel.min_per_user"
                  :error-messages="formErrors ? formErrors.min_per_user : ''"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  elevation="20"
                  solo
                  dense
                  :label="$t('label.maxOrder')"
                  type="number"
                  :hint="$t('label.enterMin')"
                  v-model="formModel.limit_per_user"
                  :error-messages="formErrors ? formErrors.limit_per_user : ''"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <!-- - -->
          </v-card>
        </v-card>
        <!-- </div> -->

        <!-- shipping section -->
        <v-row>
          <v-card-title>
            <h4 class="pl-3 black--text mb-5">Shipping Item 1</h4>
          </v-card-title>
          <v-radio-group v-model="formModel.free_shipping" row>
            <v-radio
              color="purple"
              value="0"
              label="Free Shipping"
              class="pl-3"
            ></v-radio>
            <v-radio color="purple" value="1" label="Paid Shipping"></v-radio>
          </v-radio-group>
        </v-row>

        <!-- text field packaging weight -->
        <v-card class="mx-10 transparent elevation-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                elevation="20"
                solo
                dense
                type="number"
                :label="$t('label.packagingWeight')"
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
            <v-col cols="12" md="6">
              <v-text-field
                elevation="20"
                solo
                dense
                type="number"
                :label="$t('label.packagingHeight')"
                v-model="shippingModel.height"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- - -->

          <!-- text field for shipping fee-->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                elevation="20"
                solo
                dense
                :label="$t('label.packagingLength')"
                type="number"
                :hint="$t('label.enterMin')"
                v-model="shippingModel.length"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                elevation="20"
                solo
                dense
                :label="$t('label.packagingWidth')"
                type="number"
                :hint="$t('label.enterMin')"
                v-model="shippingModel.width"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <!-- - -->
      </v-card-text>
      <v-switch
        dense
        v-model="formModel.status"
        :label="
          `Status: ${
            formModel.status === 0 ? $t('label.inactive') : $t('label.active')
          }`
        "
        color="red darken"
        true-value="1"
        false-value="0"
        class="flex text-xs-center pl-7 mb-5"
      ></v-switch>
      <v-card-actions class="pt-0 mb-5">
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

    <!-- <v-btn color="blue darken-1" text @click="submitShipping">{{
      $t("label.save")
    }}</v-btn> -->
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import formMixin from "@/mixins/form";
import InputRadioGroup from "@/components/widgets/forms/InputRadioGroup";
import campaignPackagesVue from '../../../pages/campaigns/_id/campaignPackages.vue';

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
          this.$route.params.id,
        );
        console.log(res);
        this.handleApiSuccess(res);
        // await this.fetchItems();
        this.shippingModel.package_id = res.data.id;
        console.log(this.shippingModel.package_id);
        let res1 = await this.$api.campaignShippings.create(
          this.shippingModel,
          this.$route.params.id
        );
        this.close();
        // this.handleApiSuccess(res1);
      } catch (err) {
        this.handleApiErrors(err);
      }
    },

    async fetchItems() {
      await this.$store.dispatch(
        this.moduleName + "/fetchItems",
        this.$route.params.id
      );
      this.fetchCounter();
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
