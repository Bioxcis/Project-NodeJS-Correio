//Ativar com "node banco.js"

//Ativar o XAMPP
//Abrir no navegador: http://localhost/phpmyadmin/
//Criar um banco com NOME descrito em "new Sequelize("NOME"...).."

const Sequelize = require("sequelize")
const sequelize = new Sequelize("projetoweb", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}