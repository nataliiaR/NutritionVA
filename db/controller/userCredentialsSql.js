let db = require("../models")

let sequelize = {
    Read: (userID, cb) => {
        db.UserCredentials.findAll({
            where:{
                UserId: parseInt(userID)
            }
        })
        .then((responseBody) => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err)
            cb(err);
        });
    },
    Create: (obj, cb) => {
        db.UserCredentials.create({
            UserID: obj.UserID,
            email: obj.email,
            password: 'default',
            userID_FB: obj.userID_FB,
            userName_FB: obj.userName_FB,
            last_login: Date.now()
        })
        .then(responseBody => {
            let tempObj = { ...responseBody };
            tempObj.password = responseBody.generateHash(obj.password);
            sequelize.Update(tempObj, (credObj) => {
                if (credObj !== 0)
                {
                    let returnObj = { ... credObj };
                    returnObj.password = "Hidden";
                    cb(returnObj);
                }
                else
                {
                    console.error("There was an issue updating userCredentials.");
                    cb(credObj);
                }
            });
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (userId, cb) => {
        db.UserCredentials.destroy({
            where:{
                UserId: parseInt(userId)
            }
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    },
    Update: (obj, cb) => {
        db.UserCredentials.update({
            email: obj.email,
            password: obj.password,
            userID_FB: obj.userID_FB,
            userName_FB: obj.userName_FB,
            last_login: Date.now()
        }, {
          where: {
            UserId: obj.UserId
          }
        })
        .then(responseBody => {
          cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    },
    EmailInUse: (email) => {
        db.UserCredentials.findAll({
            where:{
                email: email
            }
        })
        .then(responseBody => {
            if (responseBody[0].email = email)
            {
                return true;
            }

            return false;
        })
        .catch(function(err){
            console.error(err);
            return false;
        })
    },
    FindByEmail: (email, cb) => {
        db.UserCredentials.findAll({
            where:{
                email: email
            }
        })
        .then(responseBody => {
            if (responseBody[0].email = email)
            {
                cb(responseBody[0]);
            }
            else
            {
                cb(0);
            }
        })
        .catch(function(err){
            console.error(err);
            cb(0);
        })
    }
}

module.exports = sequelize;