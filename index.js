const express = require("express");
const app = express();
const bodyParser = require("body-parser")

// Estou carregando o objeto de conexao
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

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPergunta", (req, res) => {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    res.send("Formulario recebido. Titulo: " + titulo + ". Descrição:" + descricao);
})

app.listen(8080, () => {
    console.log("rodando...");
});