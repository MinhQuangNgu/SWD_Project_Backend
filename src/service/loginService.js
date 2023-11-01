const loginResponsitory = require('../responsitory/loginResponsitory');
class loginService {
    async createNewAccount(req, res) {
        try {
            const { username, email, password, phone } = req.body;

            const query = `insert into account (username,email,password,role_id,phone_number,date_create)
            values (?,?,?,?,?,?)`;
            const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const value = [username, email, password, 1, phone, currentDatetime];
            await loginResponsitory.createNewAccount(query, value);
            return res.status(200).json({ message: "Created account successfully!" });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.toString() });
        }
    }

    async getAccount(req, res) {
        try {
            const { email, password } = req.params;
            const account = await loginResponsitory.getAccount(email, password);
            return res.status(200).json({
                account: account
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.toString() });
        }
    }

}

module.exports = new loginService();