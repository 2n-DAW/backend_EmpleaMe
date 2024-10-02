const respMsg = (status, result) => {
    return {
        status: status,
        result: { message: result }
    };

}

const resp = (status, result) => {
    return {
        status: status,
        result: result
    };

}

module.exports = {
    resp,
    respMsg
}