

class CompanyController {
    constructor(companyService, tenantService) {
        this.companyService = companyService;
        this.tenantService = tenantService;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllCompanies(req, res) {
        try {
            const { page, pageSize, search, order, orderBy } = req.query;
            const company = await this.companyService.getAllCompanies(page, pageSize, search, order, orderBy);
            res.locals.responseBody = JSON.stringify(company);
            res.json(company);
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
    async getCompany(req, res) {
        try {
            const user = await this.companyService.getCompanyById(String(req.params.company_code));
            if (!user) {
                return res.status(404).json({ error: 'Company Not Found' });
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
    async createCompany(req, res) {
        try {
            const data = req?.body;

            // Periksa apakah tenant ada
            const tenant = await this.tenantService.checkTenantExists(data.tenant_code);
            if (!tenant) {
                return res.status(400).json({ error: 'Invalid Tenant Code' });
            }
            
            const user = await this.companyService.createCompany(data);
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
    async updateCompany(req, res) {
        try {
            const { company_code } = req.params;
            const data = req.body;

            // Periksa apakah tenant ada
            const tenant = await this.tenantService.checkTenantExists(data.tenant_code);
            if (!tenant) {
                return res.status(400).json({ error: 'Invalid Tenant Code' });
            }

            // Periksa apakah tenant ada
            const company = await this.companyService.checkCompanyExists(company_code);
            if (!company) {
                return res.status(400).json({ error: 'Invalid Company Code' });
            }
            
            const user = await this.companyService.updateCompany(company_code, data);
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
    async deleteCompany(req, res) {
        try {
            const { company_code } = req.params;

            // Periksa apakah tenant ada
            const company = await this.companyService.checkCompanyExists(company_code);
            if (!company) {
                return res.status(400).json({ error: 'Invalid Company Code' });
            }

            const user = await this.companyService.deleteCompany(company_code);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Employee' });
        }
    }
}

module.exports = CompanyController;
