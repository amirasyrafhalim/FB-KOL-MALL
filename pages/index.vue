<template>
  <div>
    <v-row class="no-gutters mb-4">
      <v-col cols="auto">
        <h4 class="mb-4 button">Total Pages</h4>
        <v-card
          class=" d-inline-block dashboard-card ma-2"
          outlined
          v-for="(page, i) in pages"
          :key="i"
        >
          <v-list-item>
            <v-list-item-avatar tile size="80" class="mb-0 border-radius-image">
              <img src="@/assets/img/dp@2x.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle class="">{{
                page.text
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="min-height: 25px;!important">
            <v-list-item-content>
              <v-list-item-subtitle >{{ page.like }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class=" mb-1 text-blue"
                style="font-weight:700; font-size: 40px; font-family: Montserrat;"
                >{{ page.total }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="no-gutters">
      <v-col cols="auto">
        <h4 class="mb-4">Total Income Since Joining</h4>
        <v-card
          class=" d-inline-block dashboard-card mx-2 mb-4"
          outlined
          v-for="(income, i) in incomes"
          :key="i"
        >
          <v-list-item>
            <v-list-item-avatar tile size="auto" class="mb-0 border-radius-image">
              <img src="@/assets/img/total-income@2x.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle class="">{{
                income.joinDate
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class=" mb-1 text-magenta"
                style="font-weight:700; font-size: 40px; font-family: Montserrat;"
                >{{ income.total }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <h4 class="mb-4">Total Sales This Month</h4>
        <v-card
          class="d-inline-block dashboard-card mx-2"
          outlined
          v-for="(sale, i) in sales"
          :key="i"
        >
          <v-list-item >
            <v-list-item-avatar size="auto" tile class="mb-0 ">
              <img src="@/assets/img/total-sale@2x.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle class="">{{
                sale.month
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="  align-self-end">
            <v-list-item-content  class="align-self-end">
              <v-list-item-title
                class=" mb-1 text-magenta align-self-end"
                style="font-weight:700; font-size: 40px; font-family: Montserrat;"
                >{{ sale.total }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="no-gutters">
      <v-col cols="auto">
        <h4 class="mb-4">Most Popular Product</h4>
        <v-card
          class=" d-inline-block dashboard-card mx-2"
          outlined
          v-for="(product, i) in mostPopular"
          :key="i"
        >
          <v-list-item>
            <v-list-item-avatar tile size="auto" class="mb-0 border-radius-image">
              <img src="@/assets/img/most-popular@2x.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle class="">{{
                product.name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="min-height: 25px;!important">
            <v-list-item-content>
              <v-list-item-subtitle >{{ 'Total Revenue' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="mb-1 text-light-blue"
                style="font-weight:700; font-size: 40px; font-family: Montserrat;"
                >{{ product.total }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="auto">
        <h4 class="mb-4">Top Sales Product</h4>
        <v-card
          class="d-inline-block dashboard-card mx-2"
          outlined
          v-for="(product, i) in topSales"
          :key="i"
        >
          <v-list-item >
            <v-list-item-avatar size="auto" tile class="mb-0 ">
              <img src="@/assets/img/most-popular@2x.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle class="">{{
                product.name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item style="min-height: 25px;!important">
            <v-list-item-content>
              <v-list-item-subtitle >{{ 'Total Revenue' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class=" mb-1 text-light-blue"
                style="font-weight:700; font-size: 40px; font-family: Montserrat;"
                >{{ product.total }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
 
  asyncData() {
    return {
      user: [],
      pages: [
        {
          image: "@/assets/img/dp@2x.png",
          text: "Goodness Clothes Positively Stylish",
          like: "FB Page Likes",
          total: "400,000"
        },
        {
          image: "@/assets/img/dp@2x.png",
          text: "Cooking East 2 West",
          like: "FB Page Likes",
          total: "250,000"
        },
        {
          image: "@/assets/img/dp@2x.png",
          text: "Fresh Seafood Restaurant",
          like: "FB Page Likes",
          total: "150,000"
        },
        {
          image: "@/assets/img/dp@2x.png",
          text: "DIY Craft Supplies Shop",
          like: "FB Page Likes",
          total: "140,000"
        }
      ],
      incomes: [
        {
          joinDate: "Joined 2009",
          total: "RM50,000"
        }
      ],
      sales: [
        {
          month: "August 2020",
          total: "RM20,000"
        }
      ],
       topSales: [
        {
          name: "Blue Red Stripe Baby Dress",
          total: "RM4,000"
        }
      ],
      mostPopular: [
        {
          name: "Green Handle Spade",
          total: "RM6,000"
        }
      ]
    };
  },
  created() {
    // this.user = this.$store.state.auth.user;
    console.log('user', this.user);
  }
};
</script>
<style scoped>
.v-card__text,
.v-card__title {
  word-break: normal !important; /* maybe !important  */
}
.dashboard-card {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 0px 10px #00000019;
  border-radius: 10px !important;
  padding: 10px;
  width: 280px;
  height: 190px;
}
.v-list-item__content {
  padding: 0 !important;
}
.border-radius-image {
  border-radius: 13px !important;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
