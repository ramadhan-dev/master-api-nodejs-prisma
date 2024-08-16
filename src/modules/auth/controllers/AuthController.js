const { isNull } = require('lodash');
const bcrypt = require('bcryptjs');
const CreateToken = require("../../../utility/CreateToken");

class UserController {
    constructor(authService, userService, formatResponse) {
        this.authService = authService;
        this.userService = userService;
        this.formatResponse = formatResponse;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async doLogin(req, res) {
        try {
            const { email, password } = req.body;

            let user = await this.userService.getUserByEmail(email); 

            if (isNull(user)) {
                res.status(404).json({ message: "fail", data: "Could not Find this Email!" });
            } else {
                let CheckPassword = await bcrypt.compare(password, user?.password);
                if (!CheckPassword) {
                    res.status(400).json({ message: "fail", data: "Wrong Password!" });
                } else {

                    let TokenData = { email: user?.email, id: user?.name, }
                    let token = await CreateToken(TokenData);
                    const data = {
                        'token' :token,
                        'user' : user  
                    }
                    return res.status(200).json(this.formatResponse(data))
                }
            }
        } catch (error) {
            return res.status(500).json(this.formatResponse('', 'Failed to login'))
        }
    }


}

module.exports = UserController;
