//Methods
const getCo2Data = async (block, date) => {
    const resp = await axios
                            .get('/api/health/co2', {
                                auth: {
                                    username: 'admin@admin.com',
                                    password: 'ghassen1999'
                                },
                                params:{
                                    block_id:block,
                                    date:date
                                }
                            }).catch(error => console.log(error))
    return [{name:"Quantity",data:resp.data.data}]
}
//Options
const co2ChartOptions = {
    chart: {
        id: 'co2-chart'
    },
    markers: {
        size: 4
    },
    title: {
        text: "Co2"
    },
    legend: {
        show: true,
        position: "top"
    },
    xaxis:{
        
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