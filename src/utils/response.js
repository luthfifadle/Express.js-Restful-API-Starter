export async function success(res, data = [], code = 200, msg = 'Success') {
    res.status(200).json({
        status: 'success',
        code: code,
        message: msg,
        data: data
    })
}

export async function error(res, msg = 'Internal server error', code = 500, errors = []) {
    res.status(200).json({
        status: 'error',
        code: code,
        message: msg,
        errors: errors
    })
}