<template>
  <v-container fluid>
    <v-data-iterator :items="posts" hide-default-footer>
      <template v-slot:header>
        <v-toolbar>
          <v-toolbar-title>計算経路</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn outlined color="warning" disabled v-on:click="deleteAllItems"
            >全消去</v-btn
          >
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
              <v-card-title class="subheading font-weight-bold">{{
                item.id
              }}</v-card-title>
              <v-divider></v-divider>
              <v-form ref="form">
                初期温度
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.min.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                最終温度
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.max.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                パラメータ１
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.parameter1.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                パラメータ２
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.parameter2.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                パラメータ３
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.parameter3.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                パラメータ４
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="item.parameter4.value"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-spacer></v-spacer>
                  </v-col>
                  <v-col cols="3">
                    <v-btn
                      outlined
                      color="info"
                      small
                      v-on:click="upsert(item.id)"
                    >
                      更新
                    </v-btn>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                      outlined
                      color="warning"
                      small
                      disabled
                      v-on:click="deleteItem(item.id)"
                    >
                      消去
                    </v-btn>
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
  //async asyncData(context){
  //    const posts = await
  //    context.$axios.$get('/box')
  //    return { posts: posts,
  //        subtitle: 'hoge'
  //    }
  //}

  data() {
    return {
      posts: [],
    }
  },
  methods: {
    upsert: function (selectedid) {
      var target = this.posts.find((v) => v.id === selectedid)

      var today = new Date()
      var YYYY = today.getUTCFullYear()
      var MM = ('0' + (today.getUTCMonth() + 1)).slice(-2)
      var DD = ('0' + today.getUTCDate()).slice(-2)
      var hh = ('0' + today.getUTCHours()).slice(-2)
      var mm = ('0' + today.getUTCMinutes()).slice(-2)
      var ss = ('0' + today.getUTCSeconds()).slice(-2)
      var ms = ('0' + today.getUTCMilliseconds()).slice(-2)
      var utcnowstr =
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
      //console.log(utcnowstr);
      target.dateModified.value = utcnowstr
      //console.log(target);
      axios.post('/upsertEntity', target)
      //.then(response => console.log(response))
    },
    deleteItem: function (selectedid) {
      //console.log(selectedid);
      axios.get('/deleteEntity', {
        params: {
          id: selectedid,
        },
      })
    },
    deleteAllItems: function () {
      var self = this
      this.posts.forEach(function (item) {
        //console.log(item.id);
        self.deleteItem(item.id)
      })
    },
  },
  mounted() {
    // axios.defaults.baseURL = 'http://localhost:80'
    axios.defaults.baseURL = 'http://fogadvance1.kikuzo.jp:80'
    axios
      .get('/annealingControl')
      .then((response) => (this.posts = response.data))
    // axios.get('/api/route').then((response) => (this.posts = response.data))
    //console.log(this.posts);
  },
}
</script>