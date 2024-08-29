

    class UserShiftController {
        constructor(companyService, userService, shiftTypeService, formatResponse) {
            this.userShiftService = companyService;
            this.userService = userService;
            this.shiftTypeService = shiftTypeService;
            this.formatResponse = formatResponse;
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async getAllUserShift(req, res) {
            try {
                const { page, pageSize, search, order, orderBy } = req.query;
                const company = await this.userShiftService.getAllUserShift(page, pageSize, search, order, orderBy);
                res.locals.responseBody = JSON.stringify(company);
                return res.status(200).json(this.formatResponse(company))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get all User Shift', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         * @returns 
         */
        async getUserShift(req, res) {
            try {
                const user = await this.userShiftService.getUserShiftById(String(req.params.user_shift_id));
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'User Shift Not Found', 400))
                }

                
                return res.status(200).json(this.formatResponse(user))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get User Shift', 500))
            }
        }



        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async createUserShift(req, res) {
            try {
                const data = req?.body;

                const user = await this.userService.checkUserExists(data.userId);
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'User Not Found', 400))
                }
                

                const shiftType = await this.shiftTypeService.checkShiftTypeExists(data.shiftId);
                if (!shiftType) {
                    return res.status(400).json(this.formatResponse('', 'Shift Type Not Found', 400))
                }


                const response = await this.userShiftService.createUserShift(data);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to create User Shift', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async updateUserShift(req, res) {
            try {
                const { user_shift_id } = req.params;
                const data = req.body;

                // Periksa apakah tenant ada
                const user = await this.userService.checkUserExists(data.userId);
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Id', 400))
                }


                // Periksa apakah tenant ada
                const shiftType = await this.shiftTypeService.checkShiftTypeExists(data.shiftId);
                if (!shiftType) {
                    return res.status(400).json(this.formatResponse('', 'Shift Type Not Found', 400))
                }

                // Periksa apakah tenant ada
                const userShift = await this.userShiftService.checkUserShiftExists(user_shift_id);
                if (!userShift) {
                    return res.status(400).json(this.formatResponse('', 'User Shift Not Found', 400))
                }
                
                const response = await this.userShiftService.updateUserShift(user_shift_id, data);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                console.log("🚀 ~ UserShiftController ~ updateUserShift ~ error:", error)
                return res.status(500).json(this.formatResponse('', 'Failed to update User Shift', 500))
            }
        }


        /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
        async deleteUserShift(req, res) {
            try {
                const { user_shift_id } = req.params;

                // Periksa apakah tenant ada
                const userShift = await this.userShiftService.checkUserShiftExists(user_shift_id);
                if (!userShift) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Shift Id', 400))
                }

                const response = await this.userShiftService.deleteUserShift(user_shift_id);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to delete User Shift', 500))
            }
        }



        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async getAllByUSer(req, res) {
            try {
                const { user_id } = req.params;
                const { page, pageSize, search, order, orderBy } = req.query;
                const company = await this.userShiftService.getAllUserShift(page, pageSize, search, order, orderBy, user_id);
                res.locals.responseBody = JSON.stringify(company);
                return res.status(200).json(this.formatResponse(company))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get all User Shift', 500))
            }
        }
    }

    module.exports = UserShiftController;
