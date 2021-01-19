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
    let students = await db.Student.findAll();
    res.json(students);
  },
  async store(req, res) {
    const {firstName, lastName,birthDate,email,password,cellphone} = req.body;

    let student = await db.Student.findOne({where:{email}})
    if(!student) {
      let birthDateToFormat = moment(birthDate, "DD-MM-YYYY")
      let birthDateFormated = birthDateToFormat.format("YYYY-MM-DD")

      let passwordHash = await bcrypt.hash(password, 10)
      const resultInsert = await db.Student.create({firstName,lastName,birthDate: birthDateFormated,email,passwordHash,cellphone})
      res.status(201).json(resultInsert)
    }

    res.status(409).json({error: "this email is already registered", student})
  },
  async update(req, res) {
    const {id} = req.params
    const student_id = req.student.student_id
    if(id == student_id) {
      const {firstName, lastName,birthDate,email,password,cellphone} = req.body;

      let birthDateToFormat = moment(birthDate, "DD-MM-YYYY")
      let birthDateFormated = birthDateToFormat.format("YYYY-MM-DD")

      let passwordHash = await bcrypt.hash(password, 10)

      const data = {firstName,lastName,birthDate: birthDateFormated,email,passwordHash,cellphone}
      const resultUpdate = await db.Student.update(data, {where: {id}})
      res.status(200).json({resultUpdate, data})
    }
    else {
      return res.status(401).json({error: "You don't have permission to edit this user"})
    }
    
  },
  async delete(req, res) {
    const {id} = req.params
    const student_id = req.student.student_id

    if(id == student_id) {
      const resultDelete = await db.Student.destroy({where: {id}})
      res.status(200).json({resultDelete})
    }
    else {
      return res.status(401).json({error: "You don't have permission to delete this user"})
    }
  },
  async login(req, res) {
    const {email, password} = req.body
    let student = await db.Student.findOne({where:{email}})

    if(!student) {
      return res.status(401).json({ error: "Authentication fail"})
    }

    bcrypt.compare(password, student.passwordHash,(err, result) => {
      if(err) {
        return res.status(401).json({ error: "Authentication fail"})
      }

      if(result) {
        const token = jwt.sign({
          student: student.id,
          name: student.name,
          email: student.email,
        }, jwt_secret, {
          expiresIn: "6h"
        })
        return res.status(200).json({ message: "Authentication successful", token: token, student_id: student.id });
      }

      return res.status(401).json({ error: "Wrong password or email"})
    })
    
  }
}