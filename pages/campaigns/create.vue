<template>
  <div class="layout column ">
    <h2 class="flex text-xs-center black--text mt-5 mb-5">
      {{ $t("menuTitle.campaign") }}
    </h2>
    <v-spacer></v-spacer>

    
    <form-basic />
    <!-- //---import form--- -->

    <!-- <v-row>
      <h2 class="flex text-xs-center black--text mt-5 mb-5 pl-3">
        {{ $t("label.packageTitle") }}
      </h2>
      <crud-form-action
        backPath="campaigns"
        :loading="loading"
        @submit="addPackage"
        class="text-right mb-5 mt-5"
    /></v-row> -->

    <!-- <form-package /> -->
    <!-- //---import form--- -->
  </div>
</template>

<script>
import FormBasic from "@/components/pages/campaigns/FormBasic";
export default {
  components: {
    FormBasic
  }
};
</script>
