<template>
  <v-container fluid>
    <v-data-iterator :items="posts" hide-default-footer>
      <template v-slot:header>
        <v-toolbar>
          <v-toolbar-title>測定・計算結果</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="info" v-on:click="calc">更新</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <!-- {{ props }} -->
        <v-row>
          <v-col cols="12" sm="8">
            <svg viewbox="0 0 500 500" width="500" height="500">
              <rect
                v-for="item in props.items"
                :key="item"
                v-if="item.type === 'RecognizedObjectObserved'"
                :x="item.x.value"
                :y="item.y.value"
                :width="item.width.value"
                :height="item.depth.value"
                :transform="'scale(' + myscale + ', ' + myscale + ')'"
                fill="white"
              />
              <rect
                v-for="item in props.items"
                :key="item"
                v-if="item.type === 'StorageSpace'"
                :x="item.sx.value"
                :y="item.sy.value"
                :width="item.width.value"
                :height="item.depth.value"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                fill="none"
                stroke="gray"
                stroke-width="5"
              />
              <circle
                v-for="item in props.items"
                :key="item"
                v-if="item.type === 'Entrance'"
                :cx="item.ex.value"
                :cy="item.ey.value"
                r="50"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                fill="red"
                storoke-width="5"
              />
            </svg>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card>
              ここには各種パラメータを表示する
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <!--{{ props }}-->
              ログ的に表示
              {{ posts }}
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      posts: [],
      boxes: [],
      storages: [],
      entrances: [],
      jetbot: [],
      route: [],
      myscale: '0.08',
    }
  },
  methods: {
    calc: function () {
      axios
        .get('http://localhost:1030/healthcheck')
        .then((response) => this.posts.push(response))
      //.then(response => console.log(response))
    },
  },
  mounted() {
    const myaxios = axios
    const api = myaxios.create()

    myaxios
      .all([
        api.get('http://fogadvance1.kikuzo.jp:80/box'),
        api.get('http://fogadvance1.kikuzo.jp:80/storage'),
        api.get('http://fogadvance1.kikuzo.jp:80/jetbot'),
        api.get('http://fogadvance1.kikuzo.jp:80/route'),

        //api.get('/api/box'),
        //api.get('/api/storage'),
        //api.get('/api/entrance'),
        //api.get('/api/jetbot'),
        //api.get('/api/route'),
        //api.get('http://localhost:80/box'),
        //api.get('http://localhost:80/storage'),
        //api.get('http://localhost:80/entrance'),
        //api.get('http://localhost:80/jetbot'),
        //api.get('http://localhost:80/route'),
      ])
      .then(
        axios.spread((boxes, storages, entrances, jetbot, route) => {
          for (let i = 0; i < boxes.data.length; i++) {
            this.posts.push(boxes.data[i])
            //Array.prototype.push.apply(self.hoge, boxes.data[i]);
          }
          for (let i = 0; i < storages.data.length; i++) {
            this.posts.push(storages.data[i])
          }
          for (let i = 0; i < entrances.data.length; i++) {
            this.posts.push(entrances.data[i])
          }
          for (let i = 0; i < jetbot.data.length; i++) {
            this.posts.push(jetbot.data[i])
          }
          for (let i = 0; i < route.data.length; i++) {
            this.posts.push(route.data[i])
          }
        })
      )

    /*
        axios.get('http://localhost:1030/box')
        .then(response => this.boxes = response.data);
 
        axios.get('http://localhost:1030/storage')
        .then(response => this.storages = response.data);

        axios.get('http://localhost:1030/entrance')
        .then(response => this.entrances = response.data)

        console.log(this.boxes);

        for(let i=0; i< this.boxes.length; i++){
            this.posts.push(this.boxes.data[i]);
        }
        for(let i=0; i< this.storages.length; i++){
            this.posts.push(this.storages.data[i]);
        }
        for(let i=0; i< this.entrances.length; i++){
            this.posts.push(this.entrances.data[i]);
        }
        console.log(this.posts);
        */
  },
}
</script>