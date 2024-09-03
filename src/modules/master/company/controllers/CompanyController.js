

class CompanyController {
    constructor(companyService, tenantService, formatResponse) {
        this.companyService = companyService;
        this.tenantService = tenantService;
        this.formatResponse = formatResponse;
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
            return res.status(200).json(this.formatResponse(company))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get all Company', 500))
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
                return res.status(400).json(this.formatResponse('', 'Company Not Found', 400))
            }

            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get Company', 500))
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
                return res.status(400).json(this.formatResponse('', 'Invalid Tenant Coded', 400))
            }
            
            const user = await this.companyService.createCompany(data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to create Company', 500))
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
                return res.status(400).json(this.formatResponse('', 'Invalid Tenant Code', 400))
            }

            // Periksa apakah tenant ada
            const company = await this.companyService.checkCompanyExists(company_code);
            if (!company) {
                return res.status(400).json(this.formatResponse('', 'Invalid Company Code', 400))
            }
            
            const user = await this.companyService.updateCompany(company_code, data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to Update Company', 500))
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
                return res.status(400).json(this.formatResponse('', 'Invalid Company Code', 400))
            }

            const user = await this.companyService.deleteCompany(company_code);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete Company', 500))
        }
    }
}

module.exports = CompanyController;
