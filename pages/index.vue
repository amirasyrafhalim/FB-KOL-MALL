<template>
  <div>
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="subscribersGained.analyticsData"
          icon="UsersIcon"
          :statistic="subscribersGained.analyticsData.subscribers | k_formatter"
          statisticTitle="Subscribers Gained"
          :chartData="subscribersGained.series"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="revenueGenerated.analyticsData"
          icon="DollarSignIcon"
          :statistic="revenueGenerated.analyticsData.revenue | k_formatter"
          statisticTitle="Revenue Generated"
          :chartData="revenueGenerated.series"
          color="success"
          type="area"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="quarterlySales.analyticsData"
          icon="ShoppingCartIcon"
          :statistic="quarterlySales.analyticsData.sales"
          statisticTitle="Quarterly Sales"
          :chartData="quarterlySales.series"
          color="danger"
          type="area"
        />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base">
        <statistics-card-line
          v-if="ordersRecevied.analyticsData"
          icon="ShoppingBagIcon"
          :statistic="ordersRecevied.analyticsData.orders | k_formatter"
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
            <div class="flex" v-if="revenueComparisonLine.analyticsData">
              <div class="mr-6">
                <p class="mb-1 font-semibold">This Month</p>
                <p class="text-3xl text-success">
                  <sup class="text-base mr-1">$</sup>
                  {{ revenueComparisonLine.analyticsData.thisMonth.toLocaleString() }}
                </p>
              </div>
              <div>
                <p class="mb-1 font-semibold">Last Month</p>
                <p class="text-3xl">
                  <sup class="text-base mr-1">$</sup>
                  {{ revenueComparisonLine.analyticsData.lastMonth.toLocaleString() }}
                </p>
              </div>
            </div>
            <vue-apex-charts
              type="line"
              height="266"
              :options="analyticsData.revenueComparisonLine.chartOptions"
              :series="revenueComparisonLine.series"
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
  },
  mounted() {
    // const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS;
    // scroll_el.scrollTop = this.$refs.chatLog.scrollHeight;
  },
  created() {
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
