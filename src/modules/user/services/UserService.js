
const logger = require(process.cwd() + '/src/utility/logger');

class UserService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllUsers(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'FirstName') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { Email: { contains: search.toLowerCase() } },  
                        { FirstName: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.employee.findMany({
                    where: where,
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.employee.count(),
            ]);

            const totalPages = Math.ceil(totalItems / limit);

            return {
                data: items,
                meta: {
                    totalItems,
                    totalPages,
                    currentPage,
                    pageSize: limit,
                },
            };
        } catch (error) {
            console.log("🚀 ~ UserService ~ getAllUsers ~ error:", error)
            throw new Error('Error Get All employee');
        }

    }


    /**
     * 
     * @param {*} EmployeeCode 
     * @returns 
     */
    async getUserById(EmployeeCode) {
        try {
            return await this.prisma.employee.findUnique({
                where: { EmployeeCode },
            });
        } catch (error) {
            throw new Error(`Error Get One employee`);
        }
    }


    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async createUser(data) {
        try {
            return await this.prisma.employee.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create Employee');
        }
    }


    /**
     * 
     * @param {*} EmployeeCode 
     * @param {*} data 
     * @returns 
     */
    async updateUser(EmployeeCode, data) {
        try {
            return await this.prisma.employee.update({
                where: { EmployeeCode: String(EmployeeCode) },
                data: data,
            });
        } catch (error) {
            throw new Error('Error updating Employee');
        }
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteUser(EmployeeCode) {
        try {
            const deletedItem = await this.prisma.employee.delete({
                where: { EmployeeCode: String(EmployeeCode) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }

}

module.exports = UserService;
