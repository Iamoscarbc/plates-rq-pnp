<template>
    <v-row justify="center" align="center">
        <v-col cols="12" class="px-5 py-5 d-flex flex-column" style="gap: 10px">
            <VueApexCharts type="bar" height="550" :options="graphicNP.chartOptions" :series="series" v-if="!loading">
            </VueApexCharts>
            <v-progress-circular v-else indeterminate>
            </v-progress-circular>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions } from "vuex"
export default {
    name: 'GraphicRequisitoryComponent',
    props: {
        date: {
            type: String
        }
    },
    data: () => ({
        graphicNP: {
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'bar',
                    background: '#e9e9e9',
                    toolbar: false,
                    zoom: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '60%',
                        distributed: true
                    }
                },
                colors: ['#00E396'],
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: "Requisitoriados",
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
                    customLegendItems: [ 'NTAE','NTAP'],
                    markers: {
                        fillColors: ['#00E396', '#775DD0']
                    },
                    itemMargin: {
                        vertical: 20
                    },
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark',
                    custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        return (
                            `
                            <div class="arrow_box">
                                <div class="d-flex flex-column">
                                    <div class="d-flex flex-column pt-2 pb-1 px-2" style="background: black">
                                        <span style="font-size: 12px">${w.globals.labels[dataPointIndex]}</span>
                                    </div>
                                    <div class="d-flex flex-column py-2 px-2">
                                        <div class="d-flex flex-row align-items-center" style="gap: 8px;">
                                            <span class="circle-point" style="background: ${w.config.colors[dataPointIndex]};"></span>
                                            <span style="font-size: 12px">NTAE: &nbsp;&nbsp;${series[seriesIndex][dataPointIndex]}</span>
                                        </div>
                                        <div class="d-flex flex-row align-items-center" style="gap: 8px;">
                                            <span class="circle-point" style="background: ${w.config.legend.markers.fillColors[1]};"></span>
                                            <span style="font-size: 12px">NTAP: &nbsp;&nbsp;${w.config.series[0].data[dataPointIndex].goals[0].value}</span>
                                        </div>
                                        <div class="d-flex flex-row align-items-center" style="gap: 8px;">
                                            <span class="circle-point" style="background: orange;"></span>
                                            <span style="font-size: 12px">NP: &nbsp;&nbsp;${ (w.config.series[0].data[dataPointIndex].NP).toFixed(2) }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                        );
                    }
                }
            }
        },
        data: [],
        loading: true
    }),
    watch: {
      date(val){
        this.getGraphicProductivityLevelService()
      }
    },
    computed: {
        series() {
            this.data.map((x) => {
                x.x = x.date,
                x.y = x.NTAE
                x.NP = x.NP
                x.goals = [{
                    name: 'NTAP',
                    value: x.NTAP,
                    strokeHeight: 5,
                    strokeColor: '#775DD0'
                }]
            })
            return [{
                name: 'NTAE',
                data: this.data
            }]
        }
    },
    methods: {
        ...mapActions("plates",['getGraphicProductivityLevel']),
        async getGraphicProductivityLevelService(){
            try {
                this.loading = true
                let res = await this.getGraphicProductivityLevel(this.date.replace('-',''))
                if( !!res.success ){
                    this.data = res.result
                }
            } catch (error) {
                console.log("error",error)
            } finally {
                this.loading = false
            }
        },
    },
    created(){
        this.getGraphicProductivityLevelService()
    }
}
</script>

<style lang="scss" >
.circle-point{
    width: 8px;
    height:8px;
    border-radius: 20px;
    display: flex;
    align-self: center;
}
</style>