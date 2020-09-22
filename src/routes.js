const express = require("express");
const routes = express.Router();
const teachers = require("./app/controllers/teachers");
const students = require("./app/controllers/students");

//redireciona para a rota principal /teachers
routes.get('/', (req, res) => {
  return res.redirect("teachers");
});
//rota de registro
routes.get('/register', (req, res) => {
  return res.render("registration");
});
routes.get('/teachers/register', (req, res) => {
  return res.render("teachers/register");
});
routes.get('/students/register', students.register);

//rota principal /teachers
routes.get('/teachers', teachers.index);
//rota de criação
routes.post('/teachers', teachers.post);
//rota de exibição
routes.get('/teachers/:id', teachers.show);
//rotas de edição
routes.get('/teachers/:id/edit', teachers.edit);
routes.put('/teachers', teachers.put);
//rota para deletar 
routes.delete('/teachers', teachers.delete);

//rota secundaria /students
routes.get('/students', students.index);
//rota de criação
routes.post('/students', students.post);
//rota de exibição
routes.get('/students/:id', students.show);
//rotas de edição
routes.get('/students/:id/edit', students.edit);
routes.put('/students', students.put);
//rota para deletar 
routes.delete('/students', students.delete);

module.exports = routes;
