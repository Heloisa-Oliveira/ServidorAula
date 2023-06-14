var express = require ("express");
var app = express();
const hostname = '127.0.0.1';
var port = process.env.PORT || 3001; //porta pela qual o servidor se comunica com a gente
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var DBPATH = 'seuBD.db';
var db = new sqlite3.Database(DBPATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
    res.header("Acess-Control-Allow-Origin", "*");
    res.send("Salvei aqui!");
});

app.get("/tudo", function(req,res){ //Read - leitura do CRUD
    res.header("Acess-Control-Aloow-Origin", "*");
    db.all(`SELECT * FROM usuarios`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(rows);
        }

    })
});

app.post("/criarUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var cpf = req.body.cpf;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    sql = `INSERT INTO usuarios (cpf, nome, endereco) VALUES (${cpf}, "${nome}", "${endereco}")`;
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na gravação: " + err);
        }else{
            res.send("Usuário cadastrado!");
        }
    })
});

app.put("/atualizaUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var cpf = req.body.cpf;
    var nome = req.body.nome;
    var endereco = req.body.endereco;
    sql = `UPDATE usuarios SET nome="${nome}", endereco="${endereco}" WHERE cpf=${cpf}`;
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na atualização: " + err);
        }else{
            res.send("Usuário atualizado!");
        }
    })
});

app.listen(port, () =>
{
    // servidor fica ativo escutando a porta definida
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
});
