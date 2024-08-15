const { hashedPassword } = require(process.cwd() + '/src/helper/helper')

class UserController {
    constructor(userService, tenantService, companyService, divisionService) {
        this.userService = userService;
        this.tenantService = tenantService;
        this.companyService = companyService;
        this.divisionService = divisionService;
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
            console.log("🚀 ~ UserController ~ getUsers ~ error:", error)
            res.status(500).json({ error: 'Failed to get all Employeeee' });
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
            const userId = parseInt(req.params.user_id);
            const user = await this.userService.getUserById(userId);
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
            
            await this.checkAttrCode(req, res)

            const passwordHash = await hashedPassword(data?.password)
            const payload =  {
                ...data,
                password: passwordHash, // Simpan password yang telah di-hash
            }
            const user = await this.userService.createUser(payload);
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
            const userId = parseInt(req.params.user_id);
            const data = req.body;

            await this.checkAttrCode(req, res)

            const user = await this.userService.updateUser(userId, data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update User' });
        }
    }


    /**
  * 
  * @param {*} req 
  * @param {*} res 
  */
    async deleteUser(req, res) {
        try {
            const userId = parseInt(req.params.user_id);

            await this.checkAttrCode(req, res)

            const user = await this.userService.deleteUser(userId);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Employee' });
        }
    }


    async checkAttrCode(req, res) {
        const data = req.body
        // Periksa apakah tenant ada
        const tenant = await this.tenantService.checkTenantExists(data.tenant_code);
        if (!tenant) {
            return res.status(400).json({ error: 'Invalid Tenant Code' });
        }

        // Periksa apakah company ada
        const company = await this.companyService.checkCompanyExists(data.company_code);
        if (!company) {
            return res.status(400).json({ error: 'Invalid Company Code' });
        }

        // Periksa apakah division ada
        const division = await this.divisionService.checkDivisionExists(data.division_code);
        if (!division) {
            return res.status(400).json({ error: 'Invalid Division Code' });
        }
        
        return true
    }
}

module.exports = UserController;
