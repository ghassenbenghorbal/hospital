//Methods
const getHumidityData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/humidity', {
                                auth: {
                                    username: 'admin@admin.com',
                                    password: 'ghassen1999'
                                },
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            }).catch(error => console.log(error))
    return [{name:"Percentage",data:resp.data.data}]
}
//Options
const humidityChartOptions = {
    chart: {
        id: 'humidity-chart'
    },
    markers: {
        size: 4
    },
    title: {
        text: "Humidity"
    },
    legend: {
        show: true,
        position: "top"
    },
    colors:['#E91E63', '#FF9800'],
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + "%";
            }
        },
        max: 100,
        min: 0,
        tickAmount: 5
    },
    
    noData: {
        text: 'Loading...'
    }
}
export {getHumidityData, humidityChartOptions}