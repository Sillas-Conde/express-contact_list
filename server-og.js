// Express é microframework para aplicações web

const express = require('express');
const app = express();
//CRUD CREATE/READ/UPDATE/DELETE
//     GET   /POST/PUT   /DELETE
//Rotas

app.use(express.urlencoded({ extended: true }));

app.get('/',(req, res) => {

    res.send('Never gonna give you up!!');
    console.log('Página executada');
});

app.get('/contato',(req, res) => {

    res.send(
        '<h1>Never gonna let you down</h1><br>' + 
        '<form action="/" method="POST">Nome: <input type="text" name="nome"> <button>Send</button></form>'
    );
    console.log('Página executada');
});

app.get('/test/:ID?/:SID?',(req, res) => {
    // http://localhost:3000/test/12/23/?nome=Sillas&sobrenome=Conde&idade=77
    console.log(req.params);
    console.log(req.query);
    res.send(
        `<h1>Seu ID é: ${req.params.ID}</h1>` +
        `<h1>Seu SID é: ${req.params.SID}</h1>` + 
        `<h1>Seu Nome é: ${req.query.nome}</h1>`
    );
});

app.post('/',(req, res) => {
    console.log(req.body);
    res.send(
        '<h1>Never gonna run around and </h1><br>' + 
        `Seu nome é: ${req.body.nome}`
    );
});

app.listen(3000);
console.log('Servidor executado na port 3000');

