'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username:{ type: 
        Sequelize.STRING
      },
        password:{ 
          type: Sequelize.STRING
        },
       name_first:{
         type: Sequelize.STRING,
       },
             name_last: {
               type: Sequelize.STRING,
             },
      phone: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};