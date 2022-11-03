<template>
  <v-app dark style="background: #fcfdfd">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      mobile-breakpoint="450"
      :fixed="false"
      :color="'#0c595f'"
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
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="infoCustom" block @click="closeSession()">
            Cerrar Sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      :color="'#0c595f'"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div class="d-flex flex-column align-items-center">
        <span class="secondaryCustom--text font-weight-black text-center">POLICIA NACIONAL DEL PERU</span>
        <span class="secondaryCustom--text font-weight-black text-center">SISTEMA DE REQUISITORIA VEHICULAR CON IA</span>
      </div>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      :color="'#0c898f'"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  middleware: ['auth','verify-roles'],
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      title: 'Reconocimiento de Placas'
    }
  },
  computed: {
    mobile () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return false
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
      }
    },
    items () {
      let items = [
        {
          icon: 'mdi-home',
          title: 'Inicio',
          to: '/',
          role: 'home-page'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Leer Placas',
          to: '/get-image',
          role: 'home-page'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Registros',
          to: '/consulta-rq',
          role: 'get-all-info-placa'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Nivel de Eficacia',
          to: '/indicador/nivel-eficacia',
          role: 'get-lvlefficacy'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Nivel de Productividad',
          to: '/indicador/nivel-productividad',
          role: 'get-lvlproductivity'
        }
      ]

      if(this.$auth.user){
        return items.filter( (element) => this.$auth.user.perfil.role.includes(element.role));
      }
      return []      
    }
  },
  methods:{
    ...mapActions("account",['logout']),
    closeSession(){
      this.logout()
    }
  }
}
</script>
