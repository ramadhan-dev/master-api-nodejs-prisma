

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
                        { email: { contains: search.toLowerCase() } },  
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
           
            
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.user.findMany({
                    where: where,
                    include: {
                        tenant: {
                            select: {
                                name: true,       
                            },
                        },
                        company: {
                            select: {
                                name: true,       
                            },
                        },
                        division: {
                            select: {
                                name: true,       
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.user.count(),
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
            throw new Error('Error Get All User');
        }

    }


    /**
     * 
     * @param {*} user_id 
     * @returns 
     */
    async getUserById(user_id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: user_id },
                include: {
                    tenant: {
                        select: {
                            name: true,
                        },
                    },
                    company: {
                        select: {
                            name: true,
                        },
                    },
                    division: {
                        select: {
                            name: true,
                        },
                    },
                },
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
            return await this.prisma.user.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create User');
        }
    }


    /**
     * 
     * @param {*} user_id 
     * @param {*} data 
     * @returns 
     */
    async updateUser(user_id, data) {
        try {
            return await this.prisma.user.update({
                where: { id: user_id },
                data: data,
            });
        } catch (error) {
            throw new Error('Error updating User');
        }
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteUser(user_id) {
        try {
            const deletedItem = await this.prisma.user.delete({
                where: { id: user_id },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }



    /**
     * 
     * @param {*} email 
     * @returns 
     */
    async getUserByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email: email }
            });
        } catch (error) {
            throw new Error(`Error Get One User By Email`);
        }
    }


    /**
 * 
 * @param {*} user_id 
 * @returns 
 */
    async checkUserExists(user_id) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: user_id }
            });
        } catch (error) {
            throw new Error(`Error Get One User By User Id`);
        }
    }

    
}

module.exports = UserService;
