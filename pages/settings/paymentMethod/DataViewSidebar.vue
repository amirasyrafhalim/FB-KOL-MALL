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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD" : "UPDATE" }} PAYMENT METHOD</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
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
        <v-select multiple :options="payment" v-model="formModel.payment_method_id" class="w-full" name="item-name" />
      </div>

    </component>
 
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="validate" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
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
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      dataId: null,
      dataName: "",
      dataDescription: "",
      dataStatus: "",
        payment: [
        { label: "Xenopay", code: 1 },
        { label: "Offline", code: 2 }
      ],
      status: [
        { label: "Active", code: 1 },
        { label: "Inactive", code: 0 },
      ],
      dataCategory: "",
      dataImg: "",
         formModel: {
        payment_method_id: []
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
      } else {
        const {
          id,
          name,
          merchant_id,
          description,
          status,
          category,
          image,
        } = JSON.parse(JSON.stringify(this.data));
        this.dataId = id;
        this.dataName = name;
        this.merchantId = merchant_id;
        this.dataDescription = description;
        this.dataStatus = status.description;
        this.dataCategory = category;
        this.dataImg = image;
        this.initValues();
      }
    },
  },
  created() {
    this.fetchItem();
  },
  computed: {

    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      },
    },
    isFormValid() {
      return true;
    },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
  },

  methods: {
      async fetchItem() {
      await this.$store.dispatch(
        "merchants/fetchItem",
        this.$store.state.auth.user.merchant.id
      );
    },
     async validate() {
        var a= []
         this.formModel.payment_method_id.forEach((element,id) => {
            a.push(element.code)
        });
        const obj = {
            payment_method_id : a
        }
      if (this.formModel.payment_method_id != null) {
        try {
          let res = await this.$api.merchants.update(obj, this.$store.state.auth.user.merchant.id);
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
      if (this.data.id) return;
      this.dataId = null;
      this.dataName = "";
      this.merchantId = "";
      this.dataDescription = "";
      this.dataStatus = "";
      this.dataCategory = "";
      this.dataImg = "";
    },
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
