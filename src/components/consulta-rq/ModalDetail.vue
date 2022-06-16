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
                <GMap v-if="!!data.detail.location"
                    ref="gMap"
                    language="en"
                    :center="{lat: data.detail.location.latitude, lng: data.detail.location.longitude}"
                    :options="{fullscreenControl: false}"
                    :zoom="6"
                    >
                    <GMapMarker
                        :position="{lat: data.detail.location.latitude, lng: data.detail.location.longitude}"
                        :options="{icon: data.detail.location === currentLocation ? pins.selected : pins.notSelected}"
                        @click="currentLocation = data.detail.location"
                    >
                        <GMapInfoWindow :options="{maxWidth: 200}">
                        <code>
                            lat: {{ data.detail.location.latitude }},
                            lng: {{ data.detail.location.longitude }}
                        </code>
                        </GMapInfoWindow>
                    </GMapMarker>
                </GMap>
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
            coordinates: [ -111.549668, 39.014 ],
            currentLocation: '',
            pins: {
                selected: '',
                notSelected: ''
            }
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