//Methods
const getHumidityData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/humidity', {
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            },{
                                headers: {
                                    Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                },
                            }).catch(error => console.log(error))
    return [{name:"Percentage",data:resp.data.data}]
}
//Options
const humidityChartOptions = {
    chart: {
        id: 'humidity-chart'
    },
    stroke: {
        curve:"smooth"
    },
    markers: {
        size: 1
    },
    title: {
        text: "Humidity"
    },
    legend: {
        show: true,
        position: "top"
    },
    colors:['#E91E63', '#FF9800'],
    xaxis: {
        tickAmount: 5,
        labels: {
            rotate:0,
            hideOverlappingLabels: true,
        }
    },
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