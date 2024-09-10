const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function DivisionSeeder() {

    /**
     * Create Data Division
     */
    await prismaDB2.division.createMany({
        data: [
            { division_code: 'D001', name: 'Division 1', company_code: 'C001', tenant_code: 'T001' },
            { division_code: 'D002', name: 'Division 2', company_code: 'C002', tenant_code: 'T001' },
            { division_code: 'D001', name: 'Division 1', company_code: 'C001', tenant_code: 'T002' },
            { division_code: 'D002', name: 'Division 2', company_code: 'C002', tenant_code: 'T002' },
        ],
    });

}

module.exports =  DivisionSeeder;