<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="px-5 py-5 d-flex flex-column" style="gap: 10px">
        <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                v-model="date"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                color="primary"
                v-model="date"
                type="month"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
            ></v-date-picker>
        </v-menu>
        <GraphicProductivityLevel :date="date"></GraphicProductivityLevel>
    </v-col>
  </v-row>
</template>

<script>
let f = new Date()
let dateInit = f.getFullYear() + '-' + getMonth(f.getMonth())

function getMonth(m){
    if(m == 11){
        m = '01'
    } else {
        m += 1
        if(m < 10){
            m = '0'+m
        }
    }
    return m
}

import GraphicProductivityLevel from "@/components/indicadores/GraphicProductivityLevel.vue"
export default {
    name: 'ProductivityLevel',
    layout: 'auth',
    components: {
        GraphicProductivityLevel
    },
    data: () => ({
        date: dateInit,
        activePicker: null,
        menu: false
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },
    methods: {
        save (date) {
            this.$refs.menu.save(date)
        }
    }
}
</script>
