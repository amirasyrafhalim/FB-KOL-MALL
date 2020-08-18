<template>
  <div>
    <v-card class="components__campaigns-form-search mb-5">
      <v-card-text class="pt-0">
        <v-row>
          <v-col sm="6" md="4">
            <v-autocomplete
              :items="merchants"
              :label="$t('menuTitle.facebookPage')"
              item-text="name"
              item-value="id"
              v-model="formModel.merchant_id"
              clearable
              @change="searchItem($event)"
            ></v-autocomplete>
          </v-col>
          <v-col sm="6" md="4">
              <v-autocomplete
              :items="campaigns"
              :label="$t('menuTitle.campaign')"
              item-text="name"
              item-value="id"
              v-model="formModel.campaign_id"
              @change="searchItem($event)"
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="components__campaigns-form-search mb-5">
      <v-card-text class="pt-0">
        <v-row>
          <v-col sm="6" md="4">
            <v-select
              :items="deliveryMethodsEnums"
              :label="$t('label.deliveryMethod')"
              item-text="description"
              item-value="value"
              hide-details
              v-model="formModel.delivery_method"
              clearable
              @change="searchItem($event)"
            ></v-select>
          </v-col>
          <v-col sm="6" md="4">
            <v-select
              :items="paymentEnums"
              :label="$t('label.paymentStatus')"
              item-text="description"
              item-value="value"
              hide-details
              v-model="formModel.payment_status"
              clearable
              @change="searchItem($event)"
            ></v-select>
          </v-col>
          <v-col sm="6" md="4">
            <v-select
              :items="deliveryEnums"
              :label="$t('label.deliveryStatus')"
              item-text="description"
              item-value="value"
              hide-details
              v-model="formModel.delivery_status"
              clearable
              @change="searchItem($event)"
            ></v-select>
          </v-col>
        </v-row>

        <!-- <search-form-action
          v-on:search="searchItem()"
          v-on:reset="resetItem()"
        ></search-form-action> -->
      </v-card-text>
    </v-card>
    <v-divider />
    <v-card class="components__campaigns-form-search mb-5">
      <v-card-text class="pt-0">
        <v-row>
          <v-col sm="6" md="4">
            <v-text-field
              :label="$t('label.orderCode')"
              v-model="formModel.code"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6" md="4">
            <v-text-field
              :label="$t('label.invoiceNo')"
              v-model="formModel.invoice_no"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="6" md="4">
            <v-text-field
              :label="$t('label.trackingNo')"
              v-model="formModel.tracking_no"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <search-form-action
          v-on:search="searchItem()"
          v-on:reset="resetItem()"
        ></search-form-action>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import SearchFormAction from "@/components/widgets/forms/SearchFormAction";

export default {
  name: "FormSearch",
  props: ["moduleName"],
  components: {
    SearchFormAction
  },
  data() {
    return {
      formModel: {
        code: null,
        invoice_no: null,
        tracking_no: null,
        merchant_name: null,
      }
    };
  },
  created() {
    this.initialize();
    this.fetchMerchants();
    this.fetchCampaigns();
  },
  computed: {
    deliveryMethodsEnums() {
      return this.$store.state[this.moduleName].deliveryMethodsEnums;
    },
    paymentEnums() {
      return this.$store.state[this.moduleName].paymentEnums;
    },
    deliveryEnums() {
      return this.$store.state[this.moduleName].deliveryEnums;
    },
    records() {
      return this.$store.state[this.moduleName].records;
    },
    merchants() {
      return this.$store.state.merchants.records;
    },
    campaigns() {
      return this.$store.state.campaigns.records;
    }
  },
  methods: {
    initialize() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "deliveryMethod",
        stateKey: "deliveryMethodsEnums"
      });
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "paymentStatus",
        stateKey: "paymentEnums"
      });
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "deliveryStatus",
        stateKey: "deliveryEnums"
      });
    },
    async searchItem(data) {
       await this.fetchCampaigns(data)
      await this.$store.dispatch(this.moduleName + "/fetchItems", {
        ...this.formModel
      });
      await this.$store.dispatch(this.moduleName + "/resetPagination");
     
    },
    resetItem() {
      this.$helper.clearSearchForm(this.formModel);
      this.$store.dispatch(this.moduleName + "/fetchItems", {
        ...this.formModel
      });
      this.$store.dispatch(this.moduleName + "/resetPagination");
    },
    fetchMerchants(value) {
      this.$store.dispatch(`merchants/fetchItems`, {
        code: value
      });
    },
    fetchCampaigns(value) {
      this.$store.dispatch(`campaigns/fetchItems`, {
        merchant_id: value
      });
    }
  }
};
</script>

<style scoped></style>
