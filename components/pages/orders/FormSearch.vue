<template>
  <div class="mb-5 " >
      <div class="vx-row flex-end">
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{$t('label.name')}}</label>
          <vs-input class="w-full" v-model="formModel.buyer_name" />
        </div>
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{$t('label.invoiceNo')}}</label>
          <vs-input class="w-full" v-model="formModel.invoice_no" />
        </div>
       
        <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{$t('label.orderStatus')}}</label>
         <v-select style="background: white" :clearable=false :options="orderStatusEnums" label="description"  v-model="formModel.order_status">
        </v-select>
        </div>
         <div class="vx-col md:w-1/4 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">{{$t('label.paymentStatus')}}</label>
         <v-select style="background: white" :clearable=false :options="paymentEnums" label="description" v-model="formModel.payment_status">
        </v-select>
        </div>
      </div>
       <search-form-action v-on:search="searchItem()" v-on:reset="resetItem()"> </search-form-action>
  
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
      var a = {}

      a.buyer_name = this.formModel.buyer_name;
      a.invoice_no = this.formModel.invoice_no;
      if(this.formModel.order_status) {
         a.status = this.formModel.order_status.value;
      } else if (this.formModel.payment_status) {
        a.payment_status = this.formModel.payment_status.value;
      }
      console.log('b', this.formModel.order_status)
      console.log('a', a)

      await this.$store.dispatch(this.moduleName + "/fetchItems",a
      );
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
.flex-end {
  justify-content: flex-end;
}
</style>
