

class UserShiftService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllUserShift(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'date') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { date: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.UserShift.findMany({
                    where: where,
                    include: {
                        user: {
                            select: {
                                name: true,        
                            },
                        },
                        shift: {
                            select: {
                                name: true,
                                startTime: true,
                                endTime: true,        
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.UserShift.count(),
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
            throw new Error('Error Get All tenant');
        }

    }


    /**
     * 
     * @param {*} user_shift_id 
     * @returns 
     */
    async getUserShiftById(user_shift_id) {
        try {
            return await this.prisma.UserShift.findUnique({
                where: { id: parseInt(user_shift_id) },
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    shift: {
                        select: {
                            name: true,
                            startTime: true,
                            endTime: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw new Error(`Error Get One tenant`);
        }
    }


    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async createUserShift(data) {
        try {
            return await this.prisma.UserShift.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }


    /**
     * 
     * @param {*} user_shift_id 
     * @param {*} data 
     * @returns 
     */
    async updateUserShift(user_shift_id, data) {
        try {
            return await this.prisma.UserShift.update({
                where: { id: parseInt(user_shift_id) },
                data: data,
            });
        } catch (error) {
            throw new Error('Error updating tenant');
        }
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteUserShift(company_code) {
        try {
            const deletedItem = await this.prisma.UserShift.delete({
                where: { id: parseInt(company_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }


    /**
 * 
 * @param {*} page 
 * @param {*} pageSize 
 * @returns 
 */
    async getAllByUSer(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'date', user_id) {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const additionalConditions = {
                userId: user_id,
            };

            const where = search
                ? {
                    AND: [
                        {
                            OR: [
                                { date: { contains: search.toLowerCase() } },
                            ],
                        },
                        additionalConditions
                    ]
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.UserShift.findMany({
                    where: where,
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
                        shift: {
                            select: {
                                name: true,
                                startTime: true,
                                endTime: true,
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.UserShift.count(),
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
            throw new Error('Error Get All tenant');
        }

    }


    /**
     * 
     * @param {*} user_shift_id 
     * @returns 
     */
    async checkUserShiftExists(user_shift_id) {
        return await this.prisma.UserShift.findUnique({
            where: { id: parseInt(user_shift_id) }
        });
    }



    /**
     * 
     * @param {*} userId 
     * @returns 
     */
    async getShiftByUserId(userId) {
        return await this.prisma.UserShift.findMany({
            select: {
                name: true,
                lat:true,
                lng:true
            },
            where: { userId: parseInt(userId) }
        });
    }

}

module.exports = UserShiftService;
