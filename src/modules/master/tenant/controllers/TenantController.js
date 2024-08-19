

class TenantController {
    constructor(tenantService, formatResponse) {
        this.tenantService = tenantService;
        this.formatResponse = formatResponse;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllTenants(req, res) {
        try {
            const { page, pageSize, search, order, orderBy } = req.query;
            const tenants = await this.tenantService.getAllTenants(page, pageSize, search, order, orderBy);
            res.locals.responseBody = JSON.stringify(tenants);
            return res.status(200).json(this.formatResponse(tenants))
        } catch (error) {
            console.log("🚀 ~ TenantController ~ getAllTenants ~ error:", error)
            return res.status(500).json(this.formatResponse('', 'Failed to get all Tenants', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getTenant(req, res) {
        try {
            const user = await this.tenantService.getTenantById(String(req.params.tenant_code));
            if (!user) {
                return res.status(400).json(this.formatResponse('', 'Tenant Not Found', 400))
            }
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            console.log("🚀 ~ TenantController ~ getTenant ~ error:", error)
            return res.status(500).json(this.formatResponse('', 'Failed to get Tenant', 500))
        }
    }



    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createTenant(req, res) {
        try {
            const data = req?.body;
            const user = await this.tenantService.createTenant(data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to create Tenant', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async updateTenant(req, res) {
        try {
            const { tenant_code } = req.params;
            const data = req.body;
            const user = await this.tenantService.updateTenant(tenant_code, data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to Update Tenant', 500))
        }
    }


    /**
  * 
  * @param {*} req 
  * @param {*} res 
  */
    async deleteTenant(req, res) {
        try {
            const { tenant_code } = req.params;
            const user = await this.tenantService.deleteTenant(tenant_code);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete Tenant', 500))

        }
    }
}

module.exports = TenantController;
