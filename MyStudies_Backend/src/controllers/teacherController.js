const path = require('path');
const db = require("../db/models")
const { Op } = require("sequelize");
const moment = require('moment');
const bcrypt = require("bcrypt");

module.exports = {
  async index(req,res) {
    let teachers = await db.Teacher.findAll();
    res.json(teachers);
  },
  async store(req, res) {
    const {firstName, lastName,birthDate,email,password,cellphone} = req.body;

    let teacher = await db.Teacher.findOne({where:{email}})
    if(!teacher) {
      let birthDateToFormat = moment(birthDate, "DD-MM-YYYY")
      let birthDateFormated = birthDateToFormat.format("YYYY-MM-DD")

      let passwordHash = await bcrypt.hash(password, 10)
      const resultInsert = await db.Teacher.create({firstName,lastName,birthDate: birthDateFormated,email,passwordHash,cellphone})
      res.status(201).json(resultInsert)
    }

    res.status(409).json({error: "this email is already registered", teacher})
  },
  async update(req, res) {
    const {id} = req.params
    const {firstName, lastName,birthDate,email,password,cellphone} = req.body;

    let birthDateToFormat = moment(birthDate, "DD-MM-YYYY")
    let birthDateFormated = birthDateToFormat.format("YYYY-MM-DD")

    let passwordHash = await bcrypt.hash(password, 10)

    const data = {firstName,lastName,birthDate: birthDateFormated,email,passwordHash,cellphone}
    const resultUpdate = await db.Teacher.update(data, {where: {id}})
    res.status(200).json({resultUpdate, data})
  },
  async delete(req, res) {
    const {id} = req.params
    const resultDelete = await db.Teacher.destroy({where: {id}})
    res.status(200).json({resultDelete})
  }
}