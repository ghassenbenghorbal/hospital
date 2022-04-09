<template>
<admin-layout>
    <div style="height:100%">
        <div class="mb-2 d-flex justify-center">
            <div class="d-inline-flex">
                <div style="width:150px;" class="mr-6">
                    <div class="d-inline-flex">
                        <div class="my-auto mr-2">Block:</div>
                        <v-select v-model="block" @input="getChartData" :items="blocks" label="Select Block" dense solo hide-details></v-select>
                    </div>
                </div>
                <div style="width:190px">
                    <div class="d-inline-flex">
                        <div class="my-auto mr-2">Date:</div>
                        <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" left origin="center">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Pick a date" prepend-inner-icon="mdi-calendar" readonly dense solo hide-details v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker  v-model="date" @input="datePickerOnInput" color="primary" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" ></v-date-picker>
                        </v-menu>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile and down -->
        <div class="hidden-md-and-up">
            <v-row align="center" justify="center">
            <v-col v-for="chart in chartsP1" :key="chart.id">
                <v-card class="mx-auto" width="400" height="250">
                    <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col v-for="chart in chartsP2" :key="chart.id">
                <v-card class="mx-auto" width="400" height="250">
                    <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
        </div>
        <!-- Laptop and above -->
        <div style="height:95%" class="hidden-sm-and-down">
            <v-row align="center" justify="center" style="height:50%">
            <v-col v-for="chart in chartsP1" :key="chart.id" style="height:100%">
                <v-card class="mx-auto" width="95%" height="100%">
                    <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center" style="height:50%">
            <v-col v-for="chart in chartsP2" :key="chart.id" style="height:100%">
                <v-card class="mx-auto" width="95%" height="100%">
                    <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                </v-card>
            </v-col>
        </v-row>
        </div>
    </div>
</admin-layout>
</template>

<script>
import AdminLayout from "../layouts/AdminLayout.vue";
import {
    getCo2Data,
    co2ChartOptions
} from "../methods/charts/co2/co2-chart.js"
import {
    getHumidityData,
    humidityChartOptions
} from "../methods/charts/humidity/humidity-chart.js"
import {
    getTemperatureData,
    temperatureChartOptions
} from "../methods/charts/temperature/temperature-chart.js"
import {
    getMovementData,
    movementChartOptions
} from "../methods/charts/movement/movement-chart.js"

import {
    getBlocks
} from "../methods/charts/blocks/blocks"

export default {
    components: {
        AdminLayout,

    },
    inject: {
        theme: {
            default: {
                isDark: false
            },
        },
    },
    data() {
        return {
            dateMenu: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            blocks: [],
            block: 1,
            charts: [{
                    id: "co2",
                    chartOptions: co2ChartOptions,
                    series: []
                },
                {
                    id: "humidity",
                    chartOptions: humidityChartOptions,
                    series: []
                },
                {
                    id: "temperature",
                    chartOptions: temperatureChartOptions,
                    series: []
                },
                {
                    id: "movement",
                    chartOptions: movementChartOptions,
                    series: []
                },
            ],
            breadcrumbs: [{
                    text: "App",
                    disabled: false,
                    href: "/home",
                },
                {
                    text: "Home",
                    disabled: true,
                    href: "/home",
                },
            ],
        }
    },
    methods: {
        getChartData() {
            getBlocks().then(b => {
                this.blocks = b
            })
            getCo2Data(this.block, this.date).then(s => {
                this.charts[0].series = s
            })
            getHumidityData(this.block, this.date).then(s => {
                this.charts[1].series = s
            })
            getTemperatureData(this.block, this.date).then(s => {
                this.charts[2].series = s
            })
            getMovementData(this.block, this.date).then(s => {
                this.charts[3].series = s
            })
        },
        datePickerOnInput(){
            this.dateMenu = false
            this.getChartData()
        }
    },
    computed: {
        chartsP1: function () {
            return this.charts.slice(0, 2)
        },
        chartsP2: function () {
            return this.charts.slice(2, 5)
        },
    },
    mounted() {
        this.getChartData();
    }
};
</script>

<style>
.apexcharts-toolbar {
    z-index: 0 !important;
}
</style>
