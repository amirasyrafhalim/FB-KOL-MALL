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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} PACKAGE</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="px-6 py-2">
        <span>Name</span>
        <vs-input v-model="dataName" class="w-full" name="item-name" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.name : ''">{{ this.formErrors ? this.formErrors.name : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Sell Method</span>
        <v-select :options="sellMethod" v-model="dataSellMethod" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.sell_method : ''">{{ this.formErrors ? this.formErrors.sell_method : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Keyword</span>
        <vs-input v-model="dataKeyword" class="w-full" name="item-keyword" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.keyword : ''">{{ this.formErrors ? this.formErrors.keyword : '' }}</span>
      </div>

      <vs-row>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Price</span>
            <vs-input v-model="dataPrice" class="w-full" name="item-price" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.price : ''">{{ this.formErrors ? this.formErrors.price : '' }}</span>
          </div>
        </vs-col>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Quantity</span>
            <vs-input v-model="dataQuantity" class="w-full" name="item-quantity" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.quantity : ''">{{ this.formErrors ? this.formErrors.quantity : '' }}</span>
          </div>
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Min Per User</span>
            <vs-input v-model="dataMinPerUser" class="w-full" name="item-min-per-user" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.min_per_user : ''">{{ this.formErrors ? this.formErrors.min_per_user : '' }}</span>
          </div>
        </vs-col>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Limit Per User</span>
            <vs-input v-model="dataLimitPerUser" class="w-full" name="item-limit-per-user" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.limit_per_user : ''">{{ this.formErrors ? this.formErrors.limit_per_user : '' }}</span>
          </div>
        </vs-col>
      </vs-row>

      <div class="px-6 py-2">
        <span>Product</span>
        <v-select multiple :options="products" v-model="dataProductIds" label="name" />
      </div>

      <div class="px-6 py-2">
        <span>Status</span>
        <v-select :options="status" v-model="dataStatus" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.status : ''">{{ this.formErrors ? this.formErrors.status : '' }}</span>
      </div>

      <vs-row>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Weight</span>
            <vs-input v-model="dataWeight" class="w-full" name="item-weight" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.weight : ''">{{ this.formErrors ? this.formErrors.weight : '' }}</span>
          </div>
        </vs-col>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Length</span>
            <vs-input v-model="dataLength" class="w-full" name="item-length" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.length : ''">{{ this.formErrors ? this.formErrors.length : '' }}</span>
          </div>
        </vs-col>
      </vs-row>

      <vs-row>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Height</span>
            <vs-input v-model="dataHeight" class="w-full" name="item-height" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.height : ''">{{ this.formErrors ? this.formErrors.height : '' }}</span>
          </div>
        </vs-col>
        <vs-col vs-w="6">
          <div class="px-6 py-2">
            <span>Width</span>
            <vs-input v-model="dataWidth" class="w-full" name="item-width" />
            <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.width : ''">{{ this.formErrors ? this.formErrors.width : '' }}</span>
          </div>
        </vs-col>
      </vs-row>

      <div class="px-6 py-2">
        <span>Shipping Method</span>
        <v-select multiple :options="shippingMethods" v-model="dataShippingMethod" label="name" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.shipping_method : ''">{{ this.formErrors ? this.formErrors.shipping_method : '' }}</span>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import map from "lodash/map";
import formMixin from "@/mixins/form";

export default {
  mixins: [formMixin],
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
      dataSellMethod: "",
      dataKeyword: "",
      dataColor: "",
      dataQuantity: "",
      dataMinPerUser: "",
      dataLimitPerUser: "",
      dataPrice: "",
      dataProductIds: "",
      dataStatus: "",
      dataWeight: "",
      dataLength: "",
      dataHeight: "",
      dataWidth: "",
      dataShippingMethod: null,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      swatches: [
        ["#CC0000", "#0070C0"],
        ["#FF9900", "#002060"],
        ["#0FB694", "#7030A0"],
        ["#7ECA2D", "#ED2C67"],
        ["#109E51", "#DE6656"],
      ],
      sellMethod: [
        { label: "Keyword", code: 1 },
        {label: 'Bidding', code: 2},
      ],
      status: [
        { label: "Inactive", code: 0 },
        { label: "Active", code: 1 },
      ],
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
          sell_method,
          keyword,
          color,
          quantity,
          min_per_user,
          limit_per_user,
          price,
          products,
          status,
          shipping,
        } = JSON.parse(JSON.stringify(this.data));
        this.dataId = id;
        this.dataName = name;
        this.dataSellMethod = sell_method.description;
        this.dataKeyword = keyword;
        this.dataColor = color;
        this.dataQuantity = quantity;
        this.dataMinPerUser = min_per_user;
        this.dataLimitPerUser = limit_per_user;
        this.dataPrice = price;
        this.dataProductIds = products;
        this.dataStatus = status.description;
        this.dataWeight = shipping.weight;
        this.dataLength = shipping.length;
        this.dataHeight = shipping.height;
        this.dataWidth = shipping.width;
        this.dataShippingMethod = shipping.shipping_method;
        this.initValues();
      }
    },
  },
  computed: {
    products() {
      return this.$store.state.products.records;
    },
    shippingMethods() {
      return this.$store.state.shippingMethods.records;
    },
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
  created() {
    this.fetchProducts();
    this.fetchShippingMethods();
  },
  methods: {
    fetchProducts(page = 1) {
      let params = { page: page };
      this.$store.dispatch("products/fetchItems", params);
    },
    fetchShippingMethods(page = 1) {
      let params = { page: page, status: 1};
      this.$store.dispatch("shippingMethods/fetchItems", params);
    },
    initValues() {
      if (this.data.id) return;
      this.dataId = null;
      this.dataName = "";
      this.dataSellMethod = "";
      this.dataKeyword = "";
      this.dataColor = "";
      this.dataQuantity = "";
      this.dataMinPerUser = "";
      this.dataLimitPerUser = "";
      this.dataPrice = "";
      this.dataProductIds = "";
      this.dataStatus = "";
      this.dataWeight = "";
      this.dataLength = "";
      this.dataHeight = "";
      this.dataWidth = "";
      this.dataShippingMethod = null;
    },
    async submitData() {
      const obj = {
        campaign_id: this.$route.params.id,
        name: this.dataName,
        sell_method: this.dataSellMethod.code,
        keyword: this.dataKeyword,
        color: "#CC0000",
        quantity: this.dataQuantity,
        min_per_user: this.dataMinPerUser,
        limit_per_user: this.dataLimitPerUser,
        price: this.dataPrice,
        product_ids: map(this.dataProductIds, "id"),
        status: this.dataStatus.code,
        weight: this.dataWeight,
        length: this.dataLength,
        height: this.dataHeight,
        width: this.dataWidth,
        shipping_method_id: map(this.dataShippingMethod, "id"),
      };

      if (this.dataId !== null && this.dataId >= 0) {
        try {
          let res = await this.$api.packages.update(obj, this.dataId);
          if (res.http_code == 200) {
            this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false;
            this.$emit("closeSidebar");
          }
        } catch (err) {
          this.handleApiErrors(err);
        }
      } else {
        try {
          let res = await this.$api.packages.create(obj);
          if (res.http_code == 201) {
            this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false;
          }
        } catch (err) {
          this.handleApiErrors(err);
        }
      }
      this.$emit("fetchItems");
    },
  },
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
