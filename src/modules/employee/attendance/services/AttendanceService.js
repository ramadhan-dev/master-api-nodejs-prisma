const {formatDateToTimestamp} = require(process.cwd() + '/src/helper/helper')
const { startOfDay, endOfDay } = require('date-fns');

class AttendanceService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }


    /**
     * 
     * @param {*} page 
     * @param {*} pageSize 
     * @returns 
     */
    async getAllAttendance(page = 1, pageSize = 10, search = '', order = 'asc', orderBy = 'name') {
        try {
            const currentPage = parseInt(page, 10);
            const limit = parseInt(pageSize, 10);
            const skip = (currentPage - 1) * limit;

            const where = search
                ? {
                    OR: [
                        { division_code: { contains: search.toLowerCase() } },
                        { name: { contains: search.toLowerCase() } },
                    ],
                }
                : {};

            const orderByClause = orderBy ? { [orderBy]: order } : { id: 'asc' };
            const [items, totalItems] = await this.prisma.$transaction([
                this.prisma.Attendance.findMany({
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
                this.prisma.Attendance.count(),
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
    async getAttendanceById(user_location_id) {
        try {
            return await this.prisma.Attendance.findUnique({
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
     * @param {*} user_id 
     * @returns 
     */
    async getAttendanceByDate(user_id) {
        const now = new Date();

        const start = startOfDay(new Date(now));
        const end = endOfDay(new Date(now));

        try {
            return await this.prisma.Attendance.findFirst({
                where: { 
                    userId: parseInt(user_id), 
                    createdAt: {
                        gte: start, 
                        lte: end,                       },
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
    async createAttendance(data) {
        try {
            return await this.prisma.Attendance.create({
                data,
            });
        } catch (error) {
            throw new Error('Error create tenant');
        }
    }



    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async clockOut(attendance_id, data) {
        try {
            return await this.prisma.Attendance.update({
                where: { id: parseInt(attendance_id) },
                data:data,
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
    async updateAttendance(user_location_id, data) {
        try {
            return await this.prisma.Attendance.update({
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
    async deleteAttendance(company_code) {
        try {
            const deletedItem = await this.prisma.Attendance.delete({
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
    async checkAttendanceExists(user_location_id) {
        return await this.prisma.Attendance.findUnique({
            where: { id: parseInt(user_location_id) }
        });
    }

}

module.exports = AttendanceService;
