//Methods
const getBlocks = async () => {
    const resp = await axios
                            .get('/api/health/blocks', {
                                auth: {
                                    username: 'admin@admin.com',
                                    password: 'ghassen1999'
                                }
                            }).catch(error => console.log(error))
    return resp.data.data
}
export {getBlocks}