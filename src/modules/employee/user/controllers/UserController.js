const { hashedPassword } = require(process.cwd() + '/src/helper/helper')
const { checkAttrCode } = require(process.cwd() + '/src/helper/checkAttrCodeHelper');

class UserController {
    constructor(userService, tenantService, companyService, divisionService, formatResponse) {
        this.userService = userService;
        this.tenantService = tenantService;
        this.companyService = companyService;
        this.divisionService = divisionService;
        this.formatResponse = formatResponse;
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
            return res.status(200).json(this.formatResponse(users))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get all Employee', 500))
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
                return res.status(400).json(this.formatResponse('', 'User Not Found', 400))
            }

            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get Employee', 500))
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
            
            // await this.checkAttrCode(req, res)
            
            const checkPayload = checkAttrCode(req, res, this.tenantService, this.companyService, this.divisionService);

            checkPayload.then(async (response) => {
                if (!response?.status) return res.status(400).json(this.formatResponse('', response?.message, 400))


                const passwordHash = await hashedPassword(data?.password)
                const payload = {
                    ...data,
                    password: passwordHash, // Simpan password yang telah di-hash
                }
                const user = await this.userService.createUser(payload);
                return res.status(200).json(this.formatResponse(user))

            })

        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to create Employee', 500))
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

            const checkPayload = checkAttrCode(req, res, this.tenantService, this.companyService, this.divisionService);
            checkPayload.then(async (response) => {
                if (!response?.status) return res.status(400).json(this.formatResponse('', response?.message, 400))
           
                const user = await this.userService.updateUser(userId, data);
                return res.status(200).json(this.formatResponse(user))
            })
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to update Employee', 500))
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

            const user = await this.userService.deleteUser(userId);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete Employee', 500))
        }
    }

}

module.exports = UserController;
