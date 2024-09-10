
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function SubMenuAction() {

    const subMenus = await prismaDB2.masterSubMenu.findMany();

    const actions = ['Create', 'Update', 'Delete', 'Read', 'Download', 'Upload'];
    const subMenuActions = [];


    for (const subMenu of subMenus) {
        // Buat action untuk setiap sub menu
        actions.forEach((action) => {
            subMenuActions.push({
                sub_menu_code: subMenu.sub_menu_code,
                menu_code: subMenu.menu_code,
                action_code: action, // Buat action_code unik
                name: action, // Nama action
            });
        });
    }

    /**
     * Create Data Role
     */
    await prismaDB2.MasterMenuAction.createMany({
        data: subMenuActions
    });


}

module.exports =  SubMenuAction;