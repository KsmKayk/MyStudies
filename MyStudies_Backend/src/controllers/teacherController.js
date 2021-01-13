const path = require('path');
const db = require("../db/models")
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = {
  async index(req,res) {
    let teachers = await db.Teacher.findAll();
    res.json(teachers);
  },
  async store(req, res) {
    const {firstName, lastName,birthDate,email,password,cellphone} = req.body;
  }
}