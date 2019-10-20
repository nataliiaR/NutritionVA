const Ingredient = require("../Ingredient");
const sql = require("../../ORM/ingredientSql");

let interface = {
    assembly: {
        spoonacularID: null,
        name: null,
        type: null,
        imageURL: null
    },
    Create:(obj, cb) => {
       if (obj.id)
       {
            interface.assembly.spoonacularID = obj.id;
            interface.assembly.name = obj.name;
            interface.assembly.type = obj.aisle;
            interface.assembly.image = obj.image;
            
            try
            {
                interface.assemble((obj) => {
                    sql.Create(obj, (sqlObj) => {
                        cb(sqlObj);
                    });
                });
            }
            catch
            {
                console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`);
                cb(0);
            }
       }
       else
       {
          console.log(`Ingredient Factory Recieved invalid object; ${obj}`);
          cb(0);
       }
    },
    Retrieve:(id, cb) => {
        if (typeof parseInt(id) === 'number')
        {
            sql.Read(parseInt(id), (sqlModel) => {
                if (sqlModel.spoonacularID)
                {
                    interface.assembly.spoonacularID = sqlModel.spoonacularID;
                    interface.assembly.name = sqlModel.name;
                    interface.assembly.type = sqlModel.type,
                    interface.assembly.image = sqlModel.image;

                    try
                    {
                        interface.assemble((obj) => {
                            cb(obj);
                        });
                    }
                    catch
                    {
                        console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`);
                        cb(0);
                    }
                }
                else
                {
                    console.log(`Ingredient ${id} does not exist in DB`);
                    cb(0);
                }
            });
            
        }
        else
        {
           console.log(`Create User Profile Get Request Body Does not Contain User ID`);
           cb(0);
        }
    },
    Rebuild:(id, obj, cb) => {
        if (typeof parseInt(id) === 'number')
        {
            sql.Read(parseInt(id), (sqlModel) => {
                interface.assembly.spoonacularID = sqlModel.spoonacularID;
                interface.assembly.name = sqlModel.name;
                interface.assembly.type = sqlModel.type,
                interface.assembly.image = sqlModel.image;
            })
            
            if (obj.id)
            {
                interface.assembly.spoonacularID = obj.id;
            }

            if (obj.name)
            {
                interface.assembly.name = obj.name;
            }

            if (obj.aisle)
            {
                interface.assembly.type = obj.aisle;
            }

            if (obj.image)
            {
                interface.assembly.type = obj.image;
            }

            try
            {
                interface.assemble((obj) => {
                    cb(obj);
                });
            }
            catch
            {
                console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`);
                cb(0);
            }
        }
        else
        {
           console.log(`Create User Profile Get Request Body Does not Contain User Object`);
           cb(0);
        }
    },
  
    assemble:(cb) => {
        let concreteObj = new Ingredient(interface.assembly);
        console.log(`Created Ingredient: ${JSON.stringify(concreteObj)}`);
        cb(concreteObj);
    }
}

module.exports = interface;




