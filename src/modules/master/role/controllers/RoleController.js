

class RoleController {
    constructor(roleService, formatResponse) {
        this.roleService = roleService;
        this.formatResponse = formatResponse;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllRoles(req, res) {
        try {
            const { page, pageSize, search, order, orderBy } = req.query;
            const roles = await this.roleService.getAllRoles(page, pageSize, search, order, orderBy);
            res.locals.responseBody = JSON.stringify(roles);
            return res.status(200).json(this.formatResponse(roles))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get all Roles', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getRole(req, res) {
        try {
            const { code } = req.params;
            const user = await this.roleService.getRoleById(String(code));
            if (!user) {
                return res.status(400).json(this.formatResponse('', 'Role Not Found', 400))
            }
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get Role', 500))
        }
    }



    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createRole(req, res) {
        try {
            const data = req?.body;

            const role = await this.roleService.checkRoleExists(String(req.params.code));
            if (role) {
                return res.status(400).json(this.formatResponse('', 'Role Already Exist', 400))
            }

            const user = await this.roleService.createRole(data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to create Role', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async updateRole(req, res) {
        try {
            const { code } = req.params;
            const data = req.body;

            const role = await this.roleService.checkRoleExists(String(code));
            if (!role) {
                return res.status(400).json(this.formatResponse('', 'Role Not Found', 400))
            }


            if (code != data?.code) {
                const newRole = await this.roleService.checkRoleExists(String(data?.code));
                if (newRole) {
                    return res.status(400).json(this.formatResponse('', 'Role Already Exist', 400))
                }
            }


            const user = await this.roleService.updateRole(code, data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to Update Role', 500))
        }
    }


    /**
  * 
  * @param {*} req 
  * @param {*} res 
  */
    async deleteRole(req, res) {
        try {
            const { code } = req.params;
            const user = await this.roleService.deleteRole(code);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete Role', 500))

        }
    }
}

module.exports = RoleController;
