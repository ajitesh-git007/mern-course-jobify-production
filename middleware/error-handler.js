import { StatusCodes } from 'http-status-codes'




const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err)

    const defaultError = {
        statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
        msg: (err.message) ? err.message : 'Something went wrong try again later',
    }

    if(err.name == "ValidationError"){
        defaultError.statusCode = StatusCodes.BAD_REQUEST,

        defaultError.msg = Object.values(err.errors)
                           .map(items => { return items.message})
                           .join(', ')
    }

    if(err.code && err.code === 11000){
        defaultError.statusCode = StatusCodes.BAD_REQUEST,

        defaultError.msg = 'The provided email is already registered'
    }

    res.status(defaultError.statusCode).json({msg : defaultError.msg})
}

export default errorHandleMiddleware