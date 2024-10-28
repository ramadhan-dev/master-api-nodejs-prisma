

class CompanyService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllCompanies(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
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
                this.prisma.company.findMany({
                    where: where,
                    include: {
                        tenant: {
                            select: {
                                name: true,        // Ambil nama tenant
                            },
                        },
                    },
                    skip: skip,
                    take: limit,
                    orderBy: orderByClause,
                }),
                this.prisma.company.count(),
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
    async getCompanyById(company_code) {
        try {
            return await this.prisma.company.findUnique({
                where: { company_code },
                include: {
                    tenant: {
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
    async createCompany(data) {
        try {
            return await this.prisma.company.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }


    /**
     * 
     * @param {*} company_code 
     * @param {*} data 
     * @returns 
     */
    async updateCompany(company_code, data) {
        try {
            return await this.prisma.company.update({
                where: { company_code: String(company_code) },
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
    async deleteCompany(company_code) {
        try {
            const deletedItem = await this.prisma.company.delete({
                where: { company_code: String(company_code) },
            });
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item');
        }
    }


    /**
     * 
     * @param {*} company_code 
     * @returns 
     */
    async checkCompanyExists(company_code) {
        return await this.prisma.company.findUnique({
            where: { company_code: company_code }
        });
    }

}

module.exports = CompanyService;
