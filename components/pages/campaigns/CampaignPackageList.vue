<template>
  <v-row>
    <v-col cols="12">
      <v-row
        justify="center"
        wrap
        style="overflow-y: scroll; max-height: 61vh max-height: 600px"
        class="overflow-y-auto"
      >
        <h3 class="grey--text" v-if="noRecords">No records found...</h3>
        <v-expansion-panels inset focusable>
          <v-expansion-panel v-for="(data, key) in packages" :key="key">
            <v-expansion-panel-header>
              <div>
                <v-row>
                  <v-col cols="auto" class="my-auto">
                    <div
                      class="pa-4"
                      :style="
                        'background-color:' +
                          data.color +
                          '; border-radius: 50%; float: left'
                      "
                    ></div>
                  </v-col>
                  <v-col cols class="float-right">
                    <div class="headline ">
                      {{ data.name }} [ {{ data.keyword }} ]
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="py-0">
                    <v-switch
                      class="mt-0 mb-0"
                      v-model="packageStatus[key]"
                      :label="
                        `${
                          packageStatus[key] === 0
                            ? $t('label.inactive')
                            : $t('label.active')
                        }`
                      "
                      :true-value="1"
                      :false-value="0"
                      @change="editPackage(packageStatus[key], key, 'status')"
                      color="primary"
                    ></v-switch>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-header>
            <v-divider></v-divider>
            <v-expansion-panel-content>
              <v-row>
                <v-col class="pb-0">
                  <v-text-field
                    :label="$t('label.quantity')"
                    type="number"
                    v-model="packageQuantity[key]"
                    @change="editPackage(packageQuantity[key], key, 'quantity')"
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    :label="$t('label.minOrder')"
                    type="number"
                    v-model="packageMin[key]"
                    @change="editPackage(packageMin[key], key, 'min_per_user')"
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    :label="$t('label.maxOrder')"
                    type="number"
                    v-model="packageMax[key]"
                    @change="
                      editPackage(packageMax[key], key, 'limit_per_user')
                    "
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <v-text-field
                    :label="$t('label.price')"
                    v-model="packagePrice[key]"
                    @change="editPackage(packagePrice[key], key, 'price')"
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row wrap>
                <v-col class="py-0">
                  <v-autocomplete
                    dense
                    :items="products"
                    :label="$t('label.products')"
                    item-text="name"
                    item-value="id"
                    multiple
                    attach
                    chips
                    v-model="productsArray[key]"
                    @change="
                      editPackage(productsArray[key], key, 'product_ids')
                    "
                    @input.native="fetchProducts($event.target.value)"
                    :disabled="disabled"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    class="float-right"
                    x-small
                    fab
                    color="red"
                    v-on:click="removeElement(data.id)"
                  >
                    <v-icon class="white--text">mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-col>
    <alert-confirmation ref="confirmDialog" />
  </v-row>
</template>
<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import formMixin from "@/mixins/form";
export default {
  name: "CampaignPackageList",
  mixins: ["formMixin"],
  props: ["products"],
  components: {
    AlertConfirmation
  },
  data() {
    return {
      noRecords: true,
      moduleName: "campaignPackages",
      packages: [],
      packageStatus: [],
      packageQuantity: [],
      packageMax: [],
      packageMin: [],
      packagePrice: [],
      productsArray: [],
      arrayKeywords: [],
      disabled: false
    };
  },
  created() {
    this.fetchItems();
    // this.initialize();
    // this.fetchShipping();
  },
  watch: {
    records(value) {
      this.packageStatus = [];
      value.forEach((data, key) => {
        this.packageStatus.push(data.status);
        this.packageQuantity.push(data.quantity);
        this.packageMax.push(data.limit_per_user);
        this.packageMin.push(data.min_per_user);
        this.packagePrice.push(data.price);
        this.productsArray.push(data.product_ids);
      });
    }
  },

  computed: {
    records() {
      // this.packages = this.$store.state[this.moduleName].records;
      this.packages = this.$store.state.campaignPackages.records;
      if (this.packages.length != 0) {
        this.noRecords = false;
      }
      return this.packages;
    }
  },

  methods: {
    async fetchItems() {
      var a = await this.$store.dispatch(
        this.moduleName + "/fetchItems", {campaign_id: this.$route.params.id}  
      );
    },
    // initialize() {
    //   if (this.packages && this.totalOrder) {
    //     this.fetchCounter();
    //   }
    // },

    // async fetchCounter() {
    //   try {
    //     this.totalOrder = [];
    //     let res = await this.$api.campaigns.orderCount(this.$route.params.id);
    //     console.log(res);
    //     res.data.campaign_packages.forEach((data, index) => {
    //       this.totalOrder.push(data.order_count);
    //       if (this.totalOrder[index] >= this.packages[index].quantity) {
    //         this.editPackage(0, index, "status");
    //       }
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    async editPackage(data, key, field) {
      var id = this.packages[key].id;
      var formModel = {
        name: field === "name" ? data : this.packages[key].name,
        color: field === "color" ? data : this.packages[key].color,
        keyword: field === "keyword" ? data : this.packages[key].keyword,
        quantity: field === "quantity" ? data : this.packages[key].quantity,
        limit_per_user:
          field === "limit_per_user" ? data : this.packages[key].limit_per_user,
        min_per_user:
          field === "min_per_user" ? data : this.packages[key].min_per_user,
        price: field === "price" ? data : this.packages[key].price,
        product_ids:
          field === "product_ids" ? data : this.packages[key].product_ids,
        status: field === "status" ? data : this.packages[key].status.value
      };

      try {
       
        let res = await this.$api.campaignPackages.update(
          formModel,
          id,
          this.$route.params.id
        );
      } catch (err) {
        console.log(err);
      }
    },

    async removeElement(index) {
      await this.$refs.confirmDialog
        .open(this.$t("label.delete"), this.$t("message.confirmDelete"), {
          color: "warning"
        })
        .then(confirm => {
          if (confirm) {
            this.$api.campaignPackages.delete(index, this.$route.params.id);
          }
        });
      await this.fetchItems();
    }

    //    async removeElement(index) {
    //   this.$refs.confirmDialog
    //     .open(this.$t("label.delete"), this.$t("message.confirmDelete"), {
    //       color: "warning"
    //     })
    //     .then(confirm => {
    //       this.$api.campaignPackages.delete(index, this.$route.params.id);
    //       this.fetchItems();
    //     });
    // }
  }
};
</script>
