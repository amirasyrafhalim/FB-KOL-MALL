<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
              class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} PRODUCT</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

      <template v-if="dataImg">

        <!-- Image Container -->
        <div class="img-container w-64 mx-auto flex items-center justify-center">
          <img :src="dataImg" alt="img" class="responsive">
        </div>

        <!-- Image upload Buttons -->
        <div class="modify-img flex justify-between mt-5">
          <input type="file" class="hidden" ref="updateImgInput" @change="updateCurrImg" accept="image/*">
          <vs-button class="mr-4" type="flat" @click="$refs.updateImgInput.click()">Update Image</vs-button>
          <vs-button type="flat" color="#999" @click="dataImg = null">Remove Image</vs-button>
        </div>
      </template>

      <div class="p-6 py-2">
        <vs-input label="Name" v-model="dataName" class="mt-5 w-full" name="item-name"/>
      </div>

      <div class="p-6 py-2">
        <vs-input label="Description" v-model="dataDescription" class="mt-5 w-full" name="item-description"/>
      </div>

      <div class="px-6 py-2">
        <v-select :options="status" v-model="dataStatus" />
      </div>

      <div class="px-6 py-2">
        <v-select :options="category" v-model="dataCategory" label="name"/>
      </div>

      <div class="upload-img px-6 py-2">

        <input type="file" class="hidden" ref="uploadImgInput" @change="updateCurrImg" accept="image/*">
        <vs-button @click="$refs.uploadImgInput.click()">Upload Image</vs-button>
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

export default {
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
      dataDescription: '',
      dataStatus: '',
      status: [
        {label: 'Inactive', code: 0},
        {label: 'Active', code: 1},
      ],
      dataCategory: '',
      dataImg: null,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
      } else {
        const {id, name, merchant_id, description, status, category, image} = JSON.parse(JSON.stringify(this.data))
        this.dataId = id
        this.dataName = name
        this.merchantId = merchant_id
        this.dataDescription = description
        this.dataStatus = status
        this.dataCategory = category
        this.dataImg = image
        this.initValues()
      }
    }
  },
  created(){
    this.fetchCategory();
  },
  computed: {
    category(){
      return this.$store.state.categories.records;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar')
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
  methods: {
    initValues() {
      if (this.data.id) return
      this.dataId = null
      this.dataName = ''
      this.merchantId = 2
      this.dataDescription = ''
      this.dataStatus = ''
      this.dataCategory = ''
      this.dataImg = ''
    },
    submitData() {

      const obj = {
        merchant_id: this.merchantId,
        name: this.dataName,
        description: this.dataDescription,
        category_id: this.dataCategory.id,
        image: this.dataImg.replace(/^data:(.*;base64,)?/, ""),
        status: this.dataStatus.code,
      }

      if (this.dataId !== null && this.dataId >= 0) {
        this.$api.products.update(obj, this.dataId).catch(err => {
          console.error(err)
        })
      } else {

        this.$api.products.create(obj);

      }
      this.$emit('fetchItems')
      this.$emit('closeSidebar')
      this.initValues()
    },
    updateCurrImg (input) {

      if (input.target.files && input.target.files[0])
      {
        const reader = new FileReader()
        reader.onload = e => {
          this.dataImg = e.target.result
          console.log(this.dataImg )
        }
        reader.readAsDataURL(input.target.files[0])
      }
    },
    fetchCategory(page = 1) {
      let params = {page: page};
      this.$store.dispatch("categories/fetchItems", params);
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
