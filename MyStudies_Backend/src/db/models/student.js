'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATEONLY,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    cellphone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
    underscored: true,
  });
  return Student;
};