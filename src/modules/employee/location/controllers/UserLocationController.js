

class UserLocationController {
    constructor(companyService, userService) {
        this.userLocationService = companyService;
        this.userService = userService;
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
            res.json(company);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all User Location' });
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
                return res.status(404).json({ error: 'User Location Not Found' });
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
    async createUserLocation(req, res) {
        try {
            const data = req?.body;

            // Periksa apakah tenant ada
            const user = await this.userService.checkUserExists(data.userId);
            if (!user) {
                return res.status(400).json({ error: 'Invalid User ID' });
            }
            
            const response = await this.userLocationService.createUserLocation(data);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create Employee' });
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
                return res.status(400).json({ error: 'Invalid User Id' });
            }

            // Periksa apakah tenant ada
            const userLocation = await this.userLocationService.checkUserLocationExists(user_location_id);
            if (!userLocation) {
                return res.status(400).json({ error: 'Invalid User Location ' });
            }
            
            const response = await this.userLocationService.updateUserLocation(user_location_id, data);
            res.status(201).json(response);
        } catch (error) {
            console.log("🚀 ~ UserLocationController ~ updateUserLocation ~ error:", error)
            res.status(500).json({ error: 'Failed to update Employee' });
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
                return res.status(400).json({ error: 'Invalid User Location ' });
            }

            const user = await this.userLocationService.deleteUserLocation(user_location_id);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete User Location' });
        }
    }
}

module.exports = UserLocationController;
