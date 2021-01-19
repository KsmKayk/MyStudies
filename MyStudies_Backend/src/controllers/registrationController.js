const db = require("../db/models")

module.exports = {
  async index(req,res) {
    let registrarions = await db.Registration.findAll();
    res.json(registrarions);
  },
  async store(req,res) {
    const {courseId} = req.body 
    const studentId = req.student.student_id

    let course = await db.Course.findOne({where: {id:courseId}})
    if(!course) {
      res.status(400).json({error:"can't find this course"}) 
    }
    let registration = await db.Registration.findOne({where: {courseId,studentId}})
    if(!registration) {
      let resultInsert = await db.Registration.create({courseId,studentId})
      res.status(200).json({resultInsert})
    }

    res.json({error: "this user has already registered in this course", registration})
    
  },
  async delete(req, res) {
    const {id} = req.params
    const studentId = req.student.student_id

    let registration = await db.Registration.findOne({where: {id}})
    if(!registration) {
      res.json({error: "cant find registration"})
    }

    if(studentId == registration.studentId) {
      const resultDelete = await db.Registration.destroy({where: {id}})
      res.json(resultDelete)
    }

   
    res.status(401).json({error: "you don't have permission to delete registration"})
  }
}