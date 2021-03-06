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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} SHIPPING</h4>
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
        <span>Shipping Partner</span>
        <v-select
          :options="partners"
          v-model="dataShippingPartner"
          label="name"
          placeholder="Select Shipping Partner"
        />
         <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.shipping_partner_id : ''">{{ this.formErrors.shipping_partner_id ? this.formErrors.shipping_partner_id[0] : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Name</span>
        <vs-input v-model="dataName" class="w-full" name="item-name" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.name : ''">{{ this.formErrors.name ? this.formErrors.name[0] : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Fee (RM)</span>
        <vs-input v-model="dataFee" class="w-full" name="item-fee" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.fee : ''">{{ this.formErrors.fee ? this.formErrors.fee[0] : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Free Minimum Type</span>
        <v-select
          :options="FreeMinimumType"
          v-model="dataFreeMinimumType"
          placeholder="Select Free Minimum Type"
        />
      </div>

      <div class="px-6 py-2">
        <span>Free Minimum Value</span>
        <vs-input v-model="dataFreeMinimumValue" class="w-full" name="item-free-minimum-value" />
      </div>

      <div class="px-6 py-2" label="Status">
        <span>Status</span>
        <vs-row>
          <vs-col class="py-2" vs-type="flex">
            <vs-radio class="py-2" v-model="dataStatus"  vs-name="status" vs-value="1">Active</vs-radio>
            <vs-radio class="px-6 py-2" v-model="dataStatus"  vs-name="status" vs-value="0">Inactive</vs-radio>
          </vs-col>
        </vs-row>
        <span
          class="text-danger text-sm"
          :error-messages="formErrors ? formErrors.status : ''">{{ this.formErrors.status ? this.formErrors.status[0] : '' }}</span>
      </div>

    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import formMixin from "@/mixins/form";

  export default {
    mixins: [formMixin],
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: () => {
        }
      }
    },
    components: {
      VuePerfectScrollbar
    },
    data() {
      return {
        dataId: null,
        dataName: '',
        dataFee: '',
        dataStatus: '',
        status: 1,
        dataFreeMinimumType: '',
        dataFreeMinimumValue: null,
        dataShippingPartner: '',
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: .60
        },
        FreeMinimumType: [
          {label: 'Price', code: 1},
          {label: 'Quantity', code: 2},
        ],
      }
    },
    watch: {
      isSidebarActive(val) {
        if (!val) return
        if (Object.entries(this.data).length === 0) {
          this.initValues()
        } else {
          const {id, name, fee, free_minimum_type, free_minimum_value, status, partner} = JSON.parse(JSON.stringify(this.data))
          this.dataId = id
          this.dataShippingPartner = partner.name
          this.dataName = name
          this.dataFee = fee
          this.dataStatus = status && status.value
          this.dataFreeMinimumType = free_minimum_type && free_minimum_type.description ? free_minimum_type.description : ''
          this.dataFreeMinimumValue = free_minimum_value
          this.initValues()
        }
      }
    },
    computed: {
      partners() {
        return this.$store.state.shippingPartners.records;
      },
      isSidebarActiveLocal: {
        get() {
          return this.isSidebarActive
        },
        set(val) {
          if (!val) {
            this.$emit('closeSidebar')
            this.formErrors = ''
          }
        }
      },
      isFormValid() {
        return true;
      },
      scrollbarTag() {
        return this.$store.getters.scrollbarTag
      }
    },
    created() {
      this.fetchPartners();
    },
    methods: {
      fetchPartners(page = 1) {
        let params = { page: page };
        this.$store.dispatch("shippingPartners/fetchItems", params);
      },
      initValues() {
        if (this.data.id) return
        this.dataId = null
        this.dataShippingPartner = ''
        this.dataName = ''
        this.dataFee  = ''
        this.dataStatus = 1;
        this.dataFreeMinimumType = ''
        this.dataFreeMinimumValue = null
      },
      async submitData() {
        const obj = {
          merchant_id: this.$auth.state.user.merchant.id,
          shipping_partner_id: this.dataShippingPartner.id,
          name: this.dataName,
          fee: this.dataFee,
          status: this.dataStatus,
          free_minimum_type: this.dataFreeMinimumType.code,
          free_minimum_value: this.dataFreeMinimumValue
        }
        if (this.dataId !== null && this.dataId >= 0) {
           try {
          let res = await this.$api.shippingMethods.update(obj, this.dataId);
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
          let res = await this.$api.shippingMethods.create(obj);
          if (res.http_code == 201) {
            this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false;
            this.$emit("closeSidebar");
          }
        } catch (err) {
          this.handleApiErrors(err);
        }
        }
        this.$emit('fetchItems')
      },
    }
  }
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
