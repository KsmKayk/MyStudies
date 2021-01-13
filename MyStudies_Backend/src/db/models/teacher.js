'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Teacher.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    cellphone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
    underscored: true,
    tableName: 'teacher'
  });
  return Teacher;
};