const router = require('express').Router()
const movieController = require('../controller/movie');
const registerController = require('../controller/register');
const signinController = require('../controller/signin');
const historyController = require('../controller/history');
const customerController = require('../controller/customer')
const authenticationMiddleware = require('../middlewares/authentication-middlewares');
const adminAuthorizationMiddleware = require('../middlewares/admin-authorization-middleware')
const errorHandlerMiddleware = require ('../middlewares/error-handler-middleware');


// router.get('/', (req, res) => {
//     res.status(200).json({
//         message:"server up"
//     })
// })        

router.post('/users/register',registerController.register);
router.post('/users/login',signinController.signIn);
router.post('/users/google-sign-in', signinController.googleSignIn);
router.post('/customers/register',customerController.registerCustomer);
router.post('/customers/login',customerController.signInCustomer);
router.post('/customers/google-sign-in', signinController.googleSignIn);

router.get('/movies/pub/pag', customerController.getMoviesPagination);
router.get('/movies/pub/:id', customerController.getMoviesByIdCustomer);
router.get('/movies/genre', customerController.getAllGenre)
router.get('/movies/bookmark', authenticationMiddleware, customerController.getAllBookmark);
router.post('/movies/:id/bookmark', authenticationMiddleware, customerController.addbookmarkMovie);
router.get('/movies/populer', movieController.getMoviePopuler);

router.use(authenticationMiddleware);


router.get('/histories', historyController.getHistory);
router.get('/movies', movieController.getMovies);



router.post('/movies', movieController.createMovies);
router.patch('/movies/:id',adminAuthorizationMiddleware, movieController.pacthMovie);
router.get('/movies/:id', movieController.getMoviesById);


router.put('/movies/:id', adminAuthorizationMiddleware, movieController.editMovies);
router.delete('/movies/:id', adminAuthorizationMiddleware, movieController.deleteMovies);

router.use(errorHandlerMiddleware);


module.exports = router;