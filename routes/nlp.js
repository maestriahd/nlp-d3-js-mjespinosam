// importa librerias necesarias
const express = require('express');
const router = express.Router();
// libreria de procesamiento de lenguaje natural
const nlp = require('compromise');
// textos de prueba
const corpus = require('nlp-corpus');

const fs = require ('fs');
/* GET home page. */
router.get('/', function(req, res) {
  // obtiene un texto aleatorio de discursos presidenciales
  //var txt = corpus.sotu.random();
  //var txt = corpus.flowers.random();
  var txt = fs.readFileSync (__dirname+'/intelligenceofflowers.txt', 'utf8' )



  // entrega el texto al motor de NLP
  var r = nlp(txt);
  // extrae las personas del texto
  var people = r.people();
  // limpia un poco el texto
  people.normalize();
  // ordena el resultado por frecuencia
  people.sort('frequency').unique();

  // extrae los sustantivos
  var nouns = r.nouns();
  nouns.unique();

//var adjectives = r.adjectives ();
  // hace el render de la vista entregando el texto, la lista de personas
  // y sustantivos
  console.log (nouns.out ('array'));

    res.render('nlp', {
    txt: txt,
    people: {
      list: people.out ('array'),
      length: people.list.length
    },
    nouns: {
      list: nouns.out ('array'),
      length: nouns.list.length
    }
    //adjectives: {
      //list: adjectives.out ('array'),
      //length: adjectives.list.length
    //}
    });
});

module.exports = router;
