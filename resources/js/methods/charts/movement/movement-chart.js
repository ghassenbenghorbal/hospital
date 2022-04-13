//Methods
const getMovementData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/movement', {
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            },{
                                headers: {
                                    Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                },
                            }).catch(error => console.log(error))
    return [{name:"People",data:resp.data.data}]
}
//Options
const movementChartOptions = {
    chart: {
        id: 'movement-chart'
    },
    stroke: {
        curve:"smooth"
    },
    markers: {
        size: 1
    },
    title: {
        text: "Movement"
    },
    legend: {
        show: true,
        position: "top"
    },
    colors:['#FF9800'],

    noData: {
        text: 'Loading...'
    },
    decimalsInFloat: 0,
    xaxis: {
        tickAmount: 5,
        labels: {
            rotate:0,
            hideOverlappingLabels: true,
            formatter: function (value) {
                return value + "H";
            }
        }
    },
    yaxis: {
        min:0,
        forceNiceScale:true,
        labels: {
            formatter: function (value) {
                return parseInt(value);
            }
        },
    },
}
export {getMovementData, movementChartOptions}