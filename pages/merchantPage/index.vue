<template>
  <div id="pages__merchantPage">
    <div class="grid grid-cols-3 gap-4 mt-20" v-if="merchantPage.length == 0">
      <div class="col-span-3 md:col-span-1 flex content-center flex-wrap">
        <h1 class="mb-4">Selling on Facebook</h1>
        <p>
          A Facebook shop lets you show and sell products to people on
          Facebook. Choose a Facebook Page to add a shop.
        </p>
      </div>

      <vx-card title="Facebook Account" title-color="primary" class="col-span-3 md:col-span-2">
        <p class="mb-3">
          You need to connect your facebook account before start using all
          facebook features, including page shops.
        </p>
        <vs-button
          color="#3b5998"
          class="w-100 my-auto mt-3"
          :href="redirectPage + '/v1/auth/fb-page/' + this.user.id"
        >
          <vs-row>
            <vs-col vs-type="flex" vs-w="auto">
              <feather-icon icon="FacebookIcon" class="mr-1" />
              <span class="my-auto">{{ $t("label.connectWithFacebook") }}</span>
            </vs-col>
          </vs-row>
        </vs-button>
      </vx-card>
    </div>
    <div v-else id="data-list-thumb-view" class="data-list-container">
      <vs-table
        ref="table"
        v-model="selected"
        :max-items="itemsPerPage"
        search
        :data="merchantPage"
      >
        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
          <!-- ITEMS PER PAGE -->
          <!--vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span
              class="mr-2"
            >{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div-->
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <!--vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
          </vs-dropdown-->
        </div>

        <template slot="thead">
          <vs-th>Image</vs-th>
          <vs-th sort-key="name">Name</vs-th>
          <vs-th sort-key="page_id">Page ID</vs-th>
          <vs-th sort-key="category">Expires on</vs-th>

          <vs-th class="text-center">Action</vs-th>
        </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <img :src="tr.picture" class="product-img" />
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.name }}</p>
              </vs-td>

              <vs-td>
                <p class="product-name font-medium truncate">{{ tr.page_id }}</p>
              </vs-td>

              <vs-td>
                <p v-if="tr.subscription" class="product-category">{{ tr.subscription.end_date }}</p>
                <p v-else class="product-category">-</p>
              </vs-td>

              <vs-td class="whitespace-no-wrap text-center">
                <vs-button
                  color="danger"
                  type="gradient"
                  icon-pack="feather"
                  icon="icon-video"
                  class="mr-2 mb-1 mt-1"
                  @click.stop="liveVideo(tr)"
                >Live Now</vs-button>
                <!--vs-button
                  color="primary"
                  type="gradient"
                  icon-pack="feather"
                  icon="icon-dollar-sign"
                  class="mt-1"
                >Topup</vs-button-->
              </vs-td>
            </vs-tr>
          </tbody>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import AlertConfirmation from "@/components/widgets/alerts/AlertConfirmation";
import { apiRoutes } from "@/config";
require("dotenv").config();

export default {
  layout: "main",
  name: "index",
  components: {
    AlertConfirmation,
  },
  asyncData({ app, store }) {
    return {
      redirectPage: process.env.API_URL,
      moduleName: "merchantPages",
      headers: [
        { text: app.i18n.t("label.name"), value: "name" },
        { text: app.i18n.t("label.pageUrl"), value: "page_url" },
        { text: app.i18n.t("label.pageId"), value: "page_id" },
        { text: app.i18n.t("label.actions"), value: "actions" },
      ],
      user: null,
      selected: [],
      // products: [],
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
    };
  },
  computed: {
    merchantPage() {
      return this.$store.state[this.moduleName].records;
    },
  },
  created() {
    this.initialize();
    this.fetchMerchantPage();
  },
  methods: {
    initialize() {
      this.user = this.$store.state.auth.user;
      console.log(this.user);
    },
    async fetchMerchantPage() {
      try {
        await this.$store.dispatch(this.moduleName + "/fetchItems");
      } catch (err) {
        console.log(err);
      }
    },
    async liveVideo(page) {
      try {
        this.$router.push({
          path: `/merchantPage/${page.id}/liveVideo`,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  head: {
    title: "Merchant Page",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        content: "Merchant page",
      },
    ],
  },
};
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    background: none;
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      // margin-left: 1.5rem;
      // margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      // padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            // .product-img {
            //   height: 60px;
            // }
          }

          &.text-center {
            justify-content: center;
            span {
              display: inline-block;
            }
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.text-center {
        .vs-table-text {
          text-align: center;
          justify-content: center;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
