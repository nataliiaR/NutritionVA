const factory = require("../factories/RecipeFactory");
const sql = require("../../controller/recipeSql");

let interface = {
    create: (id, cb) => {
        factory.Create(id, (ConcreteObject) => {
            cb(ConcreteObject)
        })
    },
    read: (id, cb) => {
        factory.Retrieve(id, (ConcreteObject) => {
            cb(ConcreteObject)
        })
    },
    update: (id, obj, cb) => {
        factory.Rebuild(id, obj, (ConcreteObject) => {
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