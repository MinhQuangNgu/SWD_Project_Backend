const milestoneResponsitory = require("../responsitory/milestoneRespository");

class milestone {
  async getList(req, res) {
    try {
      const milestone = await milestoneResponsitory.getList();
      return res.status(200).json({
        milestone,
      });
    } catch (err) {
      return res.status(500).json({ message: err.toString() });
    }
  }
}
module.exports = new milestone();
