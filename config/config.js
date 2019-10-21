const mode = "production"
if(mode !== "production") {require('dotenv').config();}

module.exports = {
    spoonacular: {
        key: process.env.spoonacular_key,
        host: process.env.spoonacular_host,
        url: process.env.spoonacular_url
    },
    development: {
        username: process.env.cleardb_un,
        password: process.env.cleardb_pw,
        database: process.env.cleardb_name,
        host: process.env.cleardb_host,
        dialect: "mysql"
    },
    test: {
        username: process.env.TestUN,
        password: process.env.TestPW,
        database: "nutritionVADB",
        host: "127.0.0.1",
        port: process.env.TestPort,
        dialect: "mysql",
    },
    production: {
        username: process.env.cleardb_un,
        password: process.env.cleardb_pw,
        database: process.env.cleardb_name,
        host: process.env.cleardb_host,
        dialect: "mysql"
    }
}