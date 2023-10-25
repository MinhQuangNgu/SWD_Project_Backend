const issueSettingsResponsitory = require("../responsitory/issueSettingsResponsitory");
const subjectResponsitory = require('../responsitory/subjectResponsitory');
class subjectService {
    async createNewSubject(req, res) {
        try {
            const { name, code, description, manager_id, gitlab_config, status } = req.body;
            const query = `insert into subject (name,code,description,manager_id,status_id,gitlab_config,date_create)
            values (?,?,?,?,?,?,?)`;
            const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const value = [name, code, description, manager_id, status, gitlab_config, currentDatetime];
            await subjectResponsitory.createNewSubject(query, value);
            return res.status(200).json({ message: "Created subject successfully!" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getAllSubject(req, res) {
        try {
            const results = await subjectResponsitory.getAllSubjects();
            return res.status(200).json({
                subjects: results
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async deleteSubject(req, res) {
        try {
            const { id } = req.params;
            await issueSettingsResponsitory.deleteMultipleIssues(id);
            await subjectResponsitory.deleteSubject(id);
            return res.status(200).json({
                message: "Deleted sussessfully!"
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getSubject(req, res) {
        try {
            const { id } = req.params;
            const subject = await subjectResponsitory.getSubject(id);
            const issueSettings = await issueSettingsResponsitory.getIssuesSettings(id);
            return res.status(200).json({
                subject: subject,
                issueSettings: issueSettings
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateSubject(req, res) {
        try {
            const { id } = req.params;
            await issueSettingsResponsitory.deleteMultipleIssues(id);
            const { name, code, description, manager_id, gitlab_config, status, labels } = req.body;
            const query = `
                    UPDATE subject 
                    SET name=?, code=?, description=?, manager_id=?, status_id=?, gitlab_config=?
                    WHERE id=?`;
            const values = [name, code, description, manager_id, status, gitlab_config, id];
            await subjectResponsitory.updateSubject(query, values);
            const newQuery = 'insert into issue_setting (name,description,color,type,subject_id) values ?';
            let newValue = [];
            if (labels.length > 0) {
                labels?.forEach(item => {
                    const newItem = [item?.name, item?.description, item?.color, "LABELS",id];
                    newValue.push(newItem);
                });
                await issueSettingsResponsitory.createMutipleIssues(newQuery, newValue);
            }

            return res.status(200).json({ message: "Updated successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async changeStatusSubject(req, res) {
        try {
            const { id } = req.params;
            const result = await subjectResponsitory.getSubject(id);
            await subjectResponsitory.updateSubjectStatus(result[0]?.id, result[0].status_id === 1 ? 2 : 1);
            return res.status(200).json({ message: "Change status successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

}

module.exports = new subjectService();