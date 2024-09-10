
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function MenuSeeder() {

    /**
     * Create Data Role
     */
    await prismaDB2.MasterMenu.createMany({
        data: [
            {
                menu_code: 'dashboard',
                name: 'Dashboard',
                url: '/dashboard',
                description: 'Dashboard'
            },
            {
                menu_code: 'employee',
                name: 'Employee Management',
                url: '/employee-management',
                description: 'Employee Management'
            },
            {
                menu_code: 'attendance',
                name: 'Attendance & Time Tracking',
                url: '/attendance',
                description: 'Attendance & Time Tracking'
            },
            {
                menu_code: 'payroll',
                name: 'Payroll',
                url: '/payroll',
                description: 'Payroll'
            },
            {
                menu_code: 'leave',
                name: 'Leave Management',
                url: '/leave-management',
                description: 'Leave Management'
            },
            {
                menu_code: 'recruitment',
                name: 'Recruitment Management',
                url: '/recruitment-management',
                description: 'Recruitment Management'
            },
            {
                menu_code: 'performance',
                name: 'Performance Appraisal',
                url: '/performance-appraisal',
                description: 'Performance Appraisal'
            },
            {
                menu_code: 'training',
                name: 'Training & Development',
                url: '/training-development',
                description: 'Training & Development'
            },
            {
                menu_code: 'shift',
                name: 'Shift Management',
                url: '/shift-management',
                description: 'Shift Management'
            },
            {
                menu_code: 'document',
                name: 'Document Management',
                url: '/document-management',
                description: 'Document Management'
            },
            {
                menu_code: 'benefits',
                name: 'Benefits Management',
                url: '/benefits-management',
                description: 'Benefits Management'
            },
            {
                menu_code: 'travel',
                name: 'Business Travel Management',
                url: '/business-travel-management',
                description: 'Business Travel Management'
            },
            {
                menu_code: 'reports',
                name: 'HR Reports',
                url: '/hr-reports',
                description: 'HR Reports'
            },
            {
                menu_code: 'self-service',
                name: 'Employee Self-Service',
                url: '/employee-self-service',
                description: 'Employee Self-Service'
            },
            {
                menu_code: 'compliance',
                name: 'Compliance Management',
                url: '/compliance-management',
                description: 'Compliance Management'
            },
        ],
    });


}

module.exports =  MenuSeeder;