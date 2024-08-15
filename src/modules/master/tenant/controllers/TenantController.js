

class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
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
            res.json(tenants);
        } catch (error) {
            console.log("🚀 ~ TenantController ~ getTenants ~ error:", error)
            res.status(500).json({ error: 'Failed to get all Employee' });
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
                return res.status(404).json({ error: 'Tenant Not Found' });
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
    async createTenant(req, res) {
        try {
            const data = req?.body;
            const user = await this.tenantService.createTenant(data);
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
    async updateTenant(req, res) {
        try {
            const { tenant_code } = req.params;
            const data = req.body;
            const user = await this.tenantService.updateTenant(tenant_code, data);
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
    async deleteTenant(req, res) {
        try {
            const { tenant_code } = req.params;
            const user = await this.tenantService.deleteTenant(tenant_code);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Employee' });
        }
    }
}

module.exports = TenantController;
