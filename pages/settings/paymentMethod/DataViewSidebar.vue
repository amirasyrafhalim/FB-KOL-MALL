<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4 v-if="merchant.payment_method_id != null">
        EDIT PAYMENT METHOD
      </h4>
      <h4  v-if="merchant.payment_method_id == null">
        ADD PAYMENT METHOD
      </h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6 py-2">
        <span>Payment Method</span>
        <v-select
          multiple
          :options="paymentMethodEnums"
          label="description"
          v-model="formModel.payment_method_id"
          @input="getPaymentMethodEnum($event)"
          class="w-full"
          name="item-name"
        />
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="validate" :disabled="!isFormValid"
        >Submit</vs-button
      >
      <vs-button
        type="border"
        color="danger"
        @click="isSidebarActiveLocal = false"
        >Cancel</vs-button
      >
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import map from "lodash/map";

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      dataStatus: "",
      paymentMethodEnums: [],
      formModel: {
        payment_method_id: []
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },

  watch: {
    // async merchant(val) {
    //   this.formModel.payment_method_id = [];
    //   if (!val) return;
    //   if (this.paymentMethodEnums.length > 0) {
    //     await val.payment_method_id.forEach(data => {
    //       this.formModel.payment_method_id.push(this.newPm[data]);
    //     });
    //   }
      
    // }
      async merchant(val) {
      this.formModel.payment_method_id = [];
      if (!val) return;
      if (this.paymentMethodEnums.length > 0) {
        await val.payment_method_id.forEach((data, key) => {
   
          if (key == 0)
          {
            var a = 1;
          }
          if (key == 1){
            var a = 2;
          }

          console.log('test', this.paymentMethodEnums)
          this.formModel.payment_method_id.push(this.paymentMethodEnums[key]);
        });
      }
    }
  },
  created() {
    this.fetchItem();
    this.getPaymentMethodEnum();
  },
  computed: {
    // newPm() {
    //   let newPm =[]
    //   this.paymentMethodEnums.forEach(index => {
    //     newPm[index.value] = {description : index.description, value: index.value};
    //   });
    //   return newPm;
    // },
    merchant() {
      return this.$store.state.merchants.record;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    },
    isFormValid() {
      return true;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    }
  },

  methods: {
    async getPaymentMethodEnum(event) {
      try {
        const { data } = await this.$api.enums.paymentMethod();
        this.paymentMethodEnums = data;
      } catch (error) {
        console.error("[API Service] Get Payment Method Error:", error);
      }

    },
    async fetchItem() {
      await this.$store.dispatch(
        "merchants/fetchItem",
        this.$store.state.auth.user.merchant.id
      );
    },
    async validate() {

     var a = [];
      this.formModel.payment_method_id.forEach((element, id) => {
        a.push(element.value);
      });

      const obj = {
        payment_method_id: a
      };
     

      if (a.length !== 0) {
        try {
          let res = await this.$api.merchants.update(
            obj,
            this.$store.state.auth.user.merchant.id
          );
          if (res.http_code == 200) {
            this.$vs.notify({
              title: "Success!",
              text: "Your data has been updated",
              color: "success",
              position: "bottom-left"
            });
          }
          this.fetchItem();
          this.$emit("closeSidebar");
        } catch (err) {
          if (err) {
            this.$vs.notify({
              title: "Failed!",
              text: "Please insert your data correctly",
              color: "danger",
              position: "bottom-left"
            });
          }
        }
      } else
        this.$vs.notify({
          title: "Failed!",
          text: "Please insert your data correctly",
          color: "danger",
          position: "bottom-left"
        });
    },
    initValues() {
      this.payment_method_id = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
