

class ShiftTypeService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllShiftType(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.ShiftType.findMany({
                    where: where,
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.ShiftType.count(),
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
     * @param {*} shift_type_id 
     * @returns 
     */
    async getShiftTypeById(shift_type_id) {
        try {
            return await this.prisma.ShiftType.findUnique({
                where: { id: parseInt(shift_type_id) },
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
    async createShiftType(data) {
        try {
            return await this.prisma.ShiftType.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }


    /**
     * 
     * @param {*} shift_type_id 
     * @param {*} data 
     * @returns 
     */
    async updateShiftType(shift_type_id, data) {
        try {
            return await this.prisma.ShiftType.update({
                where: { id: parseInt(shift_type_id) },
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
    async deleteShiftType(company_code) {
        try {
            const deletedItem = await this.prisma.ShiftType.delete({
                where: { id: parseInt(company_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }


    /**
     * 
     * @param {*} shift_type_id 
     * @returns 
     */
    async checkShiftTypeExists(shift_type_id) {
        return await this.prisma.ShiftType.findUnique({
            where: { id: parseInt(shift_type_id) }
        });
    }

}

module.exports = ShiftTypeService;
