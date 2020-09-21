<template>
  <div class="mb-5">
    <vs-row class="">
      <vs-col vs-w="3" vs-xs="12" vs-sm="4" vs-md="4">
        <p>{{$t('label.orderStatus')}}</p>
        <v-select
          :options="orderStatusEnums"
          label="description"
          @input="searchItem($event, 'order_status')"
          v-model="formModel.order_status"
        >
        </v-select>
      </vs-col>

      <vs-col vs-w="3" vs-xs="12" vs-sm="4" vs-md="4">
        <p>{{$t('label.paymentStatus')}}</p>
        <v-select
          :options="paymentEnums"
          label="description"
          @input="searchItem($event, 'payment_status')"
          v-model="formModel.payment_status"
        >
        </v-select>
      </vs-col>

      <vs-col vs-w="3" vs-xs="12" vs-sm="4" vs-md="4">
        <vs-input
          :label="$t('label.name')"
          v-model="formModel.buyer_name"
          class="border-radius-button"
        ></vs-input>
      </vs-col>

      <vs-col vs-w="3" vs-xs="12" vs-sm="4" vs-md="4">
        <vs-input
          :label="$t('label.invoiceNo')"
          v-model="formModel.invoice_no"
          class="border-radius-button"
        ></vs-input>
      </vs-col>
    </vs-row>
    <vs-row>
      <div>
        <search-form-action
          v-on:search="searchItem()"
          v-on:reset="resetItem()"
        ></search-form-action>
      </div>
    </vs-row>
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
        invoice_no: null,
        buyer_name: null,
        order_status: null,
        payment_status: null
      }
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    orderStatusEnums() {
      return this.$store.state[this.moduleName].statusEnums;
    },
    paymentEnums() {
      return this.$store.state[this.moduleName].paymentEnums;
    }
  },
  methods: {
    initialize() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "orderStatus",
        stateKey: "statusEnums"
      });
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "paymentStatus",
        stateKey: "paymentEnums"
      });
    },
    async searchItem(data, field) {
      this.formModel[field] = data.value;
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
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 25px !important;
}
</style>
