

    class ShiftTypeController {
        constructor(companyService, formatResponse) {
            this.shiftTypeService = companyService;
            this.formatResponse = formatResponse;
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async getAllShiftType(req, res) {
            try {
                const { page, pageSize, search, order, orderBy } = req.query;
                const company = await this.shiftTypeService.getAllShiftType(page, pageSize, search, order, orderBy);
                res.locals.responseBody = JSON.stringify(company);
                return res.status(200).json(this.formatResponse(company))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get all Shift Type', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         * @returns 
         */
        async getShiftType(req, res) {
            try {
                const user = await this.shiftTypeService.getShiftTypeById(String(req.params.shift_type_id));
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'Shift Type Not Found', 400))
                }

                
                return res.status(200).json(this.formatResponse(user))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get Shift Type', 500))
            }
        }



        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async createShiftType(req, res) {
            try {
                const data = req?.body;
                const response = await this.shiftTypeService.createShiftType(data);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to create Shift Type', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async updateShiftType(req, res) {
            try {
                const { shift_type_id } = req.params;
                const data = req.body;


                // Periksa apakah tenant ada
                const shiftType = await this.shiftTypeService.checkShiftTypeExists(shift_type_id);
                if (!shiftType) {
                    return res.status(400).json(this.formatResponse('', 'Invalid Shift Type Id', 400))
                }
                
                const response = await this.shiftTypeService.updateShiftType(shift_type_id, data);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to update Shift Type', 500))
            }
        }


        /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
        async deleteShiftType(req, res) {
            try {
                const { shift_type_id } = req.params;

                // Periksa apakah tenant ada
                const shiftType = await this.shiftTypeService.checkShiftTypeExists(shift_type_id);
                if (!shiftType) {
                    return res.status(400).json(this.formatResponse('', 'Invalid Shift Type Id', 400))
                }

                const response = await this.shiftTypeService.deleteShiftType(shift_type_id);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to delete Shift Type', 500))
            }
        }
    }

    module.exports = ShiftTypeController;
