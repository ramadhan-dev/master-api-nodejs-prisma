

class TenantService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllTenants(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { tenant_code: { contains: search.toLowerCase() } },  
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.tenant.findMany({
                    where: where,
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.tenant.count(),
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
     * @param {*} tenantCode 
     * @returns 
     */
    async getTenantById(tenant_code) {
        try {
            return await this.prisma.tenant.findUnique({
                where: { tenant_code },
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
    async createTenant(data) {
        try {
            return await this.prisma.tenant.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }


    /**
     * 
     * @param {*} tenant_code 
     * @param {*} data 
     * @returns 
     */
    async updateTenant(tenant_code, data) {
        try {
            return await this.prisma.tenant.update({
                where: { tenant_code: String(tenant_code) },
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
    async deleteTenant(tenant_code) {
        try {
            const deletedItem = await this.prisma.tenant.delete({
                where: { tenant_code: String(tenant_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }

}

module.exports = TenantService;
