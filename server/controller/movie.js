const {Movie , User, History, Genre, } = require('../models');
const axios= require('axios')

class movieController {
    static getMovies(req, res, next) {
        Movie.findAll({
            include: [{ model: Genre}, User]
            // include: [{
            //     model: User,
            //     attributes: {
            //         exclude: ["password", "createdAt", "updatedAt"]
            //     }
            // },
            // model:Genre
            // ]
        })
        .then((data) => {
            // console.log(data);
            res.status(200).json({
                movies: data, userLogin: req.user
            });
        })
        .catch((error) => {
            next(error)
        });
    }


    static createMovies(req, res, next) {
        const temp = {};
        // console.log(req.user.id);
        // const { title, synopsis, trailerUrl, imgUrl, rating, genreId, status = 'active', authorId } = req.body
        Movie.create({ 
            title: req.body.title, 
            synopsis: req.body.synopsis, 
            trailerUrl: req.body.trailerUrl, 
            imgUrl: req.body.imgUrl , 
            rating: req.body.rating, 
            genreId: req.body.genreId, 
            status : 'active',
            authorId : req.user.id
        })
            .then (result => {
                temp.movie = result
                // console.log(result, 'add');
                return History.create({
                    MovieId: result.id,
                    title : result.title,
                    description :`new movie with is ${result.id} created`,
                    updatedBy: req.user.email,
                    authorId: result.authorId
                })
            })
            .then((data) => {
                res.status(201).json({
                    movie: temp.movie, data
                });
            })
            .catch((error) => {
                next(error)
            });
    }

    static getMoviesById(req, res, next) {
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

    static editMovies(req, res, next) {
        const temp = {};
        // const { title, synopsis, trailerUrl, imgUrl, rating, genreId, authorId, status } = req.body
        Movie.update({ 
            title: req.body.title, 
            synopsis: req.body.synopsis, 
            trailerUrl: req.body.trailerUrl, 
            imgUrl: req.body.imgUrl , 
            rating: req.body.rating, 
            genreId: req.body.genreId,
            authorId : req.user.id
            }, {
                where: {
                    id: req.params.id,
                }, 
                returning: true
            })

            .then((result => {
                temp.movies = result;
                // console.log(result[1][0], 'test 1');
                // console.log(req.user);
                
                if (!result[0]) {
                    throw {name: 'NotFound' }
                } else {
                    return History.create({
                        // MovieId: result.id,
                        // title : result.title,
                        // description :`Movie with is ${result.id} update`,
                        // updatedBy: req.user.id

                        MovieId: result[1][0].id,
                        title : result[1][0].title,
                        description :`Movie with is ${result[1][0].id} update`,
                        updatedBy: req.user.email,
                        authorId: result[1][0].authorId
                    })
                }
            }))
            
            // .then((data) => {
            //     // console.log(data);
            //     if (data[0] === 0) {throw ({ messages: "MovieNotFound" })} 
            //     else {
            //         const History = {
            //             description : `Movie id ${data[1][0].id} berhasil update`,
            //             title: data[1][0].title,
            //             UpdateBy: req.authorId,
            //             MovieId: id
            //         }
            //         return History.create(History)
            //     }
            // })
            
            .then(dataHistory => {
                res.status(200).json({movie: temp.movie, dataHistory});
            })

            .catch((error) => {
                // console.log(error);
                next(error)
            });
    }


    static deleteMovies (req, res, next){
        // let result = '';
        // Movie.findByPk(req.params.id, {
        //     attributes: ["title"],
        //     where: { id: req.params.id }
        // })
        // .then((data) => {
        //     if (data === null) {
        //         throw ({ messages: "MovieNotFound" });
        //     } else {
        //         result = data.title;
        //         return Movie.destroy({
        //             where: {
        //                 id: req.params.id
        //             }
        //         })
        //     }
        // })
        // .then(() => {
        //     res.status(200).json({
        //         messages: `${result} susccess to delete `
        //     })
        // })

        // .catch((error) => {
        //     next(error)
        // });


        let tampungan = {};
    
        Movie.findByPk(req.params.id, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            tampungan.paramsIdMovie = result;
    
        if (!result) {
                throw {name: 'NotFound' }
        // } else if (result.id !== req.user.id && req.user.role !== 'admin') {
        //         throw {name: 'Unauthorized'}
        } else {
            result.title = result.title;
            return Movie.update({
                status: "archived"
            }, {
            where: {
                id : +req.params.id
            }, 
            returning: true
            });
        }
        })
        .then((deleteMovie) => {
        tampungan.movies = deleteMovie;
        // console.log(deleteMovie[1][0], 'test 1');
        return History.create({
            MovieId: deleteMovie[1][0].id,
            title : deleteMovie[1][0].title,
            description: `Movie with id ${deleteMovie[1][0].id} permanently deleted`,
            updatedBy: req.user.email,
            authorId: deleteMovie[1][0].authorId

            // entityId: updateMovies[1][0].id,
            // name: updateMovies[1][0].title,
            // description: `Movies with id ${updateMovies[1][0].id} permanently deleted`,
            // updatedBy: req.user.id
        })
        })
        .then((history) => {
        // console.log(history)
            res.status(200).json({ 
                messages: `Movie with id ${history.id} success to delete`,
                movies: tampungan.movies,
                history 
            })
        })
        .catch(error => {
            next(error)
        })
    }
    static pacthMovie (req, res, next){
        const tampungan = {};
        Movie.update({
            status: req.body.status
        }, {
            where: {
                id: req.params.id,
            }, 
            returning: true
        })
        .then((result) => {
            tampungan.movies = result;
            // console.log(result[1][0].authorId, 'test 2');
            if (!result) {
                throw {name: 'NotFound' }
            } else if (req.user.role !== 'admin') {
                throw {name: 'forbidden'}
            } else {

                return History.create({
                    MovieId: result[1][0].id,
                    title : result[1][0].title,
                    description :`Movie with is ${result[0]} has been update frome active into inactive`,
                    updatedBy: req.user.email,
                    authorId: result[1][0].authorId
                })
            }
        })
        .then(data => {
            // console.log(dataHistory);
            res.status(200).json({movie: tampungan.movies, data})
        })
        .catch(error => {
            // console.log(error);
            next(error)
        })
    }

    static async getMoviePopuler (req, res, next) {
        // try {
        //     const response = await axios({
        //         url: 'https://api.themoviedb.org/3/movie/popular',
        //         method: 'GET',
        //         headers: {
        //             Authorization : `Bearer ${process.env.TMBD_API}`
        //         }
        //     });
        //     res.status(200).json(response.results);
        //     console.log(response.results);
        // } catch (error) {
        //     // console.log(error);
        //     next(error);
        // }

        axios.get('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTNlOTA3NTFiOGFjOGM5OWU3ZDJhMWUxNjA1ZDhjNCIsInN1YiI6IjYxZTZlZDkzNDQxYjAzMDA5NWI3YThiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.14OVZwNgMwEI2b4_EOmCtrdXCJepvNA0yLV5H2Vacs4'
            }
        })
        .then(({data}) => {
            console.log(data.results[0].title);
            res.status(200).json(data.results.slice(0, 9))
        })
        .catch(error => {
            // console.log(error);
            next(error)
        })
    }
}

module.exports = movieController;