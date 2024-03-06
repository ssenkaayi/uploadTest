

// export  const errorHandler = (err,req,res,next) => {

//     const statusCode = res.statusCode ? res.statusCode : 500;

//     res.status(statusCode);

//     res.json({
//         message:err.message,
//         stack:process.env.NODE_ENV === "development" ? 
//         err.stack : null,
//     });
// }


export const errorHandler = (statusCode,message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error
}

export default errorHandler

