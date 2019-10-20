let db = require("../models")

let sequelize = {
    Read: (id, cb) => {
        db.User.findAll({
            where:{
                id: parseInt(id)
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
        db.User.create({
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            dob: obj.dob,
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch((err) => {
            cb(err);
        });
    },
    Delete: (req, cb) => {
        db.User.destroy({
            where:{
                id: parseInt(req.params.id)
            }
        })
        .then(responseBody => {
            cb(responseBody);
        })
        .catch(err => {
            console.error(err)
            cb(err)
        });
    },
    Update: (obj, cb) => {
        db.User.update(
        {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            dob: obj.dob
        },
        {
            where: {id: obj.id}
        }
        )
        .then(responseBody => {
          cb(responseBody);
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
    }
}

module.exports = sequelize;