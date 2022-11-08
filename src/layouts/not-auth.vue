<template>
  <v-app dark>
    <v-app-bar
      fixed
      :color="'#0c595f'"
      app
    >
      <v-spacer />
      <div class="d-flex flex-column align-items-center">
        <span class="secondaryCustom--text font-weight-black text-center">POLICIA NACIONAL DEL PERU</span>
        <span class="secondaryCustom--text font-weight-black text-center">SISTEMA DE REQUISITORIA VEHICULAR CON IA</span>
      </div>
      <v-spacer />
    </v-app-bar>
    <v-main style="background: #d9ebe9">
      <v-container style="height: 100%;">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      :color="'#0c898f'"
      app
    >
      <v-row>
        <v-col class="d-flex flex-column align-items-center text-center">
          <a href="https://aplicaciones.mininter.gob.pe/sige/" target="_blank" style="color: white;">SIGE</a>
        </v-col>
        <v-col class="d-flex flex-column align-items-center text-center">
          <a href="https://correo.policia.gob.pe/" target="_blank" style="color: white;">CORREO</a>
        </v-col>
        <v-col class="d-flex flex-column align-items-center text-center">
          <a href="https://www.policia.gob.pe/" target="_blank" style="color: white;">WEB PNP</a>
        </v-col>
        <v-col class="d-flex flex-column align-items-center text-center">
          <a href="https://mpd.policia.gob.pe/" target="_blank" style="color: white;">MPD</a>
        </v-col>
      </v-row>
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
