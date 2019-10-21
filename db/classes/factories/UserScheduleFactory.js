const Spoonacular = require("../../../api/spoonacular");
const Recipe = require("../interfaces/IRecipe");
const moment = require('moment');


let interface = {
    assembly: {
        userId: null,
        maxDays: 14,
        maxCalls: 2,
        totalCalls: 0,
        daysRequested: null,
        daysFullfilled: 0,
        maxRecRep: null,
        recipeOrder: {
            b:0,
            l:0,
            d:0
        },
        recipeIds: [],
        schedule: {},
        calories: null,
        diet: null,
        exclusionList: null,
        currentDate: moment.utc((new Date).getTime()).format('YYYYMMDD'),
        initDate: null,
        lastDateGenerated: null,
        nextBreakfast: null,
        nextLunch: null,
        nextDinner: null,
        responses: [],
        staggerStage:'primary',
        primaryDayStagger: 4,
        auxDayStagger: 3,
        proximaDayStagger: 2
    },
    Create: (userAssembly, cb) => {
        interface.processRequest(userAssembly, (newAssembly) => {
            interface.constructSchedule(newAssembly, (newestAssembly) => {
                cb(interface.packageReturnObject(newestAssembly));
            });
        });
    },
    Retrieve: (userAssembly, cb) => {
        
        interface.processRequest(userAssembly, (newAssembly) => {
            interface.constructSchedule(newAssembly, (newestAssembly) => {
                cb(interface.packageReturnObject(newestAssembly));
            });
        });
    },
    Rebuild: (userAssembly, cb) => {
        interface.processRequest(userAssembly, (newAssembly) => {
            interface.constructSchedule(newAssembly, (newestAssembly) => {
                cb(interface.packageReturnObject(newestAssembly));
            });
        });
    },
    getAPIMealPlan: (cb) => {
        if (interface.assembly.totalCalls < interface.assembly.maxCalls)
        {
            interface.assembly.totalCalls++;
            Spoonacular.getMealPlan(packageParams(interface.assembly), (responseObj) => {
                if (responseObj.items)
                {
                    interface.assembly.responses.push(responseObj);
                    cb(responseObj);
                }
                else
                {
                    console.error(`Invalid API Response: ${JSON.parse(responseObj)} `)
                    cb(0)
                }
            });
        }
        else
        {
            console.log("Get Meal Plan API Call Maxed")
            cb('Maxed')
        }

        function packageParams(assembly)
        {
            let params = {
                timeFrame: "week",
                targetCalories: assembly.targetCalories,
                diet: assembly.diet,
                exclusionList: assembly.exclusionList
            }

            return params;
        }
    },
    processRequest: (request, cb) => {
        interface.assembly.userId = request.user.id;
        parseInt(request.userSchedule.daysRequested) <= interface.assembly.maxDays ? interface.assembly.daysRequested = parseInt(request.userSchedule.daysRequested) : interface.assembly.daysRequested = interface.assembly.maxDays;
        interface.assembly.recipeIDs = request.userSchedule.recipeIDs;
        interface.assembly.schedule = request.userSchedule.schedule;
        interface.assembly.diet = request.dietConfig.diet;
        interface.assembly.exclusionList = request.dietConfig.exclusionList;
        
        for (let index = 0; index < parseInt(interface.assembly.daysRequested) && index < interface.assembly.maxDays; index++) {
            interface.assembly.recipeOrder.b++;
            interface.assembly.recipeOrder.l++;
            interface.assembly.recipeOrder.d++;
        }

        cb(request)
    },
    constructSchedule: (assembly, cb) => {
        console.log("Constructing Schedule")
        if (interface.setInitDate() === true)
        {
            console.log("Running Construction Loop")
            interface.loopConstructor((result) => {
                if (result === 'Completed')
                {
                    console.log("Completed Schedule" + JSON.stringify(result));
                    cb(interface.assembly);
                }
                else 
                {
                    console.error("Something went wrong during schedule creation...");
                    cb(interface.assembly);
                }
            });
        }
        else
        {
            console.log("User attempted to add to a maxed schedule, schedule not modified.");
            cb(assembly);
        }
    },
    loopConstructor: (cb) => {
        console.log(JSON.stringify(interface.assembly.recipeOrder))
        if (interface.assembly.recipeOrder.b > 0 || interface.assembly.recipeOrder.l > 0 || interface.assembly.recipeOrder.d > 0)
        {
            console.log("Collected Responses" + interface.assembly.responses.length)
            console.log("getting meal plan")
            interface.getAPIMealPlan((response) => {
                if (response === 'Maxed')
                {   
                    if (interface.assembly.staggerStage === 'primary')
                    {
                        interface.assembly.staggerStage = 'aux'
                        interface.assembly.responses.forEach(obj => {
                            interface.parseAPIResponse(obj, interface.assembly.auxDayStagger, (result) => {
                                if(result !== 'Completed'){
                                    console.error('something went wrong when parsing api response')
                                }
        
                                loop(cb);
                            })
                        });
                    }
                    else if (interface.assembly.staggerStage === 'aux')
                    {
                        interface.assembly.staggerStage = 'proxima'
                        interface.assembly.responses.forEach(obj => {
                            interface.parseAPIResponse(obj, interface.assembly.proximaDayStagger, (result) => {
                                if(result !== 'Completed'){
                                    console.error('something went wrong when parsing api response')
                                }
        
                                loop(cb);
                            })
                        });
                    }
                    else
                    {
                        //we tried are best and will return the schedule we could build.
                        cb("Completed")
                    }
                    
                }
                else if (response.items)
                {
                    console.log("sending response to api parser")
                    interface.parseAPIResponse(response, interface.assembly.primaryDayStagger, (result) => {
                        if(result !== 'Completed'){
                            console.error('something went wrong when parsing api response');
                        }

                        loop(cb);
                    })
                }
                else 
                {
                    console.log(`There was an issue with ${response}`);
                    loop(cb);
                }
            });
        }
        else
        {
            console.log("loopConstructorCompleted");
            console.log("Waiting for remaining schedule additions")
            setTimeout(() =>{cb("Completed");},3000)
            
        }

        function loop(cb)
        {
            setTimeout(function() {
                interface.loopConstructor(cb);
            },50)
        }
    },
    parseAPIResponse: (response, dayStagger, cb) => {
        response.items.forEach(recipe => {
            interface.processRecipe(recipe, dayStagger, (result) =>{
                console.log("processed recipe " + recipe);
                console.log("Result " + result);
            });
        });
        cb('Completed')
    },
    processRecipe: (rawRecipeData, dayStagger, cb) => {
        let recipe = JSON.parse(rawRecipeData.value);
        console.log(`Processing Recipe: ${recipe.id}`);
        let isNewToSchedule = true;
        if (interface.assembly.recipeIds.length > 0)
        {
            interface.assembly.recipeIds.forEach(id => {
                if (recipe.id === id)
                {
                    isNewToSchedule = false;
                }
            });
        }

        if (isNewToSchedule)
        {
            console.log("looking up " + recipe.id);
            Recipe.read(recipe.id, (concreteRecipeObject) => {
                if (concreteRecipeObject === 0)
                {
                    Recipe.create(recipe.id, (concreteRecipeObject) => {
                        console.log(`Stored new recipe: ${concreteRecipeObject.id}`);
                        console.log(JSON.stringify(concreteRecipeObject))
                    })
                }
                
                interface.assembly.recipeIds.push(recipe.id);
                console.log(`adding new recipe to calander ${recipe.id}`);
                interface.addRecipeToCalender(rawRecipeData, dayStagger, (result) => {
                    cb(result)
                });
                
            });

        }
        else
        {
            interface.addRecipeToCalender(rawRecipeData, dayStagger, (result) => {
                cb(result);
            });
        }
    },
    addRecipeToCalender: (rawRecipeData, dayVariation, cb) => {
        let recipe = JSON.parse(rawRecipeData.value)
        console.log(`adding recipe: ${recipe.id} to schedule`)
        console.log(`Checking if ${recipe.id} is repeated in the last ${dayVariation} days`)
        if(!(interface.isReplicated(dayVariation, recipe.id)))
        {
            console.log(`${recipe.id} is not replicated in the last ${dayVariation} days`)
            switch (rawRecipeData.slot) {
                case 1:
                    console.log(`${recipe.id} added to nextBreakfast`)
                    interface.assembly.nextBreakfast = recipe.id;
                    break;
                case 2:
                    console.log(`${recipe.id} added to nextLunch`)
                    interface.assembly.nextLunch = recipe.id;
                    break;
                case 3:
                    console.log(`${recipe.id} added to nextDinner`)    
                    interface.assembly.nextDinner = recipe.id;
                    break;
                default:
                    console.log("recipe object had invalid ID")
                    break;
            }
        }

        if(interface.assembly.nextBreakfast !== null && interface.assembly.nextLunch !== null && interface.assembly.nextDinner !== null)
        {
            console.log("Meal block day is fullfilled adding to a meal day to schedule")
            interface.addDay((result) => {
                cb(result);
            })
        }
        else
        {
            console.log("Meal block day is not yet fullfilled")
            cb(true)
        }
    },
    addDay: (cb) => {
        console.log("adding days to calender from add day");
        console.log('\x1b[33m%s\x1b[0m',`Before Days Added ${JSON.stringify(interface.assembly.schedule)}`)
        let date = interface.incrementDate(interface.assembly.initDate, interface.assembly.daysFullfilled);
        let keys = interface.getMealKeys(date);

        Object.keys(keys).forEach(key => {
            switch (key) {
                case 'b':
                    assignKey(interface.assembly.schedule, keys[key], interface.assembly.nextBreakfast);
                    interface.assembly.nextBreakfast = null;
                    interface.assembly.recipeOrder.b--
                    break;
                case 'l':
                    assignKey(interface.assembly.schedule, keys[key], interface.assembly.nextLunch);
                    interface.assembly.nextLunch = null;
                    interface.assembly.recipeOrder.l--
                    break;
                case 'd':
                    assignKey(interface.assembly.schedule, keys[key], interface.assembly.nextDinner);
                    interface.assembly.nextDinner = null;
                    interface.assembly.recipeOrder.d--
                    break;
                default:
                    break;
            }
        })

        console.log('\x1b[33m%s\x1b[0m',`After Days Added ${JSON.stringify(interface.assembly.schedule)}`)
        
        interface.assembly.daysFullfilled++
        cb(true)

        function assignKey(obj, key, value)
        {
            console.log(`adding ${obj}, ${key}, ${value}`)
            Object.assign(obj, {[key]: value})
        }
    },
    isReplicated: (days, recipeID) => {
        return false;
        
        // try
        // {
        //     if(!Object.entries(interface.assembly.schedule).length === 0 && interface.assembly.schedule.constructor === Object)
        //     {
        //         for (let index = 0; index < days; index++) {
        //             console.log(`replication check: ${index}`)
        //             Object.keys(interface.assembly.schedule).forEach(key => {
        //                 console.log(key)
        //                 if (index = 0)
        //                 {
        //                     if (key.includes(interface.assembly.currentDate) && interface.assembly.schedule[key] == recipeID)
        //                     {
        //                         return false; 
        //                     }
        //                 }
        //                 else
        //                 {
        //                     if (key.includes(interface.decrementDate(interface.assembly.currentDate, index)) && interface.assembly.schedule[key] == recipeID)
        //                     {
        //                         return false;
        //                     }
        //                 }
        //             });
        //         }

        //         return true;
        //     }

        //     return false;
        // }
        // catch(err)
        // {
        //     console.log(err)
        //     return false;
        // }
    },
    isScheduleMaxed: () => {
        // if(!Object.entries(interface.assembly.schedule).length === 0 && interface.assembly.schedule.constructor === Object)
        // {let scheduleMax = interface.incrementDate(interface.assembly.currentDate, 14)
        // Object.keys(interface.assembly.schedule).forEach(key => {
        //     if(key.contains(scheduleMax))
        //     {
        //         return true;
        //     }
        // })}

        return false;
    },
    setInitDate: () => {
        if (Object.entries(interface.assembly.schedule).length === 0 && interface.assembly.schedule.constructor === Object)
        {
            interface.assembly.initDate = interface.assembly.currentDate;
            return true;
        }
        else
        {
            Object.keys(interface.assembly.schedule).forEach(key => {
                if(key.contains(interface.assembly.currentDate))
                {
                    if(!(interface.isScheduleMaxed()))
                    {
                        interface.assembly.initDate = interface.incrementDate(interface.getMostRecentEntry(),1);
                        return true;
                    }
                    else
                    {
                        console.log("user has reached max schedule length");
                        return false;
                    }
                    
                }
                else
                {
                    
                }
            })
        }
    },
    getMostRecentEntry: () => {
        return Object.keys(interface.assembly.schedule[Object.keys(interface.assembly.schedule).length-1]).replace('d','')
    },
    incrementDate: (date, days) => {
        return moment(date).add(days, 'days').format('YYYYMMDD');
    },
    decrementDate: (date, days) => {
        return moment(date).subtract(days, 'days').format('YYYYMMDD');
    },
    getMealKeys: (date) => {
        let mealKeys = {
            b:0,
            l:0,
            d:0
        }

        mealKeys.b = `${date}b`;
        mealKeys.l = `${date}l`;
        mealKeys.d = `${date}d`;

        return mealKeys;
    },
    packageReturnObject:() => {
        let returnObj = {
            schedule: interface.assembly.schedule,
            recipeIDs: interface.assembly.recipeIds,
            UserId: interface.assembly.userId
        }

        console.log('\x1b[33m%s\x1b[0m',`New Schedule Added ${JSON.stringify(returnObj)}`)
        
        return returnObj;
    }
}

module.exports = interface;


