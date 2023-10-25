const userResponsitory = require("../responsitory/userResponsitory");

class userService{
    async getAllManager(req,res) {
        try{
            const managers = await userResponsitory.getManager();
            return res.status(200).json({
                managers
            })
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }
}
module.exports = new userService();