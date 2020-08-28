<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-navigation-drawer
  class="secondary "
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app

  >
  <div class="py-10 text-center">
    <img src="../assets/img/logo.png"  width="auto" />
  </div>
  
    <v-list rounded nav class="pr-0 pt-0" active-class="blue--text">
      <template v-for="item in items" active-class="blue--text">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title class="text-center">{{ item.text }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="localePath(child.path)"
            color="primary"
            nuxt
            exact
          >
            <!-- <v-list-item-icon v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          :to="localePath(item.path)"
          color="primary"
          nuxt
          exact
        >
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get: function() {
        return this.$store.state.drawer;
      },
      set: function(newValue) {
        this.$store.commit("updateDrawer", newValue);
      }
    },
    items() {
      let displayMenu = [];
      //   if (this.$store.getters.isAdmin) {
      //     console.log('a')
        displayMenu = this.$menu.admin;
      // } else if (this.$store.getters.isVerifiedMerchant) {
      //   console.log('b')
      //   displayMenu = this.$menu.verifiedMerchant;
      // } else {
      //   console.log('c')
      //   displayMenu = this.$menu.merchant;
      // }
      return displayMenu;
    }
  }
};
</script>

<style scoped>
.v-list .v-list-item--active {
  background: white!important;
}
.v-list--rounded .v-list-item, .v-list--rounded .v-list-item::before, .v-list--rounded .v-list-item > .v-ripple__container {
    border-radius: 32px 0px 0px 32px !important;
}
.v-list-item__content {
    padding: 12px 32px;
}
.theme--light.v-list-item--active:hover::before, .theme--light.v-list-item--active::before {
    opacity: 0!important;
}
</style>
