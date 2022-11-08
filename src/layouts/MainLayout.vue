<template>
  <v-app >
    <v-app-bar
        app
        color="primary"
        dark
        clipped-left
    >
      <v-btn v-if="$store.getters['getNavbarName'][0].role==='admin'" icon @click="drawer=!drawer">
        <v-icon>
          mdi-menu
        </v-icon>
      </v-btn>
      <v-app-bar-title>
        {{ date | date('datetime')}}
      </v-app-bar-title>
      <v-spacer/>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              width="30px"
              height="30px"
              class="ma-2"
              outlined
              color="shades"
              v-bind="attrs"
              v-on="on"
          >
            {{$store.getters['getNavbarName'][0].name?$store.getters['getNavbarName'][0].name:''}}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in itemsDrop"
              :key="index"
          >
            <v-list-item @click.prevent="logout">{{ item.title }}</v-list-item>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
        v-if="$store.getters['getNavbarName'][0].role==='admin'"
        clipped
        v-model="drawer"
        app
        dark
        class="z-30"
    >
      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.path"
            @click="drawer=false"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view :drawers="drawer" />
    </v-main>
  </v-app>
</template>

<script>
import {itemsDrop,items} from './MainLayouData'
export default {
// eslint-disable-next-line
  name: "MainLayout",
  methods:{
    logout(){

      this.$router.push('/login?message=logout')
    }
  },
  data: () => ({
    drawer:false,
    itemsDrop,
    items,
    date:null,
    interval:null,
    navarName:''
  }),
  created() {
    this.navarName=this.$store.getters['getNavbarName']
  },
  mounted() {

   this.interval= setInterval(()=>{
      this.date = new Date()
    },1000)
},
  beforeDestroy() {
  clearTimeout(this.interval)
  }
}
</script>

<style scoped>

</style>