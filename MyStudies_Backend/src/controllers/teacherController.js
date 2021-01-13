const path = require('path');
const db = require("../db/models")
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = {
  async index(req,res) {
    let teachers = await db.Teacher.findAll();
    res.json(teachers);
  }
}