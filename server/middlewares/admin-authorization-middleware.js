const {Movie } = require('../models');

function adminAuthorizationMiddleware(req, res, next)  {
    if (req.user.role === 'admin') next()
    else {
        Movie.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(movie => {
            if(!movie) next({name:'NotFound'})
            else if(movie.authorId ===  req.user.id)next()
            else next({name: 'forbidden'})
        })
    }
}

module.exports = adminAuthorizationMiddleware;