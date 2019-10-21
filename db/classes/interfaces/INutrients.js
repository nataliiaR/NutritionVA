const factory = require("../factories/NutrientsFactory");
const sql = require("../../controller/nutrientsSql");
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