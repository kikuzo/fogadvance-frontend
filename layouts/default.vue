<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Box',
          to: '/hako',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Entrance',
          to: '/iriguchi',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Storage',
          to: '/souko',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'JetBot',
          to: '/jb',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Route',
          to: '/keiro',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'HyperParameters',
          to: '/annealing',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'FogAdvance',
    }
  },
}
</script>
