const classResponsitory = require("../responsitory/classResponsitory");

class classService {
  async getClass(req, res) {
    try {
      const classes = await classResponsitory.getClass(req);
      return res.status(200).json({
        classes,
        size: classes[0]?.size??0,
        page: +req.query?.page || 1,
      });
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
    }
  }
  async addClass(req, res) {
    try {
      const { student = [] ,manager} = req.body;
      const managers = await classResponsitory.addClass(req);
      const result =await classResponsitory.addManagerClass( managers.insertId,
        manager)
      
      for (let i = 0; i < student.length; i++) {
        await classResponsitory.addStudentClass(
          managers.insertId,
          student[i]
        );
      }
      return res.status(200).json({
        message: "Create successfully!",
      });
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
    }
  }
  async getDetailClass(req, res) {
    const { id } = req.params;
    try {
      const general = await classResponsitory.getClassById(id);
      const student = await classResponsitory.getStudentByIdClass(id);
      const milestone = await classResponsitory.getMileStoneByIdClass(id);
      const issuesetting = await classResponsitory.getIssueSettingByIdClass(id);
      return res.status(200).json({
        general: general[0],
        student,
        milestone: milestone[0],
        issuesetting,
      });
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
    }
  }
  async updateStatusClass(req,res){
    const { id } = req.params;
    try {
      const result = await classResponsitory.getClassById(id);
      await classResponsitory.updateStatusClass(id, result[0]?.status === 1 ? false : true);
      return res.status(200).json({ message: "Change status successfully" });
    } catch (e) {
      return res.status(500).json({ message: err.toString() });
      
    }
  }
  async updateClass(req,res){
    const {id}=req.params;
    const {student=[],manager } = req.body; 
    const students=[...student,manager]
    try {
      const result = await classResponsitory.updateClass(req);
      await classResponsitory.deleteByIdclass(req)
    
      for (let i = 0; i < students.length; i++) {
        await classResponsitory.addManagerClass(
         id,students[i]
        );
      }
      return res.status(200).json({
        message: "Update successfully!",
      });
     
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
      
    }
  }
}
module.exports = new classService();
