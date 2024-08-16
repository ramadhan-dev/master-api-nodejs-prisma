

class UserLocationController {
    constructor(companyService, userService, formatResponse) {
        this.userLocationService = companyService;
        this.userService = userService;
        this.formatResponse = formatResponse;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getAllUserLocation(req, res) {
        try {
            const { page, pageSize, search, order, orderBy } = req.query;
            const company = await this.userLocationService.getAllUserLocation(page, pageSize, search, order, orderBy);
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
    async getUserLocation(req, res) {
        try {
            const user = await this.userLocationService.getUserLocationById(String(req.params.user_location_id));
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
    async createUserLocation(req, res) {
        try {
            const data = req?.body;

            // Periksa apakah tenant ada
            const user = await this.userService.checkUserExists(data.userId);
            if (!user) {
                return res.status(400).json(this.formatResponse('', 'Failed to get User Location', 400))
            }
            

            const response = await this.userLocationService.createUserLocation(data);
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
    async updateUserLocation(req, res) {
        try {
            const { user_location_id } = req.params;
            const data = req.body;

            // Periksa apakah tenant ada
            const user = await this.userService.checkUserExists(data.userId);
            if (!user) {
                return res.status(400).json(this.formatResponse('', 'Invalid User Id', 400))
            }

            // Periksa apakah tenant ada
            const userLocation = await this.userLocationService.checkUserLocationExists(user_location_id);
            if (!userLocation) {
                return res.status(400).json(this.formatResponse('', 'Invalid User Location Id', 400))
            }
            
            const response = await this.userLocationService.updateUserLocation(user_location_id, data);
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
    async deleteUserLocation(req, res) {
        try {
            const { user_location_id } = req.params;

            // Periksa apakah tenant ada
            const userLocation = await this.userLocationService.checkUserLocationExists(user_location_id);
            if (!userLocation) {
                return res.status(400).json(this.formatResponse('', 'Invalid User Location Id', 400))
            }

            const response = await this.userLocationService.deleteUserLocation(user_location_id);
            return res.status(200).json(this.formatResponse(response))
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to delete User Location', 500))
        }
    }
}

module.exports = UserLocationController;
