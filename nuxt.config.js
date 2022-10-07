import colors from 'vuetify/es5/util/colors'
import es from 'vuetify/lib/locale/es'

export default {
  env: {
    API_URL: process.env.API_URL
  },
  srcDir: 'src/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - plates-rq-pnp',
    title: 'plates-rq-pnp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:"stylesheet", href:"https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios.client.js',
    { src: '@/plugins/vue-apexchart.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    ['nuxt-gmaps', {
      key: 'AIzaSyCUfoh_5I2vsurqaFpU20cEgOPQ7x0OhkE',
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    debug: true
  },
  proxy:{
    '/api/': process.env.API_URL
  },

  
  auth:{
    redirect: {
      login: '/iniciar-sesion',
      logout: '/iniciar-sesion',
      home: '/',
    },
    strategies: {
      local:{
        endpoints:{
          login: { url: '/api/info-plate/auth/login', method: 'post', propertyName: 'result.access_token' },
          logout: false,
          user: { url: '/api/info-plate/auth/user-info', method: 'get', propertyName: 'result'}
        },
        tokenType: 'Bearer'
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  moment: {
    defaultLocale: 'es',
    locales: ['es']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    lang: {
      locales: { es },
      current: 'es',
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['@tensorflow/tfjs']
  },

  server: {
    port: 3001,
    host: '0.0.0.0'
  }
}
