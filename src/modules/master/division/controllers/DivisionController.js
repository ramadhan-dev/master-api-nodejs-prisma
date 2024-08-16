

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
            const { page, pageSize, search, order, orderBy } = req.query;
            const company = await this.divisionService.getAllDivisions(page, pageSize, search, order, orderBy);
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
            const user = await this.divisionService.getDivisionById(String(req.params.division_code));
            if (!user) {
                return res.status(400).json(this.formatResponse('', 'Division Not Found', 400))
            }

            return res.status(200).json(this.formatResponse(user))
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

            // Periksa apakah tenant ada
            const company = await this.companyService.checkCompanyExists(data.company_code);
            if (!company) {
                return res.status(400).json(this.formatResponse('', 'Invalid Company Code', 400))

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
            
            const user = await this.divisionService.updateDivision(division_code, data);
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
