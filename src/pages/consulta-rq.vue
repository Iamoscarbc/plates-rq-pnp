<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="px-5 py-5 align-self-start">
        <v-file-input v-if="!blockInput"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Capturar Placa"
          prepend-icon="mdi-camera"
          label="Capturar y Registrar Placa"
          @change="changeImage($event)"
          @click:clear="changeImage()"
        ></v-file-input>
        <span v-else>Activar los permisos de ubicación y recargar la página para proceder a registrar.</span>
        <TableRegisters :reloadTable="reloadTable" @changeReloadTable="changeReloadTable($event)"></TableRegisters>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import TableRegisters from '@/components/consulta-rq/Table.vue'
export default {
  name: 'ConsultaRQ',
  layout: 'auth',
  meta: {
    auth: { role: [
      'get-all-info-placa',
      'filter-info-placa'
    ] }
  },
  components: {
    TableRegisters
  },
  data: () => ({
    rules: [
      value => !value || value.size < 10000000 || 'Avatar size should be less than 10 MB!',
    ],
    img: '',
    reloadTable: true,
    location: {
      latitude: '',
      longitude: ''
    },
    blockInput: true
  }),
  methods: {
    ...mapActions("plates",['getIsPlatesRQ','getRegisters']),
    changeImage(val){
      if(val){
        const reader = new FileReader();
          reader.onloadend = () => {
            this.verifyPlate(reader.result)
          };
          reader.readAsDataURL(val);
      }
    },
    async verifyPlate(base64Image){
      try {
        let body = new FormData()
        this.img = base64Image
        body.append('upload', base64Image)
        body.append("regions", "us-ca")
        let res = await this.getIsPlatesRQ({body, location: this.location})
        if(!!res.success) {
          console.log("res.result.message", res.result.message)
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.reloadTable = true
      }
    },
    obtainLocation(){
      const success = (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.location = {
              latitude,
              longitude
            }
            this.blockInput = false
        };

        const error = (err) => {
          if(err.code == 1){
            this.blockInput = true
          }
        };

        // This will open permission popup
        navigator.geolocation.getCurrentPosition(success, error);
    },
    changeReloadTable(val){
      this.reloadTable = val
      this.img = ""
    }
  },
  mounted(){
    this.obtainLocation()
  }
}
</script>
