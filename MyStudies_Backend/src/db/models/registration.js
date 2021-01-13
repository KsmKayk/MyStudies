'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Registration.init({
    studentId: DataTypes.BIGINT,
    courseId: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Registration',
    underscored: true,
    tableName: 'registration'
  });
  return Registration;
};