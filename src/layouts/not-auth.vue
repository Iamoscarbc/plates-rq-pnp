<template>
  <v-app dark>
    <v-main>
      <v-container style="height: 100%;">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'NotAuthLayout',
  middleware: 'not-auth',  
  data () {
    return {
      fixed: true
    }
  }
}
</script>
