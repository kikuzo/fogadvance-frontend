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
      <template>
        <v-row>
          <v-col cols="12" sm="7">
            <svg
              viewbox="0 0 500 600"
              width="600"
              height="500"
              style="background: #555;"
            >
              <rect
                v-for="item in boxes"
                :key="item"
                :x="item.x.value"
                :y="item.y.value"
                :width="item.width.value"
                :height="item.depth.value"
                :transform="'scale(' + myscale + ', ' + myscale + ')'"
                fill="white"
              />
              <rect
                v-for="item in storages"
                :key="item"
                :x="item.sx.value"
                :y="item.sy.value"
                :width="item.width.value"
                :height="item.depth.value"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                fill="none"
                stroke="gray"
                stroke-width="5"
              />
              <rect
                v-for="item in entrances"
                :key="item"
                :x="item.ex.value"
                :y="item.ey.value"
                width="50"
                height="50"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                fill="green"
                stroke="green"
                storoke-width="5"
              />
              <circle
                v-for="item in jetbots"
                :key="item"
                :cx="item.jx.value"
                :cy="item.jy.value"
                r="50"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                fill="red"
                storoke-width="5"
              />
              <line
                v-for="item in resolvedRoutes"
                :key="item"
                :x1="item.jx.value"
                :y1="item.jy.value"
                :x2="item.x.value"
                :y2="item.y.value"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                stroke="white"
                stroke-width="10"
              />
              <line
                v-for="item in resolvedRoutes"
                :key="item"
                :x1="item.x.value"
                :y1="item.y.value"
                :x2="item.ex.value"
                :y2="item.ey.value"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                stroke="white"
                stroke-width="10"
              />
              <line
                v-for="item in resolvedRoutes"
                :key="item"
                :x1="item.ex.value"
                :y1="item.ey.value"
                :x2="item.sx.value"
                :y2="item.sy.value"
                :transform="'scale(' + myscale + ',' + myscale + ')'"
                stroke="white"
                stroke-width="10"
              />
            </svg>
          </v-col>
          <v-col cols="12" sm="5">
            <v-data-table
              dense
              disable-filtering
              disable-pagination
              disable-sort
              hide-default-header
              hide-default-footer
              items-per-page="20"
              :headers="tableHeaders"
              :items="displayData"
            ></v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              生データ
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
      displayData: [],
      boxes: [],
      storages: [],
      entrances: [],
      jetbots: [],
      routes: [],
      resolvedRoutes: [],
      tableHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'X', value: 'x' },
        { text: 'Y', value: 'y' },
      ],
      myscale: '0.10',
    }
  },
  methods: {
    calc: function () {
      axios
        .get('http://fogadvance1.kikuzo.jp:80/healthcheck')
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
        api.get('http://fogadvance1.kikuzo.jp:80/entrance'),
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
        axios.spread((boxes, storages, entrances, jetbots, routes) => {
          for (let i = 0; i < boxes.data.length; i++) {
            this.posts.push(boxes.data[i])
            this.boxes.push(boxes.data[i])
            let tmpvar = {
              id: boxes.data[i].id,
              x: boxes.data[i].x.value,
              y: boxes.data[i].y.value,
              z: boxes.data[i].z.value,
            }
            this.displayData.push(tmpvar)
          }
          for (let i = 0; i < storages.data.length; i++) {
            this.posts.push(storages.data[i])
            this.storages.push(storages.data[i])
            let tmpvar = {
              id: storages.data[i].id,
              x: storages.data[i].sx.value,
              y: storages.data[i].sy.value,
              z: storages.data[i].sz.value,
            }
            this.displayData.push(tmpvar)
            //console.log(tmpvar)
          }
          for (let i = 0; i < entrances.data.length; i++) {
            this.posts.push(entrances.data[i])
            this.entrances.push(entrances.data[i])
            let tmpvar = {
              id: entrances.data[i].id,
              x: entrances.data[i].ex.value,
              y: entrances.data[i].ey.value,
              z: entrances.data[i].ez.value,
            }
            this.displayData.push(tmpvar)
          }
          for (let i = 0; i < jetbots.data.length; i++) {
            this.posts.push(jetbots.data[i])
            this.jetbots.push(jetbots.data[i])
            let tmpvar = {
              id: jetbots.data[i].id,
              x: jetbots.data[i].jx.value,
              y: jetbots.data[i].jy.value,
              z: jetbots.data[i].jz.value,
            }
            this.displayData.push(tmpvar)
          }
          const self = this
          for (let i = 0; i < routes.data.length; i++) {
            this.posts.push(routes.data[i])
            let resolved = Object.assign(
              self.jetbots.find(
                (jb) => jb.id === routes.data[i].JetBotId.value
              ),
              self.boxes.find(
                (bo) =>
                  bo.id === routes.data[i].RecognizedObjectObservedId.value
              ),
              self.entrances.find(
                (et) => et.id === routes.data[i].EntranceId.value
              ),
              self.storages.find(
                (st) => st.id === routes.data[i].StorageSpaceId.value
              )
            )
            this.resolvedRoutes.push(resolved)
          }
          //console.log(this.resolvedRoutes)
          //console.log(this.displayData)
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