const settingResponsitory = require('../responsitory/settingResponsitory');
class settingService {
    async createNewSetting(req, res) {
        try {
            const { name, role, type, display_order, status, domain } = req.body;
            const query = `insert into system_setting (name,role,type,display_order,status,domain)
            values (?,?,?,?,?,?)`;
            const value = [name, role, type, display_order, status, domain];
            await settingResponsitory.createNewSetting(query, value);
            return res.status(200).json({ message: "Created setting successfully!" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getAllSettings(req, res) {
        try {
            const results = await settingResponsitory.getAllSettings();
            return res.status(200).json({
                subjects: results
            });
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ message: err.toString() });
        }
    }

    async deleteSetting(req, res) {
        try {
            const { id } = req.params;
            await settingResponsitory.deleteSetting(id);
            return res.status(200).json({
                message: "Deleted sussessfully!"
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getSetting(req, res) {
        try {
            const { id } = req.params;
            const setting = await settingResponsitory.getSetting(id);
            return res.status(200).json({
                setting: setting
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async updateSetting(req, res) {
        try {
            const { id } = req.params;
            const { name, role, type, display_order, status, domain } = req.body;
            const query = `
                    UPDATE system_setting 
                    SET name=?, role=?, type=?, display_order=?, status=?, domain=?
                    WHERE id=?`;
            const values = [name, role, type, display_order, status, domain, id];
            await settingResponsitory.updateSetting(query, values);

            return res.status(200).json({ message: "Updated successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

    async changeStatusSetting(req, res) {
        try {
            const { id } = req.params;
            const result = await settingResponsitory.getSetting(id);
            await settingResponsitory.updateSettingStatus(result[0]?.id, result[0].status === 1 ? false : true);
            return res.status(200).json({ message: "Change status successfully" });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

}

module.exports = new settingService();