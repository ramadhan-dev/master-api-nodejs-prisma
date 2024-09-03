// prisma/seeders/seed.js

const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');

const prismaDB1 = PrismaClientFactory.createInstanceDB1();

async function main() {
    // Contoh: Menambahkan data dummy ke tabel Tenant
    await prismaDB1.tenant.createMany({
        data: [
            { tenant_code: 'T001', name: 'Tenant 1' },
            { tenant_code: 'T002', name: 'Tenant 2' },
        ],
    });
    
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prismaDB1.$disconnect();
    });
