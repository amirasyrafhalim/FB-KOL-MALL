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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} CAMPAIGN</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <div class="p-6">
        <span>Name</span>
        <vs-input v-model="dataName" class="w-full" name="item-name" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.name : ''">{{ this.formErrors.name ? this.formErrors.name[0] : '' }}</span>
      </div>

      <div class="px-6 py-2" v-if="Object.entries(this.data).length != 0 ? true : false">
        <span>Status</span>
        <v-select :options="status" v-model="dataStatus" />
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
      dataStatus: { label: "Active", code: 1 },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      status: [
        { label: "Inactive", code: 0 },
        { label: "Active", code: 1 },
        { label: "Complete", code: 2 },
        { label: "Pause", code: 3 },
      ],
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
      } else {
        const { id, name, status } = JSON.parse(JSON.stringify(this.data));
        this.dataId = id;
        this.dataName = name;
        this.dataStatus = status.description;
        this.initValues();
      }
    },
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          this.formErrors = ''
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
    initValues() {
      if (this.data.id) return;
      this.dataId = null;
      this.dataName = "";
    },
    async submitData() {
      const obj = {
        merchant_id: this.$auth.state.user.merchant.id,
        name: this.dataName,
        status: this.dataStatus.code,
      };
      if (this.dataId !== null && this.dataId >= 0) {
        try {
          let res = await this.$api.campaigns.update(obj, this.dataId);
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
          let res = await this.$api.campaigns.create(obj);
          if (res.http_code == 201) {
            this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false;
            this.$emit('closeSidebar')
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
