
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function UserSeeder() {
    
    /**
     * Create Data User
     */
    await prismaDB2.user.createMany({
        data: [
            { 
                user_code: 'LRM',
                email: 'testing1@gmail.com', 
                name: 'testing', 
                password: '$2a$10$xN8CCMBrKy1hA1COVhx8E.518K7.324ofa7e7RbDbxwWGbbHlkEQ.', 
                company_code: 'C001', 
                tenant_code: 'T001', 
                division_code: 'D001' ,
                status: 'Active' ,
            },
            {
                user_code: 'LRM',
                email: 'testing2@gmail.com',
                name: 'testing',
                password: '$2a$10$xN8CCMBrKy1hA1COVhx8E.518K7.324ofa7e7RbDbxwWGbbHlkEQ.',
                company_code: 'C001',
                tenant_code: 'T002',
                division_code: 'D001' ,
                status: 'Active',
            }
        ],
    });
}

module.exports = UserSeeder;