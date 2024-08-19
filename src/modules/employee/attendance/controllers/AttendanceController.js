const { haversineDistance } = require(process.cwd() + '/src/helper/helper');


    class AttendanceController {
        constructor(companyService, userService, userLocationService,  formatResponse) {
            this.attendanceService = companyService;
            this.userService = userService;
            this.userLocationService = userLocationService;
            this.formatResponse = formatResponse;
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async getAllAttendance(req, res) {
            try {
                const { page, pageSize, search, order, orderBy } = req.query;
                const company = await this.attendanceService.getAllAttendance(page, pageSize, search, order, orderBy);
                res.locals.responseBody = JSON.stringify(company);
                return res.status(200).json(this.formatResponse(company))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get all User Location', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         * @returns 
         */
        async getAttendance(req, res) {
            try {
                const user = await this.attendanceService.getAttendanceById(String(req.params.user_location_id));
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'User Location Not Found', 400))
                }

                
                return res.status(200).json(this.formatResponse(user))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to get User Location', 500))
            }
        }



        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async createAttendance(req, res) {
            try {
                const data = req?.body;

                // Periksa apakah tenant ada
                const user = await this.userService.checkUserExists(data.userId);
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Id', 400))
                }


                // check user location
                const userLocation = await this.userLocationService.getLocationByUserId(data.userId);
                if (!userLocation) {
                    return res.status(400).json(this.formatResponse('', 'User Location not Found', 400))
                }
               
                let status = false;

                for (let index = 0; index < userLocation.length; index++) {
                    const { lat, lng, name } = userLocation[index]
                    const distance = haversineDistance(lat, lng, data?.lat, data?.lng)
                    if (distance < 250) {
                        status = true
                        break
                    }
                }

                if (!status) {
                    return res.status(403).json(this.formatResponse('', 'Action denied: You are not within 250 meters of the allowed location.', 403))
                }

                const payload = {...data, status:'success'} 

                const response = await this.attendanceService.createAttendance(payload);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to create User Location', 500))
            }
        }


        /**
         * 
         * @param {*} req 
         * @param {*} res 
         */
        async updateAttendance(req, res) {
            try {
                const { user_location_id } = req.params;
                const data = req.body;

                // Periksa apakah tenant ada
                const user = await this.userService.checkUserExists(data.userId);
                if (!user) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Id', 400))
                }

                // Periksa apakah tenant ada
                const attendance = await this.attendanceService.checkAttendanceExists(user_location_id);
                if (!attendance) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Location Id', 400))
                }
                
                const response = await this.attendanceService.updateAttendance(user_location_id, data);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to update User Location', 500))
            }
        }


        /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
        async deleteAttendance(req, res) {
            try {
                const { user_location_id } = req.params;

                // Periksa apakah tenant ada
                const attendance = await this.attendanceService.checkAttendanceExists(user_location_id);
                if (!attendance) {
                    return res.status(400).json(this.formatResponse('', 'Invalid User Location Id', 400))
                }

                const response = await this.attendanceService.deleteAttendance(user_location_id);
                return res.status(200).json(this.formatResponse(response))
            } catch (error) {
                return res.status(500).json(this.formatResponse('', 'Failed to delete User Location', 500))
            }
        }
    }

    module.exports = AttendanceController;
