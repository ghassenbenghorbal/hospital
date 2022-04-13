<template>
<admin-layout>
    <div style="height:100%">
        <!-- Customization -->
        <div class="mb-2 d-flex justify-center">
            <div style="width:80px;" class="mr-6 white">
                <div class="d-inline-flex">
                    <v-select v-model="block" @input="getChartData" :items="blocks" label="Block" dense outlined hide-details></v-select>
                </div>
            </div>
            <div style="width:140px">
                <div class="d-inline-flex white">
                    <v-menu v-model="dateMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" left origin="center">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="Date" prepend-inner-icon="mdi-calendar" readonly dense outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" @input="datePickerOnInput" color="primary" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"></v-date-picker>
                    </v-menu>
                </div>
            </div>
            <div style="width:90px;" class="ml-6 white">
                <div class="d-inline-flex">
                    <v-select v-model="interval" :items="intervals" @input="getChartData" label="Interval" dense outlined hide-details></v-select>
                </div>
            </div>
        </div>
        <!-- Customization -->
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
        <!-- Mobile and down -->
        <!-- Laptop and above -->
        <div style="height:95%" class="hidden-sm-and-down">
            <v-row align="center" justify="center" style="height:50%">
                <v-col v-for="chart in chartsP1" :key="chart.id" style="height:100%">
                    <v-card class="" width="95%" height="100%">
                        <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                    </v-card>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" style="height:50%" class="mt-2">
                <v-col v-for="chart in chartsP2" :key="chart.id" style="height:100%">
                    <v-card class="" width="95%" height="100%">
                        <apexchart height="94%" width="100%" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <!-- Laptop and above -->
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
            intervals: [{
                text: "1min",
                value: 1
            }, {
                text: "5min",
                value: 5
            }, {
                text: "15min",
                value: 15
            }, {
                text: "30min",
                value: 30
            }, {
                text: "1H",
                value: 60
            }, {
                text: "1D",
                value: 1440
            }, {
                text: "1W",
                value: 1080
            }, {
                text: "1M",
                value: 43200
            }, {
                text: "1Y",
                value: 525600
            }],
            interval: 1,
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
            timer: null
        }
    },
    methods: {
        getChartData() {
            clearInterval(this.timer)
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
            this.timer = setInterval(() => {
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
            }, this.interval * 60000)

        },
        datePickerOnInput() {
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
    created() {
        getBlocks().then(b => {
            this.blocks = b
        })
    },
    mounted() {
        this.getChartData();
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
};
</script>

<style>
.apexcharts-toolbar {
    z-index: 0 !important;
}
</style>
