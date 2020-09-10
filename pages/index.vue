<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card
          slot="no-body"
          class="text-center greet-user h-full"
          card-background="linear-gradient(120deg, #633CD2, #8A2FA1, #982B8F)"
          v-if="this.$auth.loggedIn && this.$auth.user && this.$auth.user.merchant"
        >
          <feather-icon
            icon="VideoIcon"
            class="p-6 mb-8 bg-white inline-flex rounded-full text-primary shadow"
            svgClasses="h-8 w-8"
          ></feather-icon>

          <p
            class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white"
          >Go to live videos to start selling now.</p>

          <vs-button
            color="danger"
            type="relief"
            class="mt-2"
            :to="localePath({name: 'merchantPage-id-liveVideo', params:{id:this.$auth.user.merchant.id}})"
          >LIVE VIDEOS</vs-button>
        </vx-card>
        <vx-card
          slot="no-body"
          class="text-center greet-user h-full"
          card-background="linear-gradient(120deg, #7f7fd5, #86a8e7, #91eae4)"
          v-else
        >
          <feather-icon
            icon="FacebookIcon"
            class="p-6 mb-8 bg-white inline-flex rounded-full text-primary shadow"
            svgClasses="h-8 w-8"
          ></feather-icon>

          <p
            class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white"
          >Start connecting your facebook page.</p>

          <vs-button
            color="#3b5998"
            type="relief"
            class="mt-2"
            :to="localePath({name: 'merchantPage'})"
          >START NOW</vs-button>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="revenueGenerated.analyticsData && salesSummary"
          icon="DollarSignIcon"
          :statistic="'RM '+ salesSummary.yesterday_sales | k_formatter"
          statisticTitle="Yesterday Sales"
          :chartData="revenueGenerated.series"
          color="success"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="quarterlySales.analyticsData && salesSummary"
          icon="DollarSignIcon"
          :statistic="'RM '+ salesSummary.total_sales"
          statisticTitle="Total Revenue"
          :chartData="quarterlySales.series"
          color="danger"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="ordersRecevied.analyticsData && salesSummary"
          icon="ShoppingBagIcon"
          :statistic="salesSummary.total_order | k_formatter"
          statisticTitle="Orders Received"
          :chartData="ordersRecevied.series"
          color="warning"
          type="area"
        />
      </div>
    </div>

    <div class="vx-row">
      <!-- LINE CHART -->
      <div class="vx-col w-full md:w-2/3 mb-base">
        <vx-card title="Revenue">
          <template slot="actions">
            <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
          </template>
          <div slot="no-body" class="p-6 pb-0">
            <div class="flex" v-if="salesChart && salesChart.analyticsData">
              <div class="mr-6">
                <p class="mb-1 font-semibold">This Month</p>
                <p class="text-3xl text-success">
                  <sup class="text-base mr-1">$</sup>
                  {{ salesChart.analyticsData.thisMonth.toLocaleString() }}
                </p>
              </div>
              <div>
                <p class="mb-1 font-semibold">Last Month</p>
                <p class="text-3xl">
                  <sup class="text-base mr-1">$</sup>
                  {{ salesChart.analyticsData.lastMonth.toLocaleString() }}
                </p>
              </div>
            </div>
            <vue-apex-charts
              v-if="salesChart && salesChart.series"
              type="line"
              height="266"
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="salesChart.series"
            />
          </div>
        </vx-card>
      </div>

      <!-- RADIAL CHART -->
      <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card title="Goal Overview">
          <template slot="actions">
            <feather-icon icon="HelpCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
          </template>

          <!-- CHART -->
          <template slot="no-body">
            <div class="mt-10">
              <vue-apex-charts
                type="radialBar"
                height="240"
                :options="analyticsData.goalOverviewRadialBar.chartOptions"
                :series="goalOverview.series"
              />
            </div>
          </template>

          <!-- DATA -->
          <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
            <div
              class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0"
            >
              <p class="mt-4">Completed</p>
              <p class="mb-4 text-3xl font-semibold">786,617</p>
            </div>
            <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
              <p class="mt-4">In Progress</p>
              <p class="mb-4 text-3xl font-semibold">13,561</p>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueApexCharts from "vue-apexcharts";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";
import analyticsData from "@/components/ui-elements/card/analyticsData.js";
import ChangeTimeDurationDropdown from "@/components/ChangeTimeDurationDropdown.vue";

export default {
  layout: "main",
  components: {
    VueApexCharts,
    StatisticsCardLine,
    VuePerfectScrollbar,
    ChangeTimeDurationDropdown,
  },
  data() {
    return {
      moduleName: "dashboard",
      subscribersGained: {},
      revenueGenerated: {},
      quarterlySales: {},
      ordersRecevied: {},

      revenueComparisonLine: {},
      goalOverview: {},

      browserStatistics: [],
      clientRetentionBar: {},

      sessionsData: {},
      chatLog: [],
      chatMsgInput: "",
      customersData: {},

      analyticsData,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
    };
  },
  computed: {
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    salesSummary() {
      return this.$store.state[this.moduleName].salesSummary;
    },
    salesChart() {
      return this.$store.state[this.moduleName].salesChart;
    },
  },
  mounted() {
    // const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
    // scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
  },
  created() {
    this.fetchSalesSummary();
    this.fetchSalesChart();
    // Subscribers gained - Statistics
    this.subscribersGained = JSON.parse(
      '{"series":[{"name":"Subscribers","data":[28,40,36,52,38,60,55]}],"analyticsData":{"subscribers":92600}}'
    );
    this.revenueGenerated = JSON.parse(
      '{"series":[{"name":"Revenue","data":[350,275,400,300,350,300,450]}],"analyticsData":{"revenue":97500}}'
    );
    this.quarterlySales = JSON.parse(
      '{"series":[{"name":"Sales","data":[10,15,7,12,3,16]}],"analyticsData":{"sales":"36%"}}'
    );
    this.ordersRecevied = JSON.parse(
      '{"series":[{"name":"Orders","data":[10,15,8,15,7,12,8]}],"analyticsData":{"orders":97500}}'
    );

    this.revenueComparisonLine = JSON.parse(
      '{"analyticsData":{"thisMonth":86589,"lastMonth":73683},"series":[{"name":"This Month","data":[45000,47000,44800,47500,45500,48000,46500,48600]},{"name":"Last Month","data":[46000,48000,45500,46600,44500,46500,45000,47000]}]}'
    );

    this.goalOverview = JSON.parse(
      '{"analyticsData":{"completed":786617,"inProgress":13561},"series":[83]}'
    );
  },
  methods: {
    async fetchSalesSummary() {
      try {
        await this.$store.dispatch(this.moduleName + "/fetchSalesSummary");
      } catch (err) {
        console.log(err);
      }
    },

    async fetchSalesChart() {
      try {
        await this.$store.dispatch(this.moduleName + "/fetchSalesChart");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.chat-card-log {
  height: 400px;

  .chat-sent-msg {
    background-color: #f2f4f7 !important;
  }
}
</style>
