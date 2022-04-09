//Methods
const getTemperatureData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/temperature', {
                                auth: {
                                    username: 'admin@admin.com',
                                    password: 'ghassen1999'
                                },
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            }).catch(error => console.log(error))
    return [{name:"Temperature",data:resp.data.data}]
}
//Options
const temperatureChartOptions = {
    chart: {
        id: 'temperature-chart'
    },
    markers: {
        size: 4
    },
    title: {
        text: "Temperature"
    },
    legend: {
        show: true,
        position: "top"
    },
    colors:['#66DA26', '#546E7A', '#E91E63', '#FF9800'],
    yaxis: {
        labels: {
            formatter: function (value) {
                return value.toFixed(2) + "°C";
            }
        },
        forceNiceScale:true,
    },
    noData: {
        text: 'Loading...'
    }
}
export {getTemperatureData, temperatureChartOptions}