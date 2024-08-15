

class DivisionController {
    constructor(divisionService, companyService) {
        this.divisionService = divisionService;
        this.companyService = companyService;
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
    async getDivision(req, res) {
        try {
            const user = await this.divisionService.getDivisionById(String(req.params.division_code));
            if (!user) {
                return res.status(404).json({ error: 'Division Not Found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get Division' });
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
            const tenant = await this.companyService.checkCompanyExists(data.company_code);
            if (!tenant) {
                return res.status(400).json({ error: 'Invalid Company Code' });
            }
            const user = await this.divisionService.createDivision(data);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create Division' });
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
                return res.status(400).json({ error: 'Invalid Company Code' });
            }

            // Periksa apakah tenant ada
            const division = await this.divisionService.checkDivisionExists(division_code);
            if (!division) {
                return res.status(400).json({ error: 'Invalid Division Code' });
            }
            
            const user = await this.divisionService.updateDivision(division_code, data);
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
    async deleteDivision(req, res) {
        try {
            const { division_code } = req.params;

            // Periksa apakah Division ada
            const division = await this.divisionService.checkDivisionExists(division_code);
            if (!division) {
                return res.status(400).json({ error: 'Invalid Division Code' });
            }

            const user = await this.divisionService.deleteDivision(division_code);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete Employee' });
        }
    }
}

module.exports = DivisionController;
