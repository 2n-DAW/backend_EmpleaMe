const resp = (status, result) => {
    return {
        status: status,
        result: { message: result }
    };
}

exports.resp = resp;