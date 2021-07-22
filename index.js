const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Carregando o objeto de conexao
const connection = require("./database/database");

// Promisse para conexão
connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita com sucesso");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Setando o Express para usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {

    Pergunta.findAll({
        raw: true,
        order: [
            ["id", "desc"]
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req ,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC'] 
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        }else{ // Não encontrada
            res.redirect("/");
        }
    });
})
app.post("/responder",(req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080, () => {
    console.log("rodando...");
});