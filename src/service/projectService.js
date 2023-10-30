const projectRepository = require('../responsitory/projectRespository');
class projectService {
    async createNewProject(req, res) {
        try {
            const { group_name, project_code, project_name, description, status_id, manager_id,class_id,team_leader_id,milestone_id } = req.body;
            const query = `insert into Project (group_name,project_code,project_name,description,status_id,manager_id,class_id,team_leader_id,milestone_id,date_create)
            values (?,?,?,?,?,?,?,?,?,?)`;
            const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const value = [ group_name, project_code, project_name, description, status_id, manager_id,class_id,team_leader_id,milestone_id, currentDatetime];
            await projectRepository.createNewProject(query, value);
            return res.status(200).json({ message: "Created Project successfully!" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.toString() });
        }
    }
    async getAllProject(req, res) {
        try {
            const project = await projectRepository.getAllProject();
            return res.status(200).json({
                message:"getAll successfully",
                project: project
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async setStatusProject(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            await projectRepository.setStatusProject(id)
            return res.status(200).json({
                message: "change Status sussessfully!"
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getProject(req, res) {
        try {
            const { id } = req.params;
            const project = await projectRepository.getProject(id);
            return res.status(200).json({
                message:"get one successfully",
                project: project
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateProject(req, res) {
        try {
            console.log("hello");
            const { id } = req.params;
            const { group_name, project_code, project_name, description, manager_id,class_id,team_leader_id} = req.body;
            const query = `
                    UPDATE project 
                    SET group_name=?, project_code=?, project_name=?, description=?, manager_id=?, class_id=?,team_leader_id=?
                    WHERE id=?`;
            const values = [group_name, project_code, project_name, description, manager_id,class_id,team_leader_id, id];
            await projectController.updateProject(query, values);
            return res.status(200).json({ message: "Updated successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

}

module.exports = new projectService();