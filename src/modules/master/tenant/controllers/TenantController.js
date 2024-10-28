

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
            const tenant = await this.tenantService.getTenantById(String(req.params.tenant_code));
            if (!tenant) {
                return res.status(400).json(this.formatResponse('', 'Tenant Not Found', 400))
            }
            return res.status(200).json(this.formatResponse(tenant))
        } catch (error) {
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

            const tenant = await this.tenantService.checkTenantExists(String(req.body.tenant_code));
            if (tenant) {
                return res.status(400).json(this.formatResponse('', 'Tenant Already Exist', 400))
            }

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

            const tenant = await this.tenantService.checkTenantExists(String(tenant_code));
            if (!tenant) {
                return res.status(400).json(this.formatResponse('', 'Tenant Not Found', 400))
            }


            if (tenant_code != data?.tenant_code) {
                const checkTenant = await this.tenantService.checkTenantExists(String(data?.tenant_code));
                if (checkTenant) {
                    return res.status(400).json(this.formatResponse('', 'Tenant Already Exist', 400))
                }
            }

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
