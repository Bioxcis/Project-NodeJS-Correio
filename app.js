//Ativar o XAMPP
//Abrir no navegador: http://localhost/phpmyadmin/
//Site: localhost:8081
//ativar arquivo com "node app.js"

const express = require('express')
const app = express()
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const Correios = require('node-correios');
const correios = new Correios();

const serviceAccount = require('./proj-web-cloud-firebase-adminsdk-iwy9z-ea2deb7738.json')

initializeApp({
    credential: cert(serviceAccount)
});
const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(8081, function(){
    //Mensagem de aviso
    console.log("Servidor Ativo!")
})

//Caminho padrão da página
app.get("/", function(req,res){
    res.render("home");
})

app.post("/cadastrar", function(req, res){
    // Colete os dados do corpo da solicitação
    correios.consultaCEP({ cep: req.body.cep })
    .then(result => {
        db.collection('cadastros').add({
            cep: req.body.cep,
            result
        }).then(function(){
            console.log('Registro adicionado');
        })
        res.render("home", {result});
        console.log(result);
    })
    .catch(error => {
        console.log(error);
        res.render("home", {error});
    });
})
