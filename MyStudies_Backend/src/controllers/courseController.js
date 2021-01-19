const db = require("../db/models")

module.exports = {
  async index(req,res) {
    let courses = await db.Course.findAll();
    res.json(courses);
  },
  async store(req, res) {
    const {name} = req.body;
    const teacher_id = req.teacher.teacher_id

    let course = await db.Course.findOne({where: {name, teacherId: teacher_id}});
    if(!course) {
      const resultInsert = await db.Course.create({name, teacherId: teacher_id})
      res.status(201).json(resultInsert)
    }

    res.status(409).json({error: "this course is already registered", course})

  },
  async update(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    const teacher_id = req.teacher.teacher_id

    let course = await db.Course.findOne({where: {id}})
    if(!course) {
      res.status(400).json({error: "can't find this course"})
    }

    if(teacher_id == course.teacherId) {
      const data = {name, teacherId: teacher_id}
      const resultUpdate = await db.Course.update(data, {where: {id}})
      res.status(200).json({resultUpdate, data})
    }

    res.status(400).json({error: "you don't have permission to update this course"})
  },
  async delete(req, res) {
    const {id} = req.params
    const teacher_id = req.teacher.teacher_id 
    let course = await db.Course.findOne({where: {id}})
    if(!course) {
      res.status(400).json({error: "can't find this course"})
    }

    if(teacher_id == course.teacherId) {
      const resultDelete = await db.Course.destroy({where: {id}})
      res.status(200).json({resultDelete})
    }

    res.status(400).json({error: "you don't have permission to delete this course"})

  }
}