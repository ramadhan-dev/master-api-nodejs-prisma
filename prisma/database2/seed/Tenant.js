
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function TenantSeeder() {

    /**
     * Create Data Tenant
     */
    await prismaDB2.tenant.createMany({
        data: [
            { tenant_code: 'T001', name: 'Tenant 1' },
            { tenant_code: 'T002', name: 'Tenant 2' },
        ],
    });

}

module.exports =  TenantSeeder;