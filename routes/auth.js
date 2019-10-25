const IUserProfile = require("../db/classes/interfaces/IUserProfile");
const UserCredentialsSql = require("../../controller/userCredentialsSql");

module.exports = (app) => {
    app.post('/api/account/signup', (req, res) => {
        const { body } = req;
        const { password } = body.userCredentials;
        let { email } = body.userCredentials;

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank'
            })
        }

        if (!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            })
        }
        
        email = email.toLowerCase();
        email = email.trim();

        if (!(UserCredentialsSql.EmailInUse(email)))
        {
            IUserProfile.create(req, (obj) => {
                if (obj)
                {
                    return res.JSON(obj)
                }
                else
                {
                    return res.send({
                        success: false,
                        message: 'Error: UserProfile Failed to create.'
                    })
                }
            })
        }
        else
        {
            return res.send({
                success: false,
                message: 'Error: Account already exists.'
            })
        }
    });

    app.post('/api/account/login', (req, res) => {
        const { body } = req;
        const { password } = body;
        let { email } = body;
        
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();
        email = email.trim();

        UserCredentialsSql.FindByEmail(email, (credObj) => {
            if(credObj.email === email)
            {
                if(credOnj.isValidPW(password))
                {

                }
                else
                {
                    return res.send({
                        success: false,
                        message: 'Error: Password Invalid.'
                    });
                }
            }
            else
            {
                return res.send({
                    success: false,
                    message: 'Error: Email does not exist in our database.'
                });
            }
        })
    })
}