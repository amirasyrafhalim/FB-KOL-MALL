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
      <h4>{{ isCreate ? "ADD NEW" : "UPDATE" }} CAMPAIGN</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
     <div class="px-6 py-2" v-if="isCreate ? true : false">
        <span>Type</span>
        <v-select :options="botResponseType" v-model="typeMessage" label="description"/>
        <span class="text-danger text-sm pa-5" :error-messages="formErrors ? formErrors.type : ''"
                >{{ this.formErrors.type ? this.formErrors.type[0] : "" }}</span
              >
      </div>
    <div class="p-6">
        <span>Custom Message</span>
        <vs-input v-model="message" class="w-full" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.message : ''">{{ this.formErrors.message ? this.formErrors.message[0] : '' }}</span>
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
    moduleName: ''
  },
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      merchant_id: null,
      message: "",
      typeMessage: "",
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      isCreate: true
    };
  },
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
          this.isCreate = true
        this.initValues();
      } else {
          this.isCreate = false
        const { merchant_id, message, type } = JSON.parse(JSON.stringify(this.data));
        this.merchant_id = merchant_id;
        this.message = message;
        this.typeMessage = type;
        this.initValues();
      }
    },
  },
  computed: {
      botResponseType() {
      return this.$store.state[this.moduleName].botEnums;
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
      this.getBotResponseType()
  },
  methods: {
      getBotResponseType() {
      this.$store.dispatch(`${this.moduleName}/fetchEnums`, {
        routeName: "botResponseType",
        stateKey: "botEnums"
      });
    },
    initValues() {
      if (this.data.id) return;
      this.merchant_id = null;
      this.message = "";
      this.typeMessage = ""
    },
    async submitData() {
        if(typeof (this.typeMessage) === 'object') {
            var message = this.typeMessage.value
        } else {
            var message = this.typeMessage
        }

      const obj = {
        merchant_id: this.$auth.state.user.merchant.id,
        message: this.message,
        type: message,
      };
      try {
           let res = this.isCreate
          ? await this.$api.bots.create(obj)
          : await this.$api.bots.update(obj, this.data.id);
          this.handleApiSuccess(res, this.redirectRoute);
           this.popupActive2 = false;
            this.$emit('closeSidebar')
      } catch (err) {
          this.handleApiErrors(err);
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
