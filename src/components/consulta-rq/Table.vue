<template>
  <v-card>
    <v-card-title>
      Registros
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar por Placa"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="results"
      :items-per-page="10"
      class="elevation-1"
      :loading="loader"
      loading-text="Recopilando información"
      :search="search"
    >
      <template v-slot:item.plate="{ item }" >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip
              :color="item.detail.rq ? 'error' : 'success'"
              v-bind="attrs"
              v-on="on"
            >
              {{item.plate}}
            </v-chip>
          </template>
          <span>{{ item.detail.rq ? 'Requisitoriado' : 'No Requisitoriado' }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.createdAt="{ item }" >
          {{ $moment(item.createdAt).format("DD-MM-YYYY [|] HH:mm") }}
      </template>
      <template v-slot:item.bumpers="{ item }" >
          {{ $moment(item.bumpers).format("DD-MM-YYYY [|] HH:mm") }}
      </template>
      <template v-slot:item.finishedAt="{ item }" >
          {{ item.finishedAt ? $moment(item.finishedAt).format("DD-MM-YYYY [|] HH:mm") : '-' }}
      </template>
      <template v-slot:item.status="{ item }" >
        <v-icon v-if="item.status"
          color="teal">mdi-checkbox-marked-circle</v-icon>
        <v-progress-circular v-else
          :value="calculateProgress(item)"
          color="teal"
        >
          {{calculateProgress(item)}}
        </v-progress-circular>
      </template>
      <template v-slot:item.actions="{ item }" >
        <v-btn v-if="item.status == 0"
          small
          color="success">
            Finalizar
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TableRegisters',
  props: {
    reloadTable: {
        type: Boolean
    }
  },
  data: () => ({
    loader: true,
    search: '',
    results: [],
    headers: [
      { text: 'Placa', value: 'plate', width: '86' },
      { text: 'Fecha Registro', value: 'createdAt', width: '155' },
      { text: 'Fecha Tope', value: 'bumpers', width: '155' },
      { text: 'Fecha Término', value: 'finishedAt', width: '155' },
      { text: 'Estado', value: 'status', width: '120' },
      { text: 'Acciones', value: 'actions', width: '120' },
    ]
  }),
  watch: {
    reloadTable(val){
        if(!!val){
            this.getRegistersService()
        }
    }
  },
  methods: {
    ...mapActions("plates",['getIsPlatesRQ','getRegisters']),
    async getRegistersService(){
      try {
        this.loader = true
        this.results = []
        let res = await this.getRegisters()
        if(!!res.success){
          this.results = res.result
        }
      } catch (error) {
        console.log("error",error)
      } finally {
        this.loader = false
        this.$emit('changeReloadTable', false)
      }
    },
    calculateProgress(item){
      let dif = this.$moment(item.createdAt).diff(this.$moment(item.bumpers), 'seconds')
      let dif2 = this.$moment(item.createdAt).diff(this.$moment(new Date()), 'seconds')
      if(dif == dif2){
        return 99
      }
      return Number(dif2/dif*100).toFixed(0)
    }
  },
  created(){
    this.getRegistersService()
  }
}
</script>
