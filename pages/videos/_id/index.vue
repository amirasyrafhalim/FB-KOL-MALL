<template>
  <div>
    <h1>Video Console</h1>
    {{ record }}
  </div>
</template>

<script>
import getOneMixin from "@/mixins/getOne";

export default {
  name: "index",
  mixins: [getOneMixin],
  asyncData() {
    return {
      moduleName: "videos"
    };
  },
};
</script>