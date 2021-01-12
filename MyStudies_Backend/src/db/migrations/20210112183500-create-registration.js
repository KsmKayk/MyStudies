'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      student_id: {
        type: Sequelize.BIGINT(20),
        references: {model: "student", key: "id"},
        allowNull: false,
      },
      course_id: {
        type: Sequelize.BIGINT(20),
        references: {model: "course", key: "id"},
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Registration');
  }
};