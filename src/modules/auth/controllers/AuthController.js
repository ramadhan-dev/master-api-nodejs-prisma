const { hashedPassword } = require(process.cwd() + '/src/helper/helper')
const { checkAttrCode } = require(process.cwd() + '/src/helper/checkAttrCodeHelper');
const { isNull } = require('lodash');
const bcrypt = require('bcryptjs');
const CreateToken = require("../../../utility/CreateToken");

class UserController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async doLogin(req, res) {
        try {
            const { email, password } = req.body;

            // let user =await DataModel.aggregate({$match:{email:email}});
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
                    res.status(200).json({ message: "success", token: token, user: user });
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all Employe' });
        }
    }


}

module.exports = UserController;
