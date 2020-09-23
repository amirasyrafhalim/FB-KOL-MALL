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
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} PRODUCT</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component
      :is="scrollbarTag"
      class="scroll-area--data-list-add-new"
      :settings="settings"
      :key="$vs.rtl"
    >
      <template v-if="dataImg">
        <!-- Image Container -->
        <div class="img-container w-64 mx-auto flex items-center justify-center">
          <img :src="dataImg" alt="img" class="responsive" />
        </div>
        

        <!-- Image upload Buttons -->
        <div class="modify-img flex justify-between mt-5">
          <input type="file" class="hidden" ref="updateImgInput" accept="image/*" />
        </div>
      </template>

      <div class="p-6 py-2">
        <span>Name</span>
        <vs-input
          v-model="dataName"
          class="w-full"
          name="item-name"
        />
         <span class="text-danger text-sm">{{ this.formErrors.name ? this.formErrors.name[0] : ''  }}</span>
      </div>
    
      <div class="p-6 py-2">
        <span>Description</span>
        <vs-textarea v-model="dataDescription" class="w-full" name="item-description" />
          <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.description : ''">{{ this.formErrors.description ? this.formErrors.description[0] : '' }}</span>
      </div>

      <div class="px-6 py-2" label="Status">
        <span>Status</span>
        <v-select :options="status" v-model="dataStatus" />
          <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.status : ''">{{ this.formErrors.status ? this.formErrors.status[0] : '' }}</span>
      </div>

      <div class="px-6 py-2">
        <span>Category</span>
        <v-select :options="category" v-model="dataCategory" label="name" />
        <span class="text-danger text-sm" :error-messages="formErrors ? formErrors.category_id : ''">{{ this.formErrors.category_id ? this.formErrors.category_id[0] : '' }}</span>
      </div>

      <div class="upload-img px-6 py-2">
        <input
          type="file"
          class="hidden"
          ref="uploadImgInput"
          @change="updateCurrImg"
          accept="image/*"
        />
        <vs-button
          @click="$refs.uploadImgInput.click()"
          color="success"
          type="gradient"
        >Upload Image</vs-button>
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
      dataDescription: "",
      dataStatus: "",
      status: [
        { label: "Active", code: 1 },
        { label: "Inactive", code: 0 },
      ],
      dataCategory: "",
      dataImg: "",
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
    this.fetchCategory();
  },
  computed: {
    category() {
      return this.$store.state.categories.records;
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
  methods: {
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
    async submitData() {
      function isValidURL(string) {
        if (string) {
          var res = string.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
          );
        }
        return res !== null;
      }

      if (!isValidURL(this.dataImg)) {
        var dataImage = this.dataImg.replace(/^data:(.*;base64,)?/, "");
      }

      if (isValidURL(this.dataImg)) {
        const toDataURL = (url) =>
          fetch(url)
            .then((response) => response.blob())
            .then(
              (blob) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                })
            );

        toDataURL(this.dataImg).then((dataUrl) => {
          var dataImage = dataUrl.replace(/^data:(.*;base64,)?/, "");
        });
      }

      var a = map(this.dataCategory, "id");
      if (!this.dataCategory.id) {
        var e = a[0];
      } else {
        var e = this.dataCategory.id;
      }
      const obj = {
        merchant_id: this.$auth.state.user.merchant.id,
        name: this.dataName,
        description: this.dataDescription,
        category_id: e,
        image: dataImage,
        status: this.dataStatus.code,
      };

      if (this.dataId !== null && this.dataId >= 0) {
        try {
          let res = await this.$api.products.update(obj, this.dataId);
          if (res.http_code == 200) {
            this.handleApiSuccess(res, this.redirectRoute);
            this.popupActive2 = false; 
            this.$emit('closeSidebar')
          }
        } catch (err) {
          this.handleApiErrors(err);
        }
      } else {
        try {
          let res = await this.$api.products.create(obj);
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

    updateCurrImg(input) {
      if (input.target.files && input.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.dataImg = e.target.result;
        };
        reader.readAsDataURL(input.target.files[0]);
      }
    },

    fetchCategory(page = 1) {
      let params = { page: page };
      this.$store.dispatch("categories/fetchItems", params);
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
