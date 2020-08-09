//installations des modules
const express = require('express');
const app = express();
const session = require('cookie-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

//1 Création d'un session
app.use(session({
    secret: 'topsecrettodolist',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
}))
    //2 Création du middleware dans le cas d'un liste vide
    .use(function (req, res, next) {
        if (typeof(req.session.todolist) == 'undefined') {
            req.session.todolist = [];
        }
        next();
    })

    //3 Création des 4 routes : route 1 : '/todo' , route 2 : '/todo/ajouter/' , route 3 : '/todo/supprimer/:id', route 4: '/todo/

    /*Création de la première route*/
    .get('/todo', function(req, res) {
        res.render('todo.ejs', { todolist: req.session.todolist });
    })

    /*Création de la deuxième route*/
    //Ajouter un élément de la route
    .post('/todo/ajouter/', urlencodedParser, function(req, res) {
        if (req.body.newtodo != '') {
            req.session.todolist.push(req.body.newtodo);
    //le log donne un nombre
            console.log(req.session.todolist.push()); 
        }
        res.redirect('/todo');
    })

    /*Création de la troisième route*/
    //Supprimer un élément de la route
    .get('/todo/supprimer/:id', function (req, res) {
        if (req.params.id != '') {
        console.log(req.params.id)
            req.session.todolist.splice(req.params.id, 1);
        }
        res.redirect('/todo');
    })

    //On redirige vers la page /todo si la page demandée n'a pas été trouvée
    .use(function (req, res, next){
        res.redirect('/todo');
    })


    .listen(8082);