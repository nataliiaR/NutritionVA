'use strict';
module.exports = class UserProfile
{
    constructor(obj){
        this.user = obj.user,
        this.userCredentials = obj.userCredentials,
        this.userMetrics = obj.userMetrics,
        this.userSchedule = obj.userSchedule,
        this.dietConfig = obj.dietConfig
    }
}