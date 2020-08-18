<template>
  <div id="components__packageList">
    <v-row>
      <v-col>
        <campaign-header
          :packages="packages"
          :array-keywords="arrayKeywords"
          :package-max="packageMax"
          :package-quantity="packageQuantity"
          :comments="comments"
          :total-order="totalOrder"
          :disabled="disabled"
          v-on:buyerOrder="updateTotalOrder($event)"
          v-on:checkStreamStart="updateDisable($event)"
          v-on:fetchStreamEnd="updateDisable($event)"
          v-on:fetchVideo="updateLog($event)"
          v-on:fetchStreamStart="updateLog($event)"
          v-on:pauseStream="updateLog($event)"
          v-on:streamRefresh="updateLog($event)"
          v-on:updateStatus="updateStatus($event)"
        ></campaign-header>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <add-shipping :shippingList="shippingList" />
        <v-divider />
        <br />
        <v-row
          justify="center"
          wrap
          style="overflow-y: scroll; max-height: 61vh max-height: 600px"
          class="overflow-y-auto"
        >
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
                    <!-- <v-col>
                      <v-btn
                        class="float-right"
                        x-small
                        fab
                        color="red"
                        v-on:click="removeElement(data.id)"
                      >
                        <v-icon class="white--text">&times;</v-icon>
                      </v-btn>
                    </v-col> -->
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
                        :disabled="disabled"
                      ></v-switch>
                    </v-col>
                    <v-col cols="6" class="pa-0 float-right">
                      <span class="subtitle-1">{{
                        $t("label.orderCounter")
                      }}</span>
                      <div class="headline">{{ totalOrder[key] }}</div>
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
                      @change="
                        editPackage(packageQuantity[key], key, 'quantity')
                      "
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <v-text-field
                      :label="$t('label.minOrder')"
                      type="number"
                      v-model="packageMin[key]"
                      @change="
                        editPackage(packageMin[key], key, 'minimum_per_user')
                      "
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
                      type="number"
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

                    <v-list-item class="px-0">
                      <v-list-item-content class="py-0">
                        <v-list-item-title
                          class="title font-weight-black underline"
                          >{{ $t("label.product") }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      two-line
                      v-for="(field, i) in records[key].products"
                      :key="i"
                      class="px-0 border"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ field.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ field.description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
        <v-row>
          <v-col>
            <form-package :total-order="totalOrder" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <campaign-order-log :comments="comments" :logData="logData" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CampaignHeader from "./CampaignHeader";
import FormPackage from "./FormPackage";
import formMixin from "@/mixins/form";
import CampaignOrderLog from "./CampaignOrderLog";
import BasicLog from "./BasicLog";
import AddShipping from "./AddShipping";

export default {
  name: "CampaignPackageList",
  components: {
    BasicLog,
    CampaignOrderLog,
    FormPackage,
    CampaignHeader,
    AddShipping
  },
  mixins: ["formMixin"],
  props: ["products"],
  data() {
    return {
      moduleName: "campaignPackages",
      packages: [],
      packageStatus: [],
      packageQuantity: [],
      packageMax: [],
      packageMin: [],
      packagePrice: [],
      productsArray: [],
      totalOrder: [],
      comments: [],
      arrayKeywords: [],
      disabled: false,
      range: null,
      logData: null,
      shippingList: [
        {
          minimum_price: "",
          maximum_price: "",
          shipping_fee: ""
        }
      ],
      minPrice: []
    };
  },
  created() {
    this.fetchItems();
    this.initialize();
    this.fetchShipping();
  },
  watch: {
    records(value) {
      this.packageStatus = [];
      value.forEach((data, key) => {
        this.packageStatus.push(data.status);
        this.packageQuantity.push(data.quantity);
        this.packageMax.push(data.limit_per_user);
        this.packageMin.push(data.minimum_per_user);
        this.packagePrice.push(data.price);
        this.productsArray.push(data.product_ids);
      });
      this.getKeywords();
    },
    shippingRecords(value) {
      value.forEach((data, i) => {
        if (i == 0) {
          this.shippingList[i].minimum_price = 0.0;
        }
        if (i != 0) {
          this.shippingList[i].minimum_price =
            parseFloat(value[i - 1].maximum_price) + 0.01;
        }
        this.shippingList[i].maximum_price = data.maximum_price;
        this.shippingList[i].shipping_fee = data.shipping_fee;
      });
    }
  },
  computed: {
    records() {
      this.packages = this.$store.state[this.moduleName].records;
      return this.packages;
    },
    shippingRecords() {
      this.shippingList = this.$store.state.campaignShippings.shippingRecords;
      return this.shippingList;
    }
  },
  methods: {
    initialize() {
      if (this.packages && this.totalOrder) {
        this.fetchCounter();
      }
    },
    fetchItems() {
      this.$store.dispatch(
        this.moduleName + "/fetchItems",
        this.$route.params.id
      );
    },
    async fetchShipping() {
      await this.$store.dispatch(
        "campaignShippings/fetchItemsShipping",
        this.$route.params.id
      );
    },
    async fetchCounter() {
      try {
        this.totalOrder = [];
        let res = await this.$api.campaigns.orderCount(this.$route.params.id);
        res.data.campaign_packages.forEach((data, index) => {
          this.totalOrder.push(data.order_count);
          if (this.totalOrder[index] >= this.packages[index].quantity) {
            this.editPackage(0, index, "status");
          }
        });
      } catch (err) {
        console.log(err);
      }
    },

    async editPackage(data, key, field) {
      var id = this.packages[key].id;
      var formModel = {
        name: field === "name" ? data : this.packages[key].name,
        color: field === "color" ? data : this.packages[key].color,
        keyword: field === "keyword" ? data : this.packages[key].keyword,
        quantity: field === "quantity" ? data : this.packages[key].quantity,
        limit_per_user:
          field === "limit_per_user" ? data : this.packages[key].limit_per_user,
        minimum_per_user:
          field === "minimum_per_user"
            ? data
            : this.packages[key].minimum_per_user,
        price: field === "price" ? data : this.packages[key].price,
        product_ids:
          field === "product_ids" ? data : this.packages[key].product_ids,
        status: field === "status" ? data : this.packages[key].status
      };

      try {
        let res = await this.$api.campaignPackages.update(
          formModel,
          id,
          this.$route.params.id
        );
        await this.fetchItems();
        if (field === "status") {
          this.getKeywords();
        }
      } catch (err) {
        console.log(err);
      }
    },
    getKeywords() {
      this.arrayKeywords = [];

      this.packages.forEach((data, index) => {
        if (this.packageStatus[index] === 1) {
          this.arrayKeywords.push(data.keyword + " ");
        } else {
          this.arrayKeywords.push(null);
        }
      });
      if (this.access_token && this.facebook_live_id) {
        this.captureComment(this.facebook_live_id, this.access_token);
      }
    },
    updateTotalOrder: function() {
      this.fetchCounter();
    },
    updateDisable: function(updateDisable) {
      this.disabled = updateDisable;
    },
    updateLog: function(updateLog) {
      this.logData = updateLog;
    },
    updateStatus: function(updateStatus) {
      this.editPackage(updateStatus.statusInactive, updateStatus.id, "status");
    },
    // async removeElement(index) {
    //   console.log(this.moduleName)
    //   let res = await this.$api.campaignPackages.delete(
    //       index,
    //       this.$route.params.id
    //     );
    //     await this.fetchItems();
    // }
  }
};
</script>

<style scoped></style>
