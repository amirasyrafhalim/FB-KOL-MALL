<template>
  <div id="pages__test">
    <v-card>
      <v-card-title>
        Facebook Live Comment Test
      </v-card-title>
      <v-card-text>
        <v-text-field label="Facebook Live ID" v-model="facebook_live_id" />
        <v-text-field label="Access Token" v-model="access_token" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="captureComment">Start Capturing</v-btn>
      </v-card-actions>
    </v-card>

    <v-spacer class="my-5" />

    <v-card>
      <v-card-title>
        Live Comment Captured
      </v-card-title>
      <v-list class="list__comment" two-line>
        <template v-for="(comment, index) in comments">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img :src="comment.from.picture.data.url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ comment.from.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ comment.message }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ comment.created_time }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      comments: [],
      facebook_live_id: "",
      access_token:
        "EAADhMbgudTABALmPZCxGXOz5gZCEMazzR7WaC7MSsQ7cemYrVJ29NJXZAqkDWLWcjUme8ZCyVgdxBYAwd3vOPqdCcox3nbJ9tDqtE9N0ZC8Tl4Q7dhYFZCcoonoKJDZC3B4G3sdXIafgWS4roQMMxXM37dPPDzAGjgIQ5keRpr9KAZDZD"
    };
  },
  methods: {
    captureComment() {
      const vm = this;
      const url = `https://streaming-graph.facebook.com/${this.facebook_live_id}/live_comments?access_token=${this.access_token}&comment_rate=one_per_two_seconds&fields=from{id,name,picture},message,created_time`;
      const source = new EventSource(url);

      source.onmessage = function(event) {
        const data = JSON.parse(event.data);
        vm.comments.unshift(data);
      };

      source.onerror = function(err) {
        console.log(err);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.list__comment {
  max-height: 480px;
  overflow: auto;
}
</style>