
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function UserRoleSeeder() {

    /**
     * Create Data MasterMenu
     */
    await prismaDB2.UserRole.createMany({
        data: [
            { 
                company_code: 'C001',
                tenant_code: 'T001',
                division_code: 'D001',
                user_code: 'LRM', 
                role_code: 'SA', 
            },
            {
                company_code: 'C001',
                tenant_code: 'T002',
                division_code: 'D001',
                user_code: 'LRM',
                role_code: 'A',
            },
        ],
    });


}

module.exports =  UserRoleSeeder;