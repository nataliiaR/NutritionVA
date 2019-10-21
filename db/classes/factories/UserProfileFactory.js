const UserProfile = require("../UserProfile");
const UserSql = require("../../controller/userSql");
const UserMetricsSql = require("../../controller/userMetricsSql");
const UserCredentialsSql = require("../../controller/userCredentialsSql");
const DietConfigSql = require("../../controller/dietConfigSql");
const UserScheduleSql = require("../../controller/userScheduleSql");
const UserScheduleFactory = require("./UserScheduleFactory");

let interface = {
    assemblerBlueprints: ["user", "usermetrics", "usercredentials", "dietconfig", "userschedule"],
    assembly: {
        user:{
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            dob: null,
            currentMetricsID: null,
            currentDietConfigID: null
        },
        userCredentials:{
            alias: null,
            password: null,
            userID_FB: null,
            userName_FB: null,
            UserId: null
        },
        userMetrics:{
            id: null,
            weight: null,
            height: null,
            gender: null,
            type: null,
            UserId: null
        },
        userSchedule:{
            schedule: {
                //Add Keys as such..
                //epochtime: [recipeID, q
            },
            daysRequested: null,
            recipeIDs: null,
            UserId: null
        },
        dietConfig:{
            id: null,
            calorieTarget: null,
            proteinTarget: null,
            carbTarget: null,
            fatTarget: null,
            diet: null,
            exclusionList: null,
            UserId: null
        }
    },
    Status: {
        user: "NA",
        userCredentials: "NA",
        userMetrics: "NA",
        dietConfig: "NA",
        userSchedule: "NA"
    },

    Create:(obj, cb) => {
       if (obj.user)
       {
        interface.constructUser(obj.user, true, (user) => {
            UserSql.Create(user, (response) => {
                if (response.id)
                {
                    interface.assembly.user = response, 
                    interface.setId(response.id) 
                    Object.keys(obj).forEach(key => {
                        switch (key.toLowerCase()) {
                            case interface.assemblerBlueprints[1]:
                                interface.constructUserMetrics(obj[key], true, (userMetrics) => { 
                                    UserMetricsSql.Create(userMetrics, (response) => {
                                        response.id ? (interface.assembly.userMetrics = response, console.log(`Added new userMetrics;Result;${JSON.stringify(response)}`)) : console.error(`Failed to add userMetrics to database;${JSON.stringify(response)}`)
                                    })
                                })
                                break;
                            case interface.assemblerBlueprints[2]:
                                interface.constructUserCredentials(obj[key], (userCredentials) => {
                                    UserCredentialsSql.Create(userCredentials, (response) => {
                                        response.id ? (interface.assembly.userCredentials = response, console.log(`Added new UserCreds;Result;${JSON.stringify(response)}`)) : console.error(`Failed to add user creds;${JSON.stringify(response)}`)
                                    })
                                })
                                break;
                            case interface.assemblerBlueprints[3]:
                                interface.constructDietConfig(obj[key], true, (dietConfig) => {
                                    console.log(`Construct dietconfig returned ${JSON.stringify(dietConfig)}`)
                                    DietConfigSql.Create(dietConfig, (response) => {
                                        response.id ? (interface.assembly.dietConfig = response, console.log(`Added new dietConfig;Result;${JSON.stringify(response)}`)) : console.error(`Failed to add dietConfig to database;${JSON.stringify(response)}`)
                                    })
                                })
                                break;
                        
                            default:
                                if (key.toLowerCase() !== interface.assemblerBlueprints[0] && key.toLowerCase() !== interface.assemblerBlueprints[4])
                                { 
                                    console.log(`Create User Profile Get Request Body Contains an Invalid Key: ${key}`)
                                }
                                break;
                        }
                    });
                    
                    interface.constructUserSchedule(obj, true, (userSchedule) => {
                        console.log('\x1b[36m%s\x1b[0m',"recieved user schedule")
                        console.log(JSON.stringify(userSchedule))
                        UserScheduleSql.Create(userSchedule, (response) => {
                            console.log('\x1b[36m%s\x1b[0m',"response from user schedule sql")
                            console.log(JSON.stringify(response))
                            response.id ? interface.assembly.userSchedule = response : console.error(`Failed to add calender to database;${JSON.stringify(response)}`)
                            console.log('\x1b[36m%s\x1b[0m',"Refreshing User")
                            UserSql.Update(interface.assembly.user, (response) => {
                                console.log('\x1b[36m%s\x1b[0m',"response updating user..")
                                console.log(JSON.stringify(response))
                                response.id ? (interface.assembly.user = response, console.log("updated user profile")) : console.error("failed to update user profile")
                                try
                                {
                                    console.log('\x1b[36m%s\x1b[0m',"attempting to build user profile")
                                    console.log(JSON.stringify(interface.assembly))
                                    interface.assemble(interface.assembly, (obj) =>
                                    {
                                        console.log('\x1b[36m%s\x1b[0m',"sending back what assemble returned:")
                                        console.log(JSON.stringify(obj))
                                        cb(obj)
                                    })
                                }
                                catch (e)
                                {
                                    console.error("Failed to Build UserProfile");
                                    console.error(e);
                                    return null;
                                }
                            });
                        })
                    });
                }
                else
                {
                    console.error(`Failed to add user to database;${response}`);
                }
            })
        });
       }
       else
       {
          console.log(`Create User Profile Get Request Body Does not Contain User Object`);
          cb(0);
       }
    },
    Retrieve:(id, cb) => {
        if (typeof parseInt(id) === 'number')
        {
            UserSql.Read(parseInt(id), (sqlModel) => {
                interface.constructUser(sqlModel, false, (concreteObj) => {
                    UserMetricsSql.Read(parseInt(concreteObj.currentMetricsID), (sqlModel) => {
                        interface.constructUserMetrics(sqlModel, false, (concreteObj) => {
                            interface.assembly.userMetrics = concreteObj;
                        })
                    })
                    DietConfigSql.Read(parseInt(concreteObj.currentDietConfigID), (sqlModel) => {
                        interface.constructDietConfig(sqlModel, false, (concreteObj) => {
                            interface.assembly.dietConfig = concreteObj;
                        })
                    })
                })
            })
            UserCredentialsSql.Read(parseInt(id), (sqlModel) => {
                interface.constructUserCredentials(sqlModel, (concreteObj) => {
                    interface.assembly.userCredentials = concreteObj;
                })
            })
            UserScheduleSql.Read(parseInt(id), (sqlModel) => {
                interface.assembly.userSchedule = sqlModel;
                interface.constructUserSchedule(interface.assembly, false, (concreteObj) => {
                    interface.assembly.userSchedule = concreteObj;
                })
            })
            try
            {
                interface.assemble(interface.assembly, (obj) =>
                {
                    cb(obj)
                })
            }
            catch (e)
            {
                console.error(`Failed to Build Retrieved User Profile: ${id} database may be corrupted`)
                console.error(e)
                return null;
            } 
        }
        else
        {
           console.log(`Create User Profile Get Request Body Does not Contain User Object`)
           cb(0)
        }
    },
    Rebuild:(id, obj, cb) => {
        if (typeof parseInt(id) === 'number')
        {
            UserSql.Read(parseInt(id), (sqlModel) => {
                interface.constructUser(sqlModel, false, (concreteObj) => {
                    UserMetricsSql.Read(parseInt(concreteObj.currentMetricsID), (sqlModel) => {
                        interface.constructUserMetrics(sqlModel, false, (concreteObj) => {
                            interface.assembly.userMetrics = concreteObj;
                        })
                    })
                    DietConfigSql.Read(parseInt(concreteObj.currentDietConfigID), (sqlModel) => {
                        interface.constructDietConfig(sqlModel, false, (concreteObj) => {
                            interface.assembly.dietConfig = concreteObj;
                        })
                    })
                })
            })
            UserCredentialsSql.Read(parseInt(id), (sqlModel) => {
                interface.constructUserCredentials(sqlModel, (concreteObj) => {
                    interface.assembly.userCredentials = concreteObj;
                })
            })
            UserScheduleSql.Read(parseInt(id), (sqlModel) => {
                interface.assembly.userSchedule = sqlModel;
                interface.constructUserSchedule(interface.assembly, false, (concreteObj) => {
                    interface.assembly.userSchedule = concreteObj;
                })
            })

            interface.assemble(interface.assembly,(assembly) => {
                if (typeof assembly.user === 'object')
                {
                    interface.constructUser(assembly.user, false, (user) => {
                        UserSql.Update(user, (response) => {
                            console.log(`Updated user:${id};Result;${response}`)
                            Object.keys(obj).forEach(key => {
                                switch (key) {
                                    case assemblerBlueprints[1]:
                                        interface.constructUserMetrics(obj[key], false, (userMetrics) => {
                                            UserMetricsSql.Update(userMetrics, (response) => {
                                                console.log(`Updated user:${id} Metrics;Result;${response}`)
                                            })
                                        })
                                        break;
                                    case assemblerBlueprints[2]:
                                        interface.constructUserCredentials(obj[key], (userCredentials) => {
                                            UserCredentialsSql.Update(userCredentials, (response) => {
                                                console.log(`Updated user:${id} Creds;Result;${response}`)
                                            })
                                        })
                                        break;
                                    case assemblerBlueprints[3]:
                                        interface.constructDietConfig(obj[key], false, (dietConfig) => {
                                            DietConfigSql.Update(dietConfig, (response) => {
                                                console.log(`Updated user:${id} User Diet Config;Result;${response}`);
                                            })
                                        })
                                        break;
                                
                                    default:
                                        console.log(`Updated user:${id} Profile Post Request Body Contains an Invalid Key: ${key}`)
                                        break;
                                    }
                            });
                            interface.constructUserSchedule(interface.assembly, false, (userSchedule) => {
                                UserScheduleSql.Update(userSchedule, (response) => {
                                    console.log(`Updated user:${id} Schedule;Result;${response}`);
                                    try
                                    {
                                        interface.assemble(interface.assembly, (obj) =>
                                        {
                                            cb(obj)
                                        })
                                    }
                                    catch (e)
                                    {
                                        console.error(`Failed to update user:${id}`)
                                        console.error(e)
                                        return null;
                                    }
                                })
                            })
                        })
                    });      
                }
                else
                {
                    console.log(`Updated user:${id} Failed. Post Request body does not contain body.user`)
                    cb(0)
                }
            })
        }
        else
        {
           console.log(`Updated user:${id} Failed. Id not given as argument to factory method update.`)
           cb(0)
        }
    },
    // paramter obj can be either an object or an id, so object, isNew or id, false. 
    // Function either creates an abstract to store or builds an existing.
    constructUser: (obj, isNew, cb) =>
    {
        interface.Status.user = "building"
        if (isNew)
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                interface.assembly.user.firstName = obj.firstName;
                interface.assembly.user.lastName = obj.lastName;
                interface.assembly.user.email = obj.email;
                interface.assembly.user.dob = obj.dob;
                delete interface.assembly.user.id;
                interface.Status.user = "completed"
                cb(interface.assembly.user)
            }
            else
            {
                console.error(`Factory Method was passed and invalid object: ${obj}`)
                interface.Status.user = "failed"
                cb(null)
            }
        }
        else
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                interface.assembly.user.id = obj.id;
                interface.assembly.user.firstName = obj.firstName;
                interface.assembly.user.lastName = obj.lastName;
                interface.assembly.user.email = obj.email;
                interface.assembly.user.dob = obj.dob;
                interface.assembly.user.currentMetricsID = obj.currentMetricsID;
                interface.assembly.user.currentDietConfigID = obj.currentDietConfigID;
                interface.Status.user = "completed"
                cb(interface.assembly.user)
            }
            else
            {
                console.error(`Factory Method  was passed and invalid object: ${obj}`)
                interface.Status.user = "failed"
                cb(null)
            }
        }
    },

    constructUserMetrics:(obj, isNew, cb) =>
    {
        interface.Status.userMetrics = "building"
        if (isNew)
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                delete interface.assembly.userMetrics.id;
                interface.assembly.userMetrics.weight = obj.weight;
                interface.assembly.userMetrics.height = obj.height;
                interface.assembly.userMetrics.gender = obj.gender;
                interface.assembly.userMetrics.type = obj.type;
                interface.assembly.userMetrics.UserId = interface.assembly.userMetrics.UserId;
                interface.Status.userMetrics = "completed"
                cb(interface.assembly.userMetrics)
            }
            else
            {
                console.error(`Factory Method  was passed and invalid object: ${obj}`)
                interface.Status.user = "failed"
                cb(null)
            }
        }
        else
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                interface.assembly.userMetrics.id = obj.id;
                interface.assembly.userMetrics.weight = obj.weight;
                interface.assembly.userMetrics.height = obj.height;
                interface.assembly.userMetrics.gender = obj.gender;
                interface.assembly.userMetrics.type = obj.type;
                interface.assembly.userMetrics.UserId = obj.UserId;
                interface.Status.userMetrics = "completed";
                cb(interface.assembly.userMetrics);
            }
            else
            {
                console.error(`Factory Method was passed and invalid object: ${obj}`)
                cb(null)
            }
        }
    },

    constructUserCredentials:(obj, cb) =>
    {
        interface.Status.userCredentials = "building"
        if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
        {
            interface.assembly.userCredentials.alias = obj.alias;
            interface.assembly.userCredentials.password = obj.password;
            interface.assembly.userCredentials.userID_FB = obj.userID_FB;
            interface.assembly.userCredentials.userID_FB = obj.userID_FB;
            interface.assembly.userCredentials.UserId = interface.assembly.dietConfig.UserId;
            interface.Status.userCredentials = "completed"
            cb(interface.assembly.userCredentials)
        }
        else
        {
            console.error(`Factory Method was passed and invalid object: ${obj}`)
            cb(null)
        }
    },

    constructDietConfig:(obj, isNew, cb) =>
    {
        interface.Status.dietConfig = "building"
        if (isNew)
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                delete interface.assembly.dietConfig.id;
                interface.assembly.dietConfig.calorieTarget = obj.calorieTarget;
                interface.assembly.dietConfig.carbTarget = obj.carbTarget;
                interface.assembly.dietConfig.fatTarget = obj.fatTarget;
                interface.assembly.dietConfig.diet = obj.diet;
                interface.assembly.dietConfig.exclusionList = obj.exclusionList;
                interface.assembly.dietConfig.UserId = obj.UserId;
                interface.Status.dietConfig = "completed"
                cb(interface.assembly.dietConfig)
            }
            else
            {
                console.error(`Factory Method  was passed and invalid object: ${obj}`)
                interface.Status.user = "failed"
                cb(null)
            }
        }
        else
        {
            if (typeof obj === 'object' && typeof parseInt(obj.id) === 'number')
            {
                interface.assembly.dietConfig.id = obj.id;
                interface.assembly.dietConfig.calorieTarget = obj.calorieTarget;
                interface.assembly.dietConfig.carbTarget = obj.carbTarget;
                interface.assembly.dietConfig.fatTarget = obj.fatTarget;
                interface.assembly.dietConfig.diet = obj.diet;
                interface.assembly.dietConfig.exclusionList = obj.exclusionList;
                interface.assembly.dietConfig.UserId = obj.UserId;
                interface.Status.dietConfig = "completed";
                cb(interface.assembly.dietConfig);
            }
            else
            {
                console.error(`Factory Method was passed and invalid object: ${obj}`)
                cb(null)
            }
        }
    },

    constructUserSchedule:(obj, isNew, cb) =>
    {
        interface.Status.userSchedule = "building"
        if (isNew)
        {
            if (typeof obj === 'object')
            {
                if (parseInt(obj.userSchedule.daysRequested) > 0)
                {
                    
                    UserScheduleFactory.Create(obj, (concreteObj) =>{
                        if (typeof concreteObj === 'object' && typeof parseInt(concreteObj.UserId) === 'number')
                        {
                            interface.Status.userSchedule = "completed";
                            cb(concreteObj);
                        }
                        else
                        {
                            console.error("failed to create user schedule");
                            interface.Status.userSchedule = "failed";
                            cb(concreteObj);
                        }
                    })
                }
                else
                {
                    console.log(`User calender requested creation but days requested is 0 or null;daysRequested:${obj.userSchedule.daysRequested}`);
                    interface.Status.userSchedule = "completed";
                    cb(obj);
                }
            }
            else
            {
                console.log("Construct user Scedule recieved invalid object");
                interface.Status.userSchedule = "failed";
                cb("error: constructUserSchedule revieved an invalid object.");
            }
        }
        else
        {
            if (typeof obj === 'object' && typeof parseInt(obj.userSchedule.daysRequested) > 0)
            {
                UserScheduleFactory.Rebuild(obj, (concreteObj) => {
                    if (typeof concreteObj === 'object' && typeof parseInt(concreteObj.UserId) === 'number')
                    {
                        interface.Status.userSchedule = "completed";
                        cb(concreteObj);
                    }
                    else
                    {
                        console.error("failed to create user schedule");
                        interface.Status.userSchedule = "failed";
                        cb(concreteObj);
                    }
                })
            }
            else
            {
                UserScheduleFactory.Retrieve(obj, (concreteObj) => {
                    if (typeof concreteObj === 'object' && typeof parseInt(concreteObj.UserId) === 'number')
                    {
                        interface.Status.userSchedule = "completed";
                        cb(concreteObj);
                    }
                    else
                    {
                        console.error("failed to create user schedule");
                        interface.Status.userSchedule = "failed";
                        cb(concreteObj);
                    }
                })
            }
        }
    },

    setId:(id) =>
    {
        interface.assembly.userCredentials.UserId = id,
        interface.assembly.userMetrics.UserId = id,
        interface.assembly.userSchedule.UserId = id,
        interface.assembly.dietConfig.UserId = id
    },
    assemble:(assembly, cb) => {
        let attempts = 10
        if (statusCheck(interface.Status) === true)
        {
            assemble((object) => {
                cb(object);
            });
            
        } 
        else
        {
            setTimeout(() => {interface.assemble(assembly, cb)}, 1000);
        }

        function statusCheck(status)
        {
            console.log("checking build status")
            let result = true;
            console.log("assemble attempts left:" + attempts)
            if (attempts > 0)
            {
                attempts--;
                Object.keys(status).forEach(assemblyObj => {
                    console.log('\x1b[33m%s\x1b[0m',`${assemblyObj} Status = ${status[assemblyObj]}`)
                    if (status[assemblyObj] === "building")
                    {
                        result = false;
                    }
                });
            }
            else
            {
                result = true;
            }

            return result;
        }
        function assemble(cb)
        {
            console.log("assembling user profile");
            let userProfile = new UserProfile(interface.assembly);
            cb(userProfile);
        }
    }
}

module.exports = interface;




