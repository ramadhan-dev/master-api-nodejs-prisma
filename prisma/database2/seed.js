// prisma/seeders/seed.js

const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const tenant =  require('./seed/Tenant');
const Company =  require('./seed/Company');
const division =  require('./seed/Division');
const role =  require('./seed/Role');
const user =  require('./seed/User');
const menu = require('./seed/Menu');
const submenu = require('./seed/SubMenu');
const SubMenuAction = require('./seed/SubMenuAction');
const UserRole = require('./seed/UserRole');


async function main() {

}

async function main() {
    try {
        await tenant();
        await Company();
        await division();
        await role();
        await user();
        await menu();
        await submenu()
        await SubMenuAction()
        await UserRole()
        console.log('Seeding completed!');
    } catch (error) {
        console.error('Seeding error:', error);
    } finally {
        await prismaDB2.$disconnect();
        process.exit();
    }
}

main();