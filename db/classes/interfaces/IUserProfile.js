const factory = require("../factories/UserProfileFactory");
const sql = require("../../ORM/userSql");
let interface = {
    create: (getBodyObj, cb) => {
        factory.Create(getBodyObj, (ConcreteObject) => {
            cb(ConcreteObject)
        })
    },
    read: (id, cb) => {
        factory.Retrieve(id, (ConcreteObject) => {
            cb(ConcreteObject)
        })
    },
    update: (id, updateBodyObj, cb) => {
        factory.Rebuild(id, updateBodyObj, (ConcreteObject) => {
            cb(ConcreteObject)
        })
    },
    delete: (id, cb) => {
        sql.Delete(id, (response) => {
            cb(response);
        });
    }
}

module.exports = interface;