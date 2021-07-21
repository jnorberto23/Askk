const sequelize = require("sequelize");

const connection = new sequelize("guiaPerguntas", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection; 

