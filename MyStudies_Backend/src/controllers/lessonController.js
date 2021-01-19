const db = require("../db/models")

module.exports = {
  async index(req,res) {
    let lessons = await db.Lesson.findAll()
    res.json(lessons)
  },

  async store(req,res) {
    const {courseId, name, lessonNumber, link} = req.body
    const teacherId = req.teacher.teacher_id 

    let course = await db.Course.findOne({where: {id: courseId}})
    if(!course) {
      res.json({error: "can't find Course"})
    }

    if(teacherId == course.teacherId) {
      let resultInsert = await db.Lesson.create({courseId,name,lessonNumber,link}) 
      res.json(resultInsert)
    }

    res.json({error:"you dont have permission to add lessons to this course"})
  },
  async update(req,res) {
    const {id} = req.params
    const {courseId, name, lessonNumber, link} = req.body
    const teacherId = req.teacher.teacher_id

    let lesson = await db.Lesson.findOne({where: {id}})
    if(!lesson) {
      res.json({error: "cant find lesson"})
    }

    let course = await db.Course.findOne({where: {id: courseId}})
    if(!course) {
      res.json({error: "can't find Course"})
    }

    if(teacherId == course.teacherId) {
      let data = {courseId, name, lessonNumber, link}
      let resultUpdate = await db.Lesson.update(data, {where: {id}})
      res.json({resultUpdate,data})
    }

    res.json({error:"you dont have permission to edit lessons from this course"})
  },

  async delete(req, res) {
    const {id} = req.params
    const teacherId = req.teacher.teacher_id

    let lesson = await db.Lesson.findOne({where: {id}})
    if(!lesson) {
      res.json({error:"cant find lesson"})
    }

    let course = await db.Course.findOne({where: {id:lesson.courseId}})
    if(teacherId == course.teacherId) {
      const resultDelete = await db.Lesson.destroy({where: {id}})
      res.json(resultDelete)
    }

    res.json({error: "you dont have permission to delete this lesson"})
  }
}