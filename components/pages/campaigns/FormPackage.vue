<template>
  <v-card class="radius ">
    <v-card-title>
      <h3 class="mt-5">Package</h3>
    </v-card-title>
    <v-card-text class="pb-0">
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
        <v-radio value="top" label="Single Item" class="pr-10 pl-10"></v-radio>
        <v-radio value="right" label="Bundle"></v-radio>
      </v-row>
      <v-card-title>
        <h3 class="mt-10" style="color:black;">
          {{ $t("label.selling") }}
        </h3>
      </v-card-title>

      <!-- Card for package -->
      <v-col cols="10" sm="7" md="6" class="pl-3">
        <v-card class="mb-5 mt-2" outlined>
          <v-list-item>
            <v-radio value="top" label="Keyword" class="pr-10"></v-radio>
            <v-radio value="right" label="Bidding"></v-radio>
          </v-list-item>
          <v-list-item-subtitle>
            <v-col cols="10">
              <v-text-field label="Insert Your Keyword"></v-text-field>
            </v-col>
          </v-list-item-subtitle>
        </v-card>
      </v-col>

      <!-- item section -->
      <v-row>
        <h2 class="black--text mt-5 mb-5 pl-7 pr-3">
          {{ $t("label.packageItem") }}
        </h2>

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
          class="flex text-xs-center"
        ></v-switch>

        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          class="text-right mb-5 mt-5"
          :loading="loading"
          @click="$emit('submit')"
        >
          {{ $t("label.addItem") }}
        </v-btn>
      </v-row>

      <!-- Card for item -->
      <v-card class="radius mx-10 m background-color-grey">
        <v-card class=" mx-10 mb-10 transparent elevation-0 ">
          <v-row>
            <v-card-title>
              <h4>Item 1</h4>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-col sm="2">
              <v-btn icon dark large>
                <img
                  width="15px"
                  height="20px"
                  color="white"
                  src="/deletePurple.png"
                />
                <h4 style="color:red; text-transform: capitalize;">
                  {{ $t("label.delete") }}
                </h4>
              </v-btn>
            </v-col>
          </v-row>

          <!-- text field products and quantity -->
          <v-row>
            <v-autocomplete
              class="ml-10 mr-5"
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
            <v-text-field
              class="ml-5 mr-10"
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
          </v-row>

          <!-- - -->

          <!-- text field for price and total order-->
          <v-row>
            <v-text-field
              class="ml-10 mr-5"
              elevation="20"
              solo
              dense
              type="number"
              :label="$t('label.price')"
              :error-messages="formErrors ? formErrors.price : ''"
              prefix="RM"
              v-model="formModel.price"
            ></v-text-field>
            <v-text-field
              class="ml-5 mr-2"
              elevation="20"
              solo
              dense
              :label="$t('label.minOrder')"
              type="number"
              :hint="$t('label.enterMin')"
              v-model="formModel.minimum_per_user"
              :error-messages="formErrors ? formErrors.minimum_per_user : ''"
            >
            </v-text-field>
            <v-text-field
              class="ml-2 mr-10"
              elevation="20"
              solo
              dense
              :label="$t('label.maxOrder')"
              type="number"
              :hint="$t('label.enterMin')"
              v-model="formModel.maximum_per_user"
              :error-messages="formErrors ? formErrors.minimum_per_user : ''"
            >
            </v-text-field>
          </v-row>
          <!-- - -->

          <!-- shipping section -->
          <v-row>
            <v-card-title>
              <h4>Shipping Item 1</h4>
            </v-card-title>
            <v-spacer></v-spacer>
          </v-row>

          <!-- text field packaging weight -->
          <v-row>
            <v-autocomplete
              class="ml-10 mr-5"
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
              v-model="formModel.packaging_weight"
              @input.native="fetchProducts($event.target.value)"
              :error-messages="formErrors ? formErrors.product_ids : ''"
            ></v-autocomplete>
            <v-card class="ml-5 mr-10">
              <v-list-item>
                <v-radio value="top" label="Keyword"></v-radio>
                <v-radio value="right" label="Bidding"></v-radio>
                <v-radio label="Bidding"></v-radio>
              </v-list-item>
            </v-card>
          </v-row>
          <!-- - -->

          <!-- text field for shipping fee-->
          <v-row>
            <v-text-field
              class="ml-10 mr-5 mt-7"
              elevation="20"
              solo
              dense
              type="number"
              :label="$t('label.shippingFee')"
              :error-messages="formErrors ? formErrors.price : ''"
              v-model="formModel.price"
            ></v-text-field>
            <v-text-field
              class="mx-2 mt-7"
              elevation="20"
              solo
              dense
              :label="$t('label.minKg')"
              type="number"
              :hint="$t('label.enterMin')"
              v-model="formModel.minimum_kg"
              :error-messages="formErrors ? formErrors.minimum_per_user : ''"
            >
            </v-text-field>
            <v-text-field
              class="ml-5 mr-10 mt-7"
              elevation="20"
              solo
              dense
              :label="$t('label.maxKg')"
              type="number"
              :hint="$t('label.enterMin')"
              v-model="formModel.maximum_kg"
              :error-messages="formErrors ? formErrors.minimum_per_user : ''"
            >
            </v-text-field>
          </v-row>
          <!-- - -->
          <div class="d-inline-flex my-5">
            <v-btn
              width="20%"
              outlined
              class="mx-2"
              color="grey"
              text
              @click="close"
              >Close</v-btn
            >
            <v-btn
              class="default-button mx-2"
              color="white"
              width="20%"
              text
              @click="submitPackage"
              >{{ $t("label.save") }}</v-btn
            >
          </div>
        </v-card>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import CrudFormAction from "@/components/widgets/forms/CrudFormAction";
import formMixin from "@/mixins/form";

export default {
  name: "FormPackage",
  mixins: [formMixin],
  props: ["totalOrder"],
  components: {
    AlertFormError,
    CrudFormAction
  },
  data() {
    return {
      moduleName: "campaignPackages",
      dialog: false,
      formModel: {
        name: "",
        keyword: "",
        product_ids: [],
        quantity: "",
        price: "",
        color: "",
        showPalette: false,
        limit_per_user: "",
        minimum_per_user: "",
        status: 0
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
    uppercase() {
      this.formModel.keyword = this.formModel.keyword.toUpperCase();
      console.log(this.formModel.keyword);
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
    resetForm() {
      this.formModel = {
        name: "",
        keyword: "",
        product_ids: [],
        quantity: "",
        price: "",
        color: "",
        showPalette: false,
        limit_per_user: "",
        minimum_per_user: "",
        status: 0
      };
    },
    async submitPackage() {
      try {
        let res = await this.$api[this.moduleName].create(
          this.formModel,
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
        this.moduleName + "/fetchItems",
        this.$route.params.id
      );
      this.fetchCounter();
    },
    async fetchCounter() {
      try {
        let res = await this.$api.campaigns.orderCount(this.$route.params.id);
        var last =
          res.data.campaign_packages[res.data.campaign_packages.length - 1];
        this.totalOrder.push(last.order_count);
        // this.totalOrder.push({id: last.campaign_package_id, value: last.order_count});
        this.handleApiSuccess(this.totalOrder);
      } catch (err) {
        this.handleApiErrors(err);
      }
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 25px !important;
}
</style>
