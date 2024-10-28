

class DivisionService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllDivisions(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name', company_code ) {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    company_code: company_code, 
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { division_code: { contains: search, mode: 'insensitive' } },
                    ]
                }
                : 
                { company_code: company_code };



            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.division.findMany({
                    where: where,
                    include: {
                        company: {
                            select: {
                                name: true,        // Ambil nama tenant
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.division.count(),
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
    async getDivisionById(division_code, company_code) {
        try {
            return await this.prisma.division.findFirst({
                where: { 
                    AND: [
                        { company_code: company_code },  
                        { division_code: division_code }        
                    ]
                 },
                include: {
                    company: {
                        select: {
                            name: true,        
                        },
                    },
                },
            });
        } catch (error) {
            throw new Error(`Error Get One division`);
        }
    }


    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async createDivision(data) {
        try {
            return await this.prisma.division.create({ data });
        } catch (error) {
            throw new Error('Error create division');
        }
    }


    /**
     * 
     * @param {*} division_code 
     * @param {*} data 
     * @returns 
     */
    async updateDivision(division_code, data, company_code) {
        try {
            return await this.prisma.division.update({
                where: { 
                    AND: [
                        // { company_code: company_code },
                        { division_code: String(division_code) }
                    ]
                    // division_code: String(division_code) 
                },
                data: data,
            });
        } catch (error) {
            throw new Error('Error updating division');
        }
    }



    /**
     * 
     * @param {*} id 
     * @returns 
     */
    async deleteDivision(division_code) {
        try {
            const deletedItem = await this.prisma.division.delete({
                where: { division_code: String(division_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }



    /**
     * 
     * @param {*} division_code 
     * @returns 
     */
    async checkDivisionExists(division_code, company_code) {
        return await this.prisma.division.findFirst({
            where: {
                AND: [
                    { company_code: company_code },
                    { division_code: division_code }
                ]
            }
        });
    }

}

module.exports = DivisionService;
