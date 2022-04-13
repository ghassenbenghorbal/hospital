//Methods
const getCo2Data = async (block, date) => {
    const resp = await axios
                            .get('/api/health/co2', {
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            },{
                                headers: {
                                    Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                },
                            }).catch(error => console.log(error))
    return [{name:"Quantity",data:resp.data.data}]
}
//Options
const co2ChartOptions = {
    chart: {
        id: 'co2-chart'
    },
    stroke: {
        curve:"smooth"
    },
    markers: {
        size: 1
    },
    title: {
        text: "Co2"
    },
    legend: {
        show: true,
        position: "top"
    },
    xaxis: {
        tickAmount: 5,
        labels: {
            rotate:0,
            hideOverlappingLabels: true,
        }
    },
    yaxis: {
        forceNiceScale:true,
        labels: {
            formatter: function (value) {
                return value + " ppm";
            }
        },
    },
    noData: {
        text: 'Loading...'
    }
}
export {getCo2Data, co2ChartOptions}