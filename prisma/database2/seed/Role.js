
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function RoleSeeder() {

    /**
     * Create Data MasterMenu
     */
    await prismaDB2.role.createMany({
        data: [
            { name: 'Super Admin', role_code: 'SA', },
            { name: 'Admin', role_code: 'A', },
            { name: 'Employee', role_code: 'E', },
        ],
    });


}

module.exports =  RoleSeeder;