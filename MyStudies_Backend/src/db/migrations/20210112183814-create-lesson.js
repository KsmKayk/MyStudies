'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lesson', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      course_id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        references: {model:'course', key:'id'}
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lesson_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Lesson');
  }
};