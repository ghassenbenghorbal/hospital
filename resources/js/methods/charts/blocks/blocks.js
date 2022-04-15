//Methods
const getBlocks = async () => {
    const resp = await axios
                            .get('/api/health/blocks', {
                                headers: {
                                    Authorization: `Bearer 5|mdddlqoOH4PUih5OQntwD3573otk8CL6kvRRHiQg`,
                                },
                            }).catch(error => console.log(error))
    return resp.data.data
}
export {getBlocks}