

class UserLocationService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllUserLocation(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { company_code: { contains: search.toLowerCase() } },
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.UserLocation.findMany({
                    where: where,
                    include: {
                        user: {
                            select: {
                                name: true,        // Ambil nama tenant
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.UserLocation.count(),
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
     * @param {*} user_location_id 
     * @returns 
     */
    async getUserLocationById(user_location_id) {
        try {
            return await this.prisma.UserLocation.findUnique({
                where: { id: parseInt(user_location_id) },
                include: {
                    user: {
                        select: {
                            name: true,        // Ambil nama tenant
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
    async createUserLocation(data) {
        try {
            return await this.prisma.UserLocation.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }


    /**
     * 
     * @param {*} user_location_id 
     * @param {*} data 
     * @returns 
     */
    async updateUserLocation(user_location_id, data) {
        try {
            return await this.prisma.UserLocation.update({
                where: { id: parseInt(user_location_id) },
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
    async deleteUserLocation(company_code) {
        try {
            const deletedItem = await this.prisma.UserLocation.delete({
                where: { id: parseInt(company_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }


    /**
     * 
     * @param {*} user_location_id 
     * @returns 
     */
    async checkUserLocationExists(user_location_id) {
        return await this.prisma.UserLocation.findUnique({
            where: { id: parseInt(user_location_id) }
        });
    }

}

module.exports = UserLocationService;
