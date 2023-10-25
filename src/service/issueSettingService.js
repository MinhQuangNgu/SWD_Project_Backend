const issueSettingsResponsitory = require("../responsitory/issueSettingsResponsitory");

class issueSettingService{
    async getAllIssueSetting(req,res){
        try{
            const issuesSettings = await issueSettingsResponsitory.getAllIssueSettings();
            return res.status(200).json({
                issuesSettings
            })
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateIssueSetting(req,res){
        try{
            const {name,description,color} = req.body;
            const {id} = req.params;
            await issueSettingsResponsitory.updateIssueSetting(id,{
                name,description,color
            });
            return res.status(200).json({
                message:"Update successfully!"
            })
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }
    async deleteIssueSettings(req,res){
        try{
            const {id} = req.params;
            await issueSettingsResponsitory.deleteIssueSettings(id);
            return res.status(200).json({
                message:"Delete successfully!"
            })
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }
}

module.exports = new issueSettingService();