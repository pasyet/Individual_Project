const {User} = require('../models');
const {signin} = require('../helpers/jwt-helper');
const {compare} = require('../helpers/hash-helper');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class SigninController {
    static async signIn(req, res, next){
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

    static async googleSignIn(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.id_token,
                audience: process.env.GOOGLE_CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            const {email} = payload;

            const [user, isCreated] = await User.findOrCreate({
                where: {email},
                defaults: {
                    password: 'dadadsdadsaacaaw',
                    role: 'user'
                }
            });
            let code = 200;
            if (isCreated) code = 201;
            const access_token = signin({id: user.id, email: user.email});
            res.status(code).json({access_token,email: user.email});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SigninController;