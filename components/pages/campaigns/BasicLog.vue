<template>
  <div>
    <v-list
      v-for="(data, index) in log.value.slice().reverse()"
      :key="index"
      :color="data.log.type || data.type"
      class="list__comment border-line mx-auto mb-2 p-0"
      dense
      max-width="95%"
    >
      <template>
        <v-list-item>
          <v-list-item-avatar v-if="data.buyer">
            <v-img :src="(data && data.buyer && data.buyer.avatar) "></v-img>
          </v-list-item-avatar>

          <v-list-item-avatar v-else-if="data.log.buyer">
            <v-img size="38" class="py-5" :src="data.log.buyer.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content v-if="data.buyer">
            <v-list-item-subtitle>{{ data.buyer.name }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content v-else-if="data.log.buyer">
            <v-list-item-subtitle>{{ data.log.buyer.name }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-content>
            <v-list-item-subtitle v-bind:style="{ color: data.color || data.log.color}" class="font-weight-bold" v-html="data.log.log || data.log"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle class="text-right">{{data.log.created_at || data.created_at}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "BasicLog",
  props: ["log"]
};
</script>

<style scoped>
</style>
