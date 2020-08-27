<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="6" class="light-border text-center">
            <span v-html="liveVideoUpdate.data.video.embed_html"></span>
          <!-- <video width="500" controls>
            <source src="mov_bbb.mp4" type="video/mp4" />
            <source src="mov_bbb.ogg" type="video/ogg" />
            Your browser does not support HTML video.
          </video> -->
        </v-col>
        <v-col cols="6" class="light-border">
          <v-card class="mx-auto" outlined>
               <template>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="(data && data.buyer && data.buyer.avatar) "></v-img>
          </v-list-item-avatar>

         

          <v-list-item-content>
            <v-list-item-subtitle>{{ data.buyer.name }}</v-list-item-subtitle>
          </v-list-item-content>

        

          <v-list-item-content>
            <v-list-item-subtitle v-bind:style="{ color: data.color}" class="font-weight-bold" v-html=" data.log"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle class="text-right">{{data.created_at}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
            <!-- <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">OVERLINE</div>
                <v-list-item-title class="headline mb-1"
                  >Headline 5</v-list-item-title
                >
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn text>Button</v-btn>
              <v-btn text>Button</v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="light-border">
          <v-simple-table height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Order</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "index",
  asyncData({ app, store }) {
    return {
      moduleName: "controlPanel",
      data: 
          {
              buyer: {
                  name: 'Naja',
                  avatar: "/default_avatar.png"
              },
              log: 'test',
              color:'red'
          }
      ,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159
        },
        {
          name: "Ice cream sandwich",
          calories: 237
        },
        {
          name: "Eclair",
          calories: 262
        },
        {
          name: "Cupcake",
          calories: 305
        },
        {
          name: "Gingerbread",
          calories: 356
        },
        {
          name: "Jelly bean",
          calories: 375
        }
      ]
    };
   
  },
   computed:{
     liveVideoUpdate() {
      return this.$store.state.campaigns.liveVideoUpdate;
    }   
    }
};
</script>

<style scoped>
div >>> iframe {
  width: auto !important;
  height: auto !important;
}
</style>
