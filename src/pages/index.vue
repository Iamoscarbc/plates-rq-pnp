<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="px-5 py-5 d-flex flex-column" style="gap: 10px">
      <h1 class="black--text">Bienvenido, {{ nameUser }}</h1>
      <v-row>
        <v-col>
          <GraphicEfficacy :date="date" v-if="verifyRole('get-lvlefficacy')"></GraphicEfficacy>
        </v-col>
        <v-col>
          <GraphicRequisitory :date="date" v-if="verifyRole('get-lvlproductivity')"></GraphicRequisitory>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import GraphicEfficacy from "@/components/indicadores/GraphicEfficacy.vue"
import GraphicRequisitory from "@/components/indicadores/GraphicRequisitory.vue"
export default {
  name: 'IndexPage',
  layout: 'auth',
  components: {
    GraphicEfficacy,
    GraphicRequisitory
  },
  data: () => ({
    graphicNE: {
      series: [
        {
          name: 'NTAE',
          data: [
            {
              x: '2011',
              y: 1292,
              goals: [
                {
                  name: 'NAET',
                  value: 1400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2012',
              y: 4432,
              goals: [
                {
                  name: 'NAET',
                  value: 5400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2013',
              y: 5423,
              goals: [
                {
                  name: 'NAET',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2014',
              y: 6653,
              goals: [
                {
                  name: 'NAET',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2015',
              y: 8133,
              goals: [
                {
                  name: 'NAET',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2016',
              y: 7132,
              goals: [
                {
                  name: 'NAET',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2017',
              y: 7332,
              goals: [
                {
                  name: 'NAET',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2018',
              y: 6553,
              goals: [
                {
                  name: 'NAET',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            }
          ]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          background: '#e9e9e9',
          toolbar: false
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Nivel de Eficacia",
          align: 'center',
          margin: 30,
          style: {
            fontSize: '22px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: 'black'
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['NTAE', 'NAET'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          },
          itemMargin: {
            vertical: 20
          },
        }
      }
    },
    graphicNP: {
      series: [
        {
          name: 'NTAE',
          data: [
            {
              x: '2011',
              y: 1292,
              goals: [
                {
                  name: 'NTAP',
                  value: 1400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2012',
              y: 4432,
              goals: [
                {
                  name: 'NTAP',
                  value: 5400,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2013',
              y: 5423,
              goals: [
                {
                  name: 'NTAP',
                  value: 5200,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2014',
              y: 6653,
              goals: [
                {
                  name: 'NTAP',
                  value: 6500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2015',
              y: 8133,
              goals: [
                {
                  name: 'NTAP',
                  value: 6600,
                  strokeHeight: 13,
                  strokeWidth: 0,
                  strokeLineCap: 'round',
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2016',
              y: 7132,
              goals: [
                {
                  name: 'NTAP',
                  value: 7500,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2017',
              y: 7332,
              goals: [
                {
                  name: 'NTAP',
                  value: 8700,
                  strokeHeight: 5,
                  strokeColor: '#775DD0'
                }
              ]
            },
            {
              x: '2018',
              y: 6553,
              goals: [
                {
                  name: 'NTAP',
                  value: 7300,
                  strokeHeight: 2,
                  strokeDashArray: 2,
                  strokeColor: '#775DD0'
                }
              ]
            }
          ]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
          background: '#e9e9e9',
          toolbar: false
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        title: {
          text: "Nivel de Productividad",
          align: 'center',
          margin: 30,
          style: {
            fontSize: '22px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: 'black'
          },
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['NTAE', 'NTAP'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          },
          itemMargin: {
            vertical: 20
          },
        }
      }
    }
  }),
  computed: {
    date() {
      let f = new Date()
      return f.getFullYear() + '-' + this.getMonth(f.getMonth())
    },
    nameUser(){
      if(this.$auth.user) return this.$auth.user.nombres
      return ''
    }
  },
  methods: {
    getMonth(m) {
      if (m == 12) {
        m = '01'
      } else {
        m += 1
        if (m < 10) {
          m = '0' + m
        }
      }
      return m
    },
    verifyRole(rol){
      if(this.$auth.user){
        return this.$auth.user.perfil.role.includes(rol)
      }
      return false
    }
  }
}
</script>
