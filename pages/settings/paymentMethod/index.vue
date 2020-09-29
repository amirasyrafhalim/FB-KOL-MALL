<template>
  <div id="data-list-list-view" class="data-list-container">
    <div v-if="merchant.payment_method_id == null">
      <vx-card>
        <div>
          <div class="vx-col w-full">
            <div
              class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
            >
              <h3 class="sm:mx-0 mx-4 mb-2 font-semibold">
                Add Payment Method
              </h3>
              <h5 class="font-normal">
                Enable payment methods to accept offline payment
              </h5>
              <h5 class="sm:mx-0 mx-4 mb-6 font-normal">
                and other payment methods during checkout.
              </h5>
            </div>

            <div class="mt-5 flex items-center justify-center mb-5">
              <div
                class="flex flex-wrap-reverse items-center data-list-btn-container"
              >
                <data-view-sidebar
                  :isSidebarActive="addNewDataSidebar"
                  @closeSidebar="toggleDataSidebar"
                  @fetchItem="fetchItem"
                  :data="sidebarData"
                />
                <vs-button
                  color="primary"
                  type="filled"
                  size="large"
                  @click="addNewData"
                >
                  <span class="ml-2 ">Add Payment Method</span>
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>

    <div v-if="merchant.payment_method_id != null">
      <data-view-sidebar
        :isSidebarActive="addNewDataSidebar"
        @closeSidebar="toggleDataSidebar"
        @fetchItem="fetchItem"
        :data="sidebarData"
      />
      <div class="flex flex-wrap-reverse items-center data-list-btn-container">
        <div
          class="btn-add-new p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-center text-lg font-medium text-base text-primary border border-solid border-primary"
          @click="addNewData"
        >
          <feather-icon icon="EditIcon" svgClasses="h-4 w-4" />
          <span class="ml-2 text-base text-primary">Edit Payment</span>
        </div>
      </div>

      <div class="vx-row mb-base">
        <div
          v-for="(item, index) in merchant.payment_method_id"
          :key="index"
          class="vx-col lg:w-1/2 w-full"
        >
          <vx-card class="mb-base" v-if="item == 1">
            <td class="font-semibold ">Xenopay</td>
            <vs-divider class="pb-6"></vs-divider>
            <div class="flex flex-col justify-center">
              <div class="mb-5 justify-center vx-row">
                <div>
                  <img class="pl-2" :src="'/visa.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/mastercard.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/grab-pay.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/touchngo-ewallet.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/boost.png'" />
                </div>
              </div>
              <div class=" justify-center vx-row">
                <div>
                  <img class="pl-2" :src="'/fpx.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/paypal.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/mcash.png'" />
                </div>
                <div>
                  <img class="pl-2" :src="'/maybank-qr.png'" />
                </div>
              </div>
            </div>
          </vx-card>
          <vx-card class="mb-base" v-if="item == 2">
            <td class="font-semibold">Offline</td>
            <vs-divider></vs-divider>
            <div v-if="records.length === 0">
              <div class="text-center mb-5">
                <span
                  >Fill in the required info correctly to ensure success
                </span>
                <span>receiving of payment.</span>
              </div>
              <div class="text-center">
                <vs-button
                  @click="popupActive2 = true"
                  color="primary"
                  type="filled"
                  size="large"
                  >Add Bank Information</vs-button
                >
              </div>
            </div>
            <div v-if="records.length !== 0">
              <div>
                <table v-for="(data, i) in records" :key="i">
                  <tr>
                    <td class="font-semibold pb-6">Bank Name</td>
                    <td class="pl-6 pb-6">{{ data.bank.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold pb-6">Name</td>
                    <td class="pl-6 pb-6">{{ data.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-semibold pb-6">Account No.</td>
                    <td class="pl-6 pb-6">{{ data.account_no }}</td>
                  </tr>
                </table>

                <p style="color:red;font-size:11px;">
                  *Please contact the customer service if you want to update
                  your bank information..
                </p>
              </div>
            </div>
          </vx-card>
        </div>
      </div>

      <vs-popup
        classContent="popup-example"
        title="Add Bank Information"
        :active.sync="popupActive2"
      >
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Bank Name</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <v-select
              name="status"
              :options="bank"
              label="name"
              v-model="formModel.bank_id"
            />
            <span
              class="text-danger text-sm"
              :error-messages="formErrors ? formErrors.bank_id : ''"
              >{{
                this.formErrors.bank_id ? this.formErrors.bank_id[0] : ""
              }}</span
            >
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Name</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input class="w-full" icon-no-border v-model="formModel.name" />
            <span
              class="text-danger text-sm"
              :error-messages="formErrors ? formErrors.name : ''"
              >{{ this.formErrors.name ? this.formErrors.name[0] : "" }}</span
            >
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Account No</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input class="w-full" v-model="formModel.accountno" />
            <span
              class="text-danger text-sm"
              :error-messages="formErrors ? formErrors.account_no : ''"
              >{{
                this.formErrors.account_no ? this.formErrors.account_no[0] : ""
              }}</span
            >
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mt-8 flex flex-wrap items-center justify-end">
              <vs-button class="ml-auto mt-2" @click="validate"
                >Save Changes</vs-button
              >
              <vs-button
                class="ml-4 mt-2"
                type="border"
                color="warning"
                @click="reset"
                >Reset</vs-button
              >
            </div>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import DataViewSidebar from "./DataViewSidebar.vue";
import formMixin from "@/mixins/form";
export default {
  layout: "main",
  mixins: [formMixin],
  components: {
    DataViewSidebar
  },

  data() {
    return {
      popupActive2: false,
      merchant_id: this.$auth.state.user.merchant.id,
      moduleName: "merchants",
      activeConfirm: false,
      selected: [],
      itemsPerPage: 4,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {},
      payment_method_id: [],
      formModel: {
        bank_id: "",
        accountno: "",
        name: "",
        remark: "",
        status: 1,
        image: ""
      }
    };
  },
  computed: {
    bank() {
      return this.$store.state.banks.records;
    },
    records() {
      return this.$store.state.merchantBanks.records;
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },

    merchant() {
      return this.$store.state.merchants.record;
    },

    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.records.length;
    }
  },
  methods: {
    fetchBank(page = 1) {
      let params = { page: page };
      this.$store.dispatch("banks/fetchItems", params);
    },
    reset() {
      this.formModel = {
        bankname: "",
        accountno: "",
        name: "",
        remark: "",
        status: ""
      };
    },
    fetchUser(merchant_Id) {
      let params = { merchant_Id: this.$store.state.auth.user.merchant.id };
      this.$store.dispatch("merchantBanks/fetchItems", params);
    },
    async validate() {
      const obj = {
        bank_id: this.formModel.bank_id.id,
        merchant_id: this.$auth.state.user.merchant.id,
        name: this.formModel.name,
        account_no: this.formModel.accountno,
        status: this.formModel.status,
        remark: this.formModel.remark,
        image: this.formModel.image.replace(/^data:(.*;base64,)?/, "")
      };
      try {
        let res = await this.$api.merchantBanks.create(obj, this.user.id);
        if (res.http_code == 201) {
          this.handleApiSuccess(res, this.redirectRoute);
          this.popupActive2 = false;
          this.$emit("closeSidebar");
        }
        this.fetchUser();
        this.popupActive2 = false;
      } catch (err) {
        if (err) {
          this.handleApiErrors(err);
          this.$vs.notify({
            title: "Failed!",
            text: "Please insert your data correctly",
            color: "danger",
            position: "bottom-left"
          });
        }
      }
    },
    async getPaymentMethodEnum() {
      try {
        const { data } = await this.$api.enums.paymentMethod();
        console.log("enumss", data);
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

    addNewData() {
      this.sidebarData = {};
      this.toggleDataSidebar(true);
    },
    confirmDeleteRecord(id) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: "You are about to delete",
        accept: this.deleteRecord,
        parameters: id
      });
    },

    editData(data) {

      console.log(data)
      this.sidebarData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.addNewDataSidebar = val;
    }
  },

  created() {
    this.fetchUser();
    this.fetchBank();
    this.fetchItem();
    this.getPaymentMethodEnum();
    this.user = this.$store.state.auth.user;
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

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
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
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

  .vs-lg-6 {
    width: 100% !important;
  }
}
</style>
