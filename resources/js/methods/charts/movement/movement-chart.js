//Methods
const getMovementData = async (block, date) => {
    const resp = await axios
                            .get('/api/health/movement', {
                                auth: {
                                    username: 'admin@admin.com',
                                    password: 'ghassen1999'
                                },
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            }).catch(error => console.log(error))
    return [{name:"People",data:resp.data.data}]
}
//Options
const movementChartOptions = {
    chart: {
        id: 'movement-chart'
    },
    markers: {
        size: 4
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
        labels: {
            formatter: function (value) {
                return value + "H";
            }
        },
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