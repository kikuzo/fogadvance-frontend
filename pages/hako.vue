<template>
  <v-container fluid>
    <v-data-iterator :items="posts" hide-default-footer>
      <template v-slot:header>
        <v-toolbar>
          <v-toolbar-title>箱</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn outlined color="warning" @click="deleteAllItems">全消去</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.id }}
              </v-card-title>
              <v-divider></v-divider>
              <v-form ref="form">
                サイズ
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.depth.value"
                      label="縦(D)"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.width.value"
                      label="横(W)"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.height.value"
                      label="高さ(H)"
                      required
                    ></v-text-field>
                  </v-col> </v-row
                >位置
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.x.value"
                      label="X"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.y.value"
                      label="Y"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="item.z.value"
                      label="Z"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3">
                    <v-btn outlined color="info" small @click="upsert(item.id)"
                      >更新</v-btn
                    >
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                      outlined
                      color="warning"
                      small
                      @click="deleteItem(item.id)"
                      >消去</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        取得生データ：
        {{ props }}
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  // async asyncData(context){
  //    const posts = await
  //    context.$axios.$get('/box')
  //    return { posts: posts,
  //        subtitle: 'hoge'
  //    }
  // }

  data() {
    return {
      posts: [],
    }
  },
  methods: {
    upsert(selectedid) {
      const target = this.posts.find((v) => v.id === selectedid)

      const today = new Date()
      const YYYY = today.getUTCFullYear()
      const MM = ('0' + (today.getUTCMonth() + 1)).slice(-2)
      const DD = ('0' + today.getUTCDate()).slice(-2)
      const hh = ('0' + today.getUTCHours()).slice(-2)
      const mm = ('0' + today.getUTCMinutes()).slice(-2)
      const ss = ('0' + today.getUTCSeconds()).slice(-2)
      const ms = ('0' + today.getUTCMilliseconds()).slice(-2)
      const utcnowstr =
        YYYY +
        '-' +
        MM +
        '-' +
        DD +
        'T' +
        hh +
        ':' +
        mm +
        ':' +
        ss +
        '.' +
        ms +
        'Z'
      // console.log(utcnowstr);
      target.dateModified.value = utcnowstr
      // console.log(target);
      axios.post('/upsertEntity', target)
      // .then(response => console.log(response))
    },
    deleteItem(selectedid) {
      // console.log(selectedid);
      axios.get('/deleteEntity', {
        params: {
          id: selectedid,
        },
      })
    },
    deleteAllItems() {
      const self = this
      this.posts.forEach(function (item) {
        // console.log(item.id);
        self.deleteItem(item.id)
      })
    },
  },
  mounted() {
    axios.defaults.baseURL = 'http://localhost:8080'
    // axios.defaults.baseURL = 'http://fogadvance1.kikuzo.jp:8080'
    axios.get('/box').then((response) => (this.posts = response.data))
    // console.log(this.posts);
  },
}
</script>
