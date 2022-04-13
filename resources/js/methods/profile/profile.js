const changeNameEmail = async (block, date) => {
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
const changePassword = async (block, date) => {
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
const generateApiToken = async (token_name) => {
    const resp = await axios
                            .post('/api/generate-token/', {
                                token_name: token_name
                            },{
                                headers: {
                                    Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                },
                            }).catch(error => console.log(error))
    return resp.data.token
}
export {changeNameEmail, changePassword, generateApiToken}