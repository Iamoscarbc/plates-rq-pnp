<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="px-5 py-5">
        <v-file-input
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Capturar Placa"
          prepend-icon="mdi-camera"
          label="Capturar Placa"
          @change="changeImage($event)"
          @click:clear="changeImage()"
        ></v-file-input>
        <div v-if="!loader && results.length != 0" class="d-flex flex-row flex-wrap" style="gap: 24px">
          <v-card v-for="(i,index) in results" :key="index" class="d-flex flex-column" style="min-width: 128px"
            :color="i.rq ? 'error' : 'success'"
            dark
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card-text class="text-h5 font-weight-bold white--text text-center" style="cursor: pointer;"
                  v-bind="attrs"
                  v-on="on">
                  {{i.plate}}
                </v-card-text>
              </template>
              <span>{{ i.rq ? 'Se encuentra requisitoriado' : 'No se encuentra requisitoriado' }}</span>
            </v-tooltip>
          </v-card>
        </div>
        <div v-else-if="!loader && results.length == 0">
          <span>{{messageNotFound}}</span>
        </div>
        <v-progress-circular v-else
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ConsultaRQ',
  data: () => ({
    rules: [
      value => !value || value.size < 10000000 || 'Avatar size should be less than 10 MB!',
    ],
    results: [],
    img: '',
    loader: false,
    messageNotFound: ''
  }),
  methods: {
    ...mapActions("plates",['getIsPlatesRQ']),
    changeImage(val){
      if(val){
        this.loader = true
        this.results = []
        const reader = new FileReader();
          reader.onloadend = () => {
            this.verifyPlate(reader.result)
          };
          reader.readAsDataURL(val);
      }else{
        this.results = []
      }
    },
    async verifyPlate(base64Image){
      try {
        let body = new FormData()
        this.img = base64Image
        body.append('upload', base64Image)
        body.append("regions", "us-ca")
        let res = await this.getIsPlatesRQ(body)
        if(res.success) {
          this.results = res.result
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loader = false
        this.messageNotFound = "Sin resultados"
      }
    }
  }
}
</script>
