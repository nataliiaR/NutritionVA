const IUserProfile = require("../db/classes/interfaces/IUserProfile");
const UserCredentialsSql = require("../db/controller/userCredentialsSql");
const UserSessionSql = require("../db/controller/userSessionSql");

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
                if(credObj.isValidPW(password))
                {
                    let session = {
                        UserID: credObj.UserID,
                        sessionUpdate: Date.now(),
                        isActive: true
                    }

                    UserSessionSql.Read(credObj.UserID, (arr) =>{
                        if(arr[0].UserID === credObj.UserID)
                        {
                            UserSessionSql.Update(session, (obj) => {
                                if(obj.UserID === credObj.UserID)
                                {
                                    return res.send({
                                        success: true,
                                        message: 'Valid sign in',
                                        token: obj.UserID
                                    });
                                }
                                else
                                {
                                    return res.send({
                                        success: false,
                                        message: 'Error: User Session Could Not Be Updated.'
                                    });
                                }
                            });
                        }
                        else
                        {
                            UserSessionSql.Create(session, (obj) => {
                                if(obj.UserID === credObj.UserID)
                                {
                                    return res.send({
                                        success: true,
                                        message: 'Valid sign in',
                                        token: obj.UserID
                                    });
                                }
                                else
                                {
                                    return res.send({
                                        success: false,
                                        message: 'Error: User Session could not be created.'
                                    });
                                }
                            })
                        }
                    });
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
    });

    app.get('/api/account/logout?token=:token', (req, res) => {
        const token = req.params.token;
        UserSessionSql.Read(token, (res) => {
            if (res.UserID === token)
            {
                let newSession = {
                    UserID: token,
                    sessionUpdate: Date.now(),
                    isActive: false
                }
                UserSessionSql.Update(newSession, (obj) => {
                    if(obj.UserID === token)
                    {
                        return res.send({
                            success: true,
                            message: 'Good'
                          });
                    }
                    else
                    {
                        console.error("Failed to Logout");
                        console.error(obj);
                        return res.send({
                            success: false,
                            message: 'Error: Failed to Update Session'
                        });
                    }
                })
            }
            else
            {
                console.error("User Session Not Found");
                console.error(res);
                return res.send({
                    success: false,
                    message: 'Error: Session Not Found'
                });
            }
        });
    })

    app.get('/api/account/verify?token=:token', (req, res) => {
        const token = req.params.token;
        UserSessionSql.Read(token, (res) => {
            if (res.UserID === token)
            {
                return res.send({
                    success: true,
                    message: 'Good'
                })
            }
            else
            {
                console.log("Invalid Session Detected");
                console.log(token);
                return res.send({
                    success: false,
                    message: 'Error: Session Not Valid'
                });
            }
        });
    })
}