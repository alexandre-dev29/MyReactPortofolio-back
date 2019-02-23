
const returnSuccess = message => {
    return {response: "success", message: message}
}

const returnError = message => {
    return {response: "error", message: message}
}

const returnCustom = (message, all_data) => {
    return {response: "success", message: message, all_data: all_data}
}


module.exports = {
    returnError: returnError,
    returnSuccess: returnSuccess,
    returnCustom: returnCustom
}