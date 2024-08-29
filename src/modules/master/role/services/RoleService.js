

class RoleService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllRoles(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { code: { contains: search.toLowerCase() } },  
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.role.findMany({
                    where: where,
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.role.count(),
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
            console.log("🚀 ~ RoleService ~ getAllRoles ~ error:", error)
            
            throw new Error('Error Get All role');
        }

    }


    /**
     * 
     * @param {*} roleCode 
     * @returns 
     */
    async getRoleById(code) {
        try {
            return await this.prisma.role.findUnique({
                where: { code },
            });
        } catch (error) {
            throw new Error(`Error Get One role`);
        }
    }


    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async createRole(data) {
        try {
            return await this.prisma.role.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create role');
        }
    }


    /**
     * 
     * @param {*} code 
     * @param {*} data 
     * @returns 
     */
    async updateRole(code, data) {
        try {
            return await this.prisma.role.update({
                where: { code: String(code) },
                data: data,
            });
        } catch (error) {
            throw new Error('Error updating role');
        }
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteRole(code) {
        try {
            const deletedItem = await this.prisma.role.delete({
                where: { code: String(code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }


    /**
     * 
     * @param {*} code 
     * @returns 
     */
    async checkRoleExists(code) {
        return await this.prisma.role.findUnique({
            where: { code: code }
        });
    }

}

module.exports = RoleService;
