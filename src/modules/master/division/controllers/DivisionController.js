

class DivisionController {
    constructor(divisionService, companyService, formatResponse) {
        this.divisionService = divisionService;
        this.companyService = companyService;
        this.formatResponse = formatResponse;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllDivisions(req, res) {
        try {
            const { data: {company_code} } = req.user
            const { page, pageSize, search, order, orderBy } = req.query;
            const company = await this.divisionService.getAllDivisions(page, pageSize, search, order, orderBy, company_code);
            res.locals.responseBody = JSON.stringify(company);
            return res.status(200).json(this.formatResponse(company))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get all Division', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async getDivision(req, res) {
        try {
            const { data: { company_code } } = req.user
            const data = await this.divisionService.getDivisionById(String(req.params.division_code), company_code);
            if (!data) {
                return res.status(400).json(this.formatResponse('', 'Division Not Found', 400))
            }

            return res.status(200).json(this.formatResponse(data))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to get Division', 500))
        }
    }



    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createDivision(req, res) {
        try {
            const data = req?.body;
            const { data: { company_code } } = req.user

            const company = await this.companyService.checkCompanyExists(data.company_code);
            if (!company) {
                return res.status(400).json(this.formatResponse('', 'Invalid Company Code', 400))
            }


            const division = await this.divisionService.checkDivisionExists(data.division_code, company_code);
            if (division) {
                return res.status(400).json(this.formatResponse('', 'Division Already Exist', 400))
            }
            
            const user = await this.divisionService.createDivision(data);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to create Division', 500))
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async updateDivision(req, res) {
        try {
            const { data: { company_code } } = req.user
            const { division_code } = req.params;
            const data = req.body;

            // Periksa apakah tenant ada
            const company = await this.companyService.checkCompanyExists(data.company_code);
            if (!company) {
                return res.status(400).json(this.formatResponse('', 'Invalid Company Code', 400))
            }

            // Periksa apakah tenant ada
            const division = await this.divisionService.checkDivisionExists(division_code);
            if (!division) {
                return res.status(400).json(this.formatResponse('', 'Invalid Division Code', 400))
            }


            if (division_code != data?.division_code ) {
                const checkDivision = await this.divisionService.checkDivisionExists(data?.division_code);
                if (checkDivision) {
                    return res.status(400).json(this.formatResponse('', 'Invalid Already Exist', 400))
                }
            }
            
            const user = await this.divisionService.updateDivision(division_code, data, company_code);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to update Employee', 500))
        }
    }


    /**
  * 
  * @param {*} req 
  * @param {*} res 
  */
    async deleteDivision(req, res) {
        try {
            const { division_code } = req.params;

            // Periksa apakah Division ada
            const division = await this.divisionService.checkDivisionExists(division_code);
            if (!division) {
                return res.status(400).json(this.formatResponse('', 'Invalid Division Code', 400))

            }

            const user = await this.divisionService.deleteDivision(division_code);
            return res.status(200).json(this.formatResponse(user))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete Employee', 500))
        }
    }
}

module.exports = DivisionController;
