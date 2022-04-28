const { Movie, User, History } = require('../models');

class historyController {
    static getHistory(req, res, next) {
        History.findAll({
            include: [{
                model: User,
                attributes: ["username", "email", "role"]
            }, 
            { 
                model: Movie, 
                attributes: ["id", "title", "status", "authorId"] 
            }]
        })
            .then(result => {
                // console.log(result);
                res.status(200).json({ histories: result})
            })
            .catch(error => {
                next(error)
            })
    }
}

module.exports = historyController;