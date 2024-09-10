
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function CompanySeeder() {

    /**
     * Create Data Company
     */
    await prismaDB2.company.createMany({
        data: [
            { company_code: 'C001', name: 'Company 1', tenant_code: 'T001' },
            { company_code: 'C002', name: 'Company 2', tenant_code: 'T001' },
            { company_code: 'C001', name: 'Company 1', tenant_code: 'T002' },
            { company_code: 'C002', name: 'Company 2', tenant_code: 'T002' },
        ]
    });

}

module.exports =  CompanySeeder;