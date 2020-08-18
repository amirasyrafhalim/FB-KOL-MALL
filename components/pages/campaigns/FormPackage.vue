<template>
  <div id="components__formPackage">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn block color="primary" dark v-on="on">Add New Package</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">New Package</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    dense
                    v-model="formModel.name"
                    :label="$t('label.packageName')"
                    required
                    :error-messages="formErrors ? formErrors.name : ''"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    dense
                    @keyup="uppercase"
                    v-model="formModel.keyword"
                    :label="$t('label.keyword')"
                    hint="Enter your keyword without any spaces"
                    :error-messages="formErrors ? formErrors.keyword : ''"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-autocomplete
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
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    dense
                    :label="$t('label.quantity')"
                    type="number"
                    :error-messages="formErrors ? formErrors.quantity : ''"
                    :hint="$t('label.quantityError')"
                    v-model="formModel.quantity"
                  >
                    <v-icon slot="append" color="red">mdi-plus</v-icon>
                    <v-icon slot="prepend" color="green">mdi-minus</v-icon>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-text-field
                    dense
                    type="number"
                    :label="$t('label.price')"
                    :error-messages="formErrors ? formErrors.price : ''"
                    prefix="RM"
                    v-model="formModel.price"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-color-picker
                    @input="updateValue($event)"
                    disabled
                    hide-inputs
                    class="ma-2"
                    :swatches="swatches"
                    hide-canvas
                    show-swatches
                  >
                  </v-color-picker>
                </v-col>

                 <v-col cols="6" class="pb-0">
                  <v-text-field
                    dense
                    :label="$t('label.minOrder')"
                    type="number"
                    :hint="$t('label.enterMin')"
                    v-model="formModel.minimum_per_user"
                    :error-messages="
                      formErrors ? formErrors.minimum_per_user : ''
                    "
                  >
                    <v-icon slot="append" color="red">mdi-plus</v-icon>
                    <v-icon slot="prepend" color="green">mdi-minus</v-icon>
                  </v-text-field>
                </v-col>

                <v-col cols="6" class="pb-0">
                  <v-text-field
                    dense
                    :label="$t('label.maxOrder')"
                    type="number"
                    :hint="$t('label.enterMax')"
                    v-model="formModel.limit_per_user"
                    :error-messages="
                      formErrors ? formErrors.limit_per_user : ''
                    "
                  >
                    <v-icon slot="append" color="red">mdi-plus</v-icon>
                    <v-icon slot="prepend" color="green">mdi-minus</v-icon>
                  </v-text-field>
                </v-col>
                
                <v-col cols="12" class="pa-0 mt-0">
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
                    true-value="1"
                    false-value="0"
                    class="mx-auto mt-0"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text @click="submitPackage"
              >{{ $t('label.save') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import AlertFormError from "@/components/widgets/alerts/AlertFormError";
import formMixin from "@/mixins/form";

export default {
  name: "FormPackage",
  mixins: [formMixin],
  props: ["totalOrder"],
  components: {
    AlertFormError
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
        console.log(this.formModel.keyword)
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
</style>
