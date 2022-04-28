const {Movie , User, Genre, Bookmark} = require('../models');
const {Op} = require('sequelize')
const {signin} = require('../helpers/jwt-helper');
const {compare} = require('../helpers/hash-helper');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class customerController {

    static async registerCustomer(req, res, next){
        const {username, email, password, phoneNumber, address} = req.body;
        try {
            const newUser = await User.create({username, email, password, role : 'customer', phoneNumber, address})
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    static async signInCustomer(req, res, next){
        const {email, password} = req.body;
        // console.log(process.env.JWT_SECRET);
        try {
            if (!email || !password) throw { name: 'Unauthorized'};
            const user = await User.findOne({where: {email}});
            if (!user) throw {name : 'Unauthorized'};
            const compareResult = compare(password, user.password);
            if (!compareResult) throw {name: 'Unauthorized'}
            const access_token = signin({id : user.id, email:user.email});
            res.status(200).json({access_token});
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async googleSignInCustomer(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            const {email} = payload;

            const [user, isCreated] = await User.findOrCreate({
                where: {email},
                // defaults: {
                //     password: 'dadadsdadsaacaaw',
                //     role: 'user'
                // }
            });
            let code = 200;
            if (isCreated) code = 201;
            const access_token = signin({id: user.id, email: user.email});
            res.status(code).json({access_token, email: user.email});
        } catch (error) {
            next(error);
        }
    }

    static async getMoviesPagination(req, res, next) {
        let { page, size } = req.query;
        // console.log(req.query);
        // console.log(size);

    
        let title = req.query.title;
        let genre = req.query.genre;
        // console.log(req.query.title);
        // console.log(req.query.genre);
    
        let result = {};
    
        const paginate = (page, size) => {
        // const limit = size ? +size : 8;
        const limit = 8;
        const offset = page ? page : 0
        // const offset = page - 1
        console.log(offset, page);
    
        return {
            limit,
            offset,
            };
        };
    
        const { limit, offset } = paginate(page, size);
    
        
        if (genre) {
            result.name = { [Op.iLike]: `%${genre}%` };
        }

        let opt = {
        include: [{ model: Genre, where: result }, 
        { model: User,
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                }}
        ],
        limit,
            offset,
            where: { status: "active" },
            order: [["id", "asc"]],
        };
    
        if (title) {
            opt.where.title = { [Op.iLike]: `%${title}%` };
        }
        
        try {
            const response = await Movie.findAndCountAll(opt);
            res.status(200).json({
                Movies: response.rows,
                page: page,
                totalPage: Math.floor(response.count / 4),
            });
        } catch (error) {
            // console.log(error);
            next(error);
        }

    }

    static getAllGenre(req, res, next) {
        Genre.findAll()
        .then((data) => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
            next(error)
        });
    }

    static getMoviesByIdCustomer(req, res, next) {
        Movie.findByPk(req.params.id)
            .then((data) => {
                if (!data) throw ({ name: "MovieNotFound" });
                res.status(200).json({
                    movie: data
                })
            })
            .catch((error) => {
                // console.log(error, 'by id');
                next(error)
            });
    }

    static addbookmarkMovie (req, res, next) {
        Movie.findByPk(req.params.id)
        .then((result) => {
            if(req.user.role !== 'customer' ) throw {name: "Authorized"}
            if (!result) throw { name: "MovieNotFound" }
            return Bookmark.findOne({
                where: 
                {
                    authorId: req.user.id, movieId: req.params.id
                }
            })
        })
        .then((response) => {
            // console.log(response);
            if(response) throw {name: "alreadyBookmarked"}
            return Bookmark.create({
                authorId: req.user.id, 
                movieId: req.params.id,
            })
        })
        .then((data) => {
            res.status(201).json({
                data,
                role: req.user.role
            })
        })
        .catch((err) => {
            next(err)
        })
    }

    static getAllBookmark (req, res, next) {
        Bookmark.findAll({
            include: [{ model: Movie}, User],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },  
            where: {
                authorId: req.user.id
            }
        })
        .then((result) => {
            // res.status(200).json(result)
            // console.log(result);
            if(req.user.role === 'customer' ) {
                res.status(200).json(result)
            }else {
                res.status(401).json({ messages: "only customer"})
            }
        })
        .catch((err) => {
            next(err)
        })
    }
    
}

module.exports = customerController;