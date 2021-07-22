const sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("Resposta", {
    corpo:{
        type: sequelize.STRING,
        allowNull: false
    },
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(()=>{
    console.log("Tabela respostas criada");
});

module.exports = Resposta;