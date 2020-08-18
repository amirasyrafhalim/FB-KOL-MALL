<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-navigation-drawer
    v-model="drawer"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list dense flat nav>
      <template v-for="item in items">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="localePath(child.path)"
            color="primary"
            nuxt
            exact
          >
            <v-list-item-icon v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-icon>
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
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
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
        if (this.$store.getters.isAdmin) {
          console.log('a')
        displayMenu = this.$menu.admin;
      } else if (this.$store.getters.isVerifiedMerchant) {
        console.log('b')
        displayMenu = this.$menu.verifiedMerchant;
      } else {
        console.log('c')
        displayMenu = this.$menu.merchant;
      }
      return displayMenu;
    }
  }
};
</script>
