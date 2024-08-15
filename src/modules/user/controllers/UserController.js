

class UserController {
    constructor(userService) {
        this.userService = userService;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getUsers(req, res) {
        try {
            const { page, pageSize, search, order, orderBy } = req.query;
            const users = await this.userService.getAllUsers(page, pageSize, search, order, orderBy);
            res.locals.responseBody = JSON.stringify(users);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all Employee' });
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getUser(req, res) {
        try {
            const user = await this.userService.getUserById(String(req.params.EmployeeCode));
            if (!user) {
                return res.status(404).json({ error: 'User Not Found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get Employee' });
        }
    }



    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createUser(req, res) {
        try {
            const data = req?.body;
            const user = await this.userService.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create Employee' });
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async updateUser(req, res) {
        try {
            const { EmployeeCode } = req.params;
            const data = req.body;
            const user = await this.userService.updateUser(EmployeeCode, data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update Employee' });
        }
    }


    /**
  * 
  * @param {*} req 
  * @param {*} res 
  */
    async deleteUser(req, res) {
        try {
            const { EmployeeCode } = req.params;
            const user = await this.userService.deleteUser(EmployeeCode);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Employee' });
        }
    }
}

module.exports = UserController;
