//Methods
const getTemperatureData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/temperature', {
                                params:{
                                    block_id:block,
                                    date:date
                                }
                                },{
                                    headers: {
                                        Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                    },
                                }).catch(error => console.log(error))
    return [{name:"Temperature",data:resp.data.data}]
}
//Options
const temperatureChartOptions = {
    chart: {
        id: 'temperature-chart'
    },
    stroke: {
        curve:"smooth"
    },
    markers: {
        size: 1
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
    xaxis: {
        tickAmount: 5,
        labels: {
            rotate:0,
            hideOverlappingLabels: true,
        }
    },
    noData: {
        text: 'Loading...'
    }
}
export {getTemperatureData, temperatureChartOptions}