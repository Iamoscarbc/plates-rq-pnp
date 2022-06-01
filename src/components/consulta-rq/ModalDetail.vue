<template>
    <div class="text-center">
        <v-dialog v-if="!!data" v-model="showComputed" width="500">
            <v-card>
                <v-card-title class="d-flex justify-space-between" :class="data.detail.rq ? 'error' : 'success'">
                    <span class="text-h5">{{ data.plate }}</span>
                    <template>
                        <v-icon v-if="data.status" large color="black">mdi-checkbox-marked-circle</v-icon>
                        <v-progress-circular v-else large :value="calculateProgress(data)" color="black">
                            {{ calculateProgress(data) }}
                        </v-progress-circular>
                    </template>
                </v-card-title>
                    <MglMap 
                    :accessToken="accessToken" 
                    :mapStyle="mapStyle"
                    :center="coordinates">
                        <MglMarker :coordinates="coordinates" color="blue" />
                    </MglMap>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'ModalDetailRow',
    props: {
        data: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            accessToken: "ACCESS_TOKEN",
            mapStyle: "mapbox://styles/mapbox/basic-v10",
            coordinates: [ -111.549668, 39.014 ]
        };
    },
    computed: {
        showComputed: {
            get() {
                return this.show
            },
            set(value) {
                this.$emit("changeShowModal", value)
            }
        }
    },
    methods: {
        calculateProgress(item) {
            let dif = this.$moment(item.bumpers).diff(this.$moment(item.createdAt), 'seconds')
            let dif2 = this.$moment(new Date()).diff(this.$moment(item.createdAt), 'seconds')
            if (dif == dif2 || (dif - dif2) < 0) {
                return 99
            }
            return Number(dif2 / dif * 100).toFixed(0)
        },
    }
}
</script>