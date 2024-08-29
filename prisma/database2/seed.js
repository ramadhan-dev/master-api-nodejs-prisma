// prisma/seeders/seed.js

const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

async function main() {
    // Contoh: Menambahkan data dummy ke tabel Tenant
    await prismaDB2.tenant.createMany({
        data: [
            { tenant_code: 'T001', name: 'Tenant 1' },
            { tenant_code: 'T002', name: 'Tenant 2' },
        ],
    });


    await prismaDB2.company.createMany({
        data: [
            { company_code: 'C001', name: 'Company 1', tenant_code: 'T001' },
            { company_code: 'C002', name: 'Company 2', tenant_code: 'T002' },
        ]
    });


    await prismaDB2.division.createMany({
        data: [
            { division_code: 'D001', name: 'Division 1', company_code: 'C001', },
            { division_code: 'D002', name: 'Division 2', company_code: 'C002' },
        ],
    });


    await prismaDB2.role.createMany({
        data: [
            { name: 'Admin', name: 'code', company_code: 'admin', },
            { name: 'Employee', name: 'code', company_code: 'employee' },
        ],
    });
    


    await prismaDB2.user.createMany({
        data: [
            { email: 'testing@gmail.com', name: 'testing', password: '$2a$10$xN8CCMBrKy1hA1COVhx8E.518K7.324ofa7e7RbDbxwWGbbHlkEQ.', company_code: 'C001', tenant_code: 'T001', division_code: 'D001' }
        ],
    });



    

}

main()
.catch(e => {
    throw e;
})
.finally(async () => {
    await prismaDB2.$disconnect();
});
