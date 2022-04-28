function errorHandler( error, req, res, next){
    console.log(error);
    let code;
    let messages;
    if (error.name === 'SequelizeValidationError') {
        code = 400;
        messages =  error.errors.map((el) => {
            return el.message
        });
    } else if (error.name === 'SequelizeUniqueConstraintError'){
        code = 400;
        messages =  error.errors.map((el) => {
            return el.message
        });
    } else if (error.name === 'forbidden'){
        code = 403;
        messages = ['Forbidden'];
    } else if (error.name === 'MovieNotFound'){
        code = 404;
        messages = ['Movie Not Found']
    } else if (error.name === 'NotFound'){
        code = 400;
        messages = ['Not Found'];
    } else if (error.name === 'Unauthorized'){
        code = 401;
        messages = ['Wrong email/password'];
    } else if (error.name === 'Authorized'){
        code = 403;
        messages = ['Not Authorized'];
    } else if (error.name === "alreadyBookmarked"){
        res.status(400).json({
            messages: "Already Bookmarked"
        })
    } else {
        code = 500;
        messages = ['Internal Server Error'];
    }

    res.status(code).json({messages});
}

module.exports = errorHandler;