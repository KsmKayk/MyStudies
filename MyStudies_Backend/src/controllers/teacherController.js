const path = require('path');
const db = require("../db/models")
const { Op } = require("sequelize");
const moment = require('moment');
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require('dotenv').config()
const jwt_secret = process.env.JWT_SECRET;

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
    const teacher_id = req.teacher.teacher_id
    if(id == teacher_id) {
      const {firstName, lastName,birthDate,email,password,cellphone} = req.body;

      let birthDateToFormat = moment(birthDate, "DD-MM-YYYY")
      let birthDateFormated = birthDateToFormat.format("YYYY-MM-DD")

      let passwordHash = await bcrypt.hash(password, 10)

      const data = {firstName,lastName,birthDate: birthDateFormated,email,passwordHash,cellphone}
      const resultUpdate = await db.Teacher.update(data, {where: {id}})
      res.status(200).json({resultUpdate, data})
    } 
    else {
      return res.status(401).json({error: "You don't have permission to edit this user"})
    }
    
  },
  async delete(req, res) {
    const {id} = req.params
    const teacher_id = req.teacher.teacher_id

    if(id == teacher_id) {
      const resultDelete = await db.Teacher.destroy({where: {id}})
      res.status(200).json({resultDelete})
    }
    else {
      return res.status(401).json({error: "You don't have permission to delete this user"})
    }
  },

  async login(req, res) {
    const {email, password} = req.body
    let teacher = await db.Teacher.findOne({where:{email}})

    if(!teacher) {
      return res.status(401).json({ error: "Authentication fail"})
    }

    bcrypt.compare(password, teacher.passwordHash,(err, result) => {
      if(err) {
        return res.status(401).json({ error: "Authentication fail"})
      }

      if(result) {
        const token = jwt.sign({
          teacher_id: teacher.id,
          name: teacher.name,
          email: teacher.email,
        }, jwt_secret, {
          expiresIn: "6h"
        })
        return res.status(200).json({ message: "Authentication successful", token: token, teacher_id: teacher.id });
      }

      return res.status(401).json({ error: "Wrong password or email"})
    })
    
  }
}