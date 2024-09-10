
const { PrismaClient } = require('@prisma/client');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prismaDB2 = PrismaClientFactory.createInstanceDB2();


async function SubMenuSeeder() {

    /**
     * Create Data Role
     */
    await prismaDB2.MasterSubMenu.createMany({
        data: [
            {
                menu_code: 'dashboard',
                sub_menu_code: 'overview',
                name: 'Overview',
                url: '/overview',
                description: 'Overview'
            },
            {
                menu_code: 'dashboard',
                sub_menu_code: 'key-metrics',
                name: 'Key Metrics',
                url: '/key-metrics',
                description: 'Key Metrics'
            },
            {
                menu_code: 'dashboard',
                sub_menu_code: 'notifications',
                name: 'Notifications',
                url: '/notifications',
                description: 'Notifications'
            },
            {
                menu_code: 'dashboard',
                sub_menu_code: 'recent-activity',
                name: 'Recent Activity',
                url: '/recent-activity',
                description: 'Recent Activity'
            },
            {
                menu_code: 'dashboard',
                sub_menu_code: 'announcements',
                name: 'Announcements',
                url: '/announcements',
                description: 'Announcements'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'employee-directory',
                name: 'Employee Directory',
                url: '/employee-directory',
                description: 'Employee Directory'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'employee-profiles',
                name: 'Employee Profiles',
                url: '/employee-profiles',
                description: 'Employee Profiles'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'employment-history',
                name: 'Employment History',
                url: '/employment-history',
                description: 'Employment History'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'job-titles-positions',
                name: 'Job Titles & Positions',
                url: '/job-titles-positions',
                description: 'Job Titles & Positions'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'employee-documents',
                name: 'Employee Documents',
                url: '/employee-documents',
                description: 'Employee Documents'
            },
            {
                menu_code: 'employee',
                sub_menu_code: 'contract-management',
                name: 'Contract Management',
                url: '/contract-management',
                description: 'Contract Management'
            },
            {
                menu_code: 'attendance',
                sub_menu_code: 'Daily attendance',
                name: 'Daily Attendance',
                url: '/Daily attendance',
                description: 'Daily Attendance'
            },
            {
                menu_code: 'attendance',
                sub_menu_code: 'overtime-management',
                name: 'Overtime Management',
                url: '/overtime-management',
                description: 'Overtime Management'
            },
            {
                menu_code: 'attendance',
                sub_menu_code: 'time-off-requests',
                name: 'Time Off Requests',
                url: '/time-off-requests',
                description: 'Time Off Requests'
            },
            {
                menu_code: 'attendance',
                sub_menu_code: 'work-hours-log',
                name: 'Work Hours Log',
                url: '/work-hours-log',
                description: 'Work Hours Log'
            },
            {
                menu_code: 'attendance',
                sub_menu_code: 'attendance-reports',
                name: 'Attendance Reports',
                url: '/attendance-reports',
                description: 'Attendance Reports'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'salary-calculation',
                name: 'Salary Calculation',
                url: '/salary-calculation',
                description: 'Salary Calculation'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'bonuses-allowances',
                name: 'Bonuses & Allowances',
                url: '/bonuses-allowances',
                description: 'Bonuses & Allowances'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'deductions-taxes',
                name: 'Deductions & Taxes',
                url: '/deductions-taxes',
                description: 'Deductions & Taxes'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'payroll-history',
                name: 'Payroll History',
                url: '/payroll-history',
                description: 'Payroll History'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'salary-slips',
                name: 'Salary Slips',
                url: '/salary-slips',
                description: 'Salary Slips'
            },
            {
                menu_code: 'payroll',
                sub_menu_code: 'payroll-reports',
                name: 'Payroll Reports',
                url: '/payroll-reports',
                description: 'Payroll Reports'
            },
            {
                menu_code: 'leave',
                sub_menu_code: 'leave-requests',
                name: 'Leave Requests',
                url: '/leave-requests',
                description: 'Leave Requests'
            },
            {
                menu_code: 'leave',
                sub_menu_code: 'leave-balances',
                name: 'Leave Balances',
                url: '/leave-balances',
                description: 'Leave Balances'
            },
            {
                menu_code: 'leave',
                sub_menu_code: 'leave-approval',
                name: 'Leave Approval',
                url: '/leave-approval',
                description: 'Leave Approval'
            },
            {
                menu_code: 'leave',
                sub_menu_code: 'leave-history',
                name: 'Leave History',
                url: '/leave-history',
                description: 'Leave History'
            },
            {
                menu_code: 'leave',
                sub_menu_code: 'leave-policies',
                name: 'Leave Policies',
                url: '/leave-policies',
                description: 'Leave Policies'
            },
            {
                menu_code: 'recruitment',
                sub_menu_code: 'job-postings',
                name: 'Job Postings',
                url: '/job-postings',
                description: 'Job Postings'
            },
            {
                menu_code: 'recruitment',
                sub_menu_code: 'candidate-applications',
                name: 'Candidate Applications',
                url: '/candidate-applications',
                description: 'Candidate Applications'
            },
            {
                menu_code: 'recruitment',
                sub_menu_code: 'interview-scheduling',
                name: 'Interview Scheduling',
                url: '/interview-scheduling',
                description: 'Interview Scheduling'
            },
            {
                menu_code: 'recruitment',
                sub_menu_code: 'candidate-evaluations',
                name: 'Candidate Evaluations',
                url: '/candidate-evaluations',
                description: 'Candidate Evaluations'
            },
            {
                menu_code: 'recruitment',
                sub_menu_code: 'job-offer-management',
                name: 'Job Offer Management',
                url: '/job-offer-management',
                description: 'Job Offer Management'
            },
            {
                menu_code: 'performance',
                sub_menu_code: 'performance-reviews',
                name: 'Performance Reviews',
                url: '/performance-reviews',
                description: 'Performance Reviews'
            },
            {
                menu_code: 'performance',
                sub_menu_code: 'goal-setting',
                name: 'Goal Setting',
                url: '/goal-setting',
                description: 'Goal Setting'
            },
            {
                menu_code: 'performance',
                sub_menu_code: 'feedback-evaluation',
                name: 'Feedback & Evaluation',
                url: '/feedback-evaluation',
                description: 'Feedback & Evaluation'
            },
            {
                menu_code: 'performance',
                sub_menu_code: 'appraisal-history',
                name: 'Appraisal History',
                url: '/appraisal-history',
                description: 'Appraisal History'
            },
            {
                menu_code: 'performance',
                sub_menu_code: 'performance-reports',
                name: 'Performance Reports',
                url: '/performance-reports',
                description: 'Performance Reports'
            },
            {
                menu_code: 'training',
                sub_menu_code: 'training-calendar',
                name: 'Available Courses',
                url: '/training-calendar',
                description: 'Available Courses'
            },
            {
                menu_code: 'training',
                sub_menu_code: 'available-courses',
                name: 'Available Courses',
                url: '/available-courses',
                description: 'Available Courses'
            },
            {
                menu_code: 'training',
                sub_menu_code: 'training-enrollment',
                name: 'Training Enrollment',
                url: '/training-enrollment',
                description: 'Training Enrollment'
            },
            {
                menu_code: 'training',
                sub_menu_code: 'certifications',
                name: 'Certifications',
                url: '/certifications',
                description: 'Certifications'
            },
            {
                menu_code: 'training',
                sub_menu_code: 'training-history',
                name: 'Training History',
                url: '/training-history',
                description: 'Training History'
            },
            {
                menu_code: 'shift',
                sub_menu_code: 'shift-schedules',
                name: 'Shift Schedules',
                url: '/shift-schedules',
                description: 'Shift Schedules'
            },
            {
                menu_code: 'shift',
                sub_menu_code: 'shift-swap-requests',
                name: 'Shift Swap Requests',
                url: '/shift-swap-requests',
                description: 'Shift Swap Requests'
            },
            {
                menu_code: 'shift',
                sub_menu_code: 'overtime-planning',
                name: 'Overtime Planning',
                url: '/overtime-planning',
                description: 'Overtime Planning'
            },
            {
                menu_code: 'shift',
                sub_menu_code: 'shift-reports',
                name: 'Shift Reports',
                url: '/shift-reports',
                description: 'Shift Reports'
            },
            {
                menu_code: 'shift',
                sub_menu_code: 'Attendance by shift',
                name: 'Attendance by Shift',
                url: '/Attendance by shift',
                description: 'Attendance by Shift'
            },
            {
                menu_code: 'document',
                sub_menu_code: 'employee-contracts',
                name: 'Employee Contracts',
                url: '/employee-contracts',
                description: 'Employee Contracts'
            },
            {
                menu_code: 'document',
                sub_menu_code: 'policy-documents',
                name: 'Policy Documents',
                url: '/policy-documents',
                description: 'Policy Documents'
            },
            {
                menu_code: 'document',
                sub_menu_code: 'hr-forms',
                name: 'HR Forms',
                url: '/hr-forms',
                description: 'HR Forms'
            },
            {
                menu_code: 'document',
                sub_menu_code: 'upload-document',
                name: 'Upload Document',
                url: '/upload-document',
                description: 'Upload Document'
            },
            {
                menu_code: 'document',
                sub_menu_code: 'document-history',
                name: 'Document History',
                url: '/document-history',
                description: 'Document History'
            },
            {
                menu_code: 'benefits',
                sub_menu_code: 'health-insurance',
                name: 'Health Insurance',
                url: '/health-insurance',
                description: 'Health Insurance'
            },
            {
                menu_code: 'benefits',
                sub_menu_code: 'retirement-plans',
                name: 'Retirement Plans',
                url: '/retirement-plans',
                description: 'Retirement Plans'
            },
            {
                menu_code: 'benefits',
                sub_menu_code: 'employee-discounts',
                name: 'Employee Discounts',
                url: '/employee-discounts',
                description: 'Employee Discounts'
            },
            {
                menu_code: 'benefits',
                sub_menu_code: 'travel-allowance',
                name: 'Travel Allowance',
                url: '/travel-allowance',
                description: 'Travel Allowance'
            },
            {
                menu_code: 'benefits',
                sub_menu_code: 'Benefit-usage-history',
                name: 'Benefit Usage History',
                url: '/Benefit-usage-history',
                description: 'Benefit Usage History'
            },
            {
                menu_code: 'travel',
                sub_menu_code: 'travel-requests',
                name: 'Travel Approvals',
                url: '/travel-requests',
                description: 'Travel Approvals'
            },
            {
                menu_code: 'travel',
                sub_menu_code: 'expense-claims',
                name: 'Expense Claims',
                url: '/expense-claims',
                description: 'Expense Claims'
            },
            {
                menu_code: 'travel',
                sub_menu_code: 'travel-history',
                name: 'Travel History',
                url: '/travel-history',
                description: 'Travel History'
            },
            {
                menu_code: 'travel',
                sub_menu_code: 'travel-policies',
                name: 'Travel Policies',
                url: '/travel-policies',
                description: 'Travel Policies'
            },
            {
                menu_code: 'reports',
                sub_menu_code: 'attendance-reports2',
                name: 'Attendance Reports',
                url: '/attendance-reports2',
                description: 'Attendance Reports'
            },
            {
                menu_code: 'reports',
                sub_menu_code: 'leave-reports',
                name: 'Leave Reports',
                url: '/leave-reports',
                description: 'Leave Reports'
            },
            {
                menu_code: 'reports',
                sub_menu_code: 'payroll-reports2',
                name: 'Payroll Reports',
                url: '/payroll-reports2',
                description: 'Payroll Reports'
            },
            {
                menu_code: 'reports',
                sub_menu_code: 'employee-turnover',
                name: 'Employee Turnover',
                url: '/employee-turnover',
                description: 'Employee Turnover'
            },
            {
                menu_code: 'reports',
                sub_menu_code: 'custom-reports',
                name: 'Custom Reports',
                url: '/custom-reports',
                description: 'Custom Reports'
            },
            {
                menu_code: 'self-service',
                sub_menu_code: 'profile-update',
                name: 'Profile Update',
                url: '/profile-update',
                description: 'Profile Update'
            },
            {
                menu_code: 'self-service',
                sub_menu_code: 'Leave-request',
                name: 'Leave Request',
                url: '/Leave-request',
                description: 'Leave Request'
            },
            {
                menu_code: 'self-service',
                sub_menu_code: 'view-payslip',
                name: 'View Payslip',
                url: '/view-payslip',
                description: 'View Payslip'
            },
            {
                menu_code: 'self-service',
                sub_menu_code: 'view-attendance',
                name: 'View Attendance',
                url: '/view-attendance',
                description: 'View Attendance'
            },
            {
                menu_code: 'self-service',
                sub_menu_code: 'Regulatory Compliance',
                name: 'Download Documents',
                url: '/download-documents',
                description: 'Download Documents'
            },
            {
                menu_code: 'compliance',
                sub_menu_code: 'regulatory-compliance',
                name: 'Regulatory Compliance',
                url: '/regulatory-compliance',
                description: 'Regulatory Compliance'
            },
            {
                menu_code: 'compliance',
                sub_menu_code: 'disciplinary-actions',
                name: 'Disciplinary Actions',
                url: '/disciplinary-actions',
                description: 'Disciplinary Actions'
            },
            {
                menu_code: 'compliance',
                sub_menu_code: 'legal-documents',
                name: 'Legal Documents',
                url: '/legal-documents',
                description: 'Legal Documents'
            },
            {
                menu_code: 'compliance',
                sub_menu_code: 'audit-logs',
                name: 'Audit Logs',
                url: '/audit-logs',
                description: 'Audit Logs'
            },
            {
                menu_code: 'compliance',
                sub_menu_code: 'compliance-reports',
                name: 'Compliance Reports',
                url: '/compliance-reports',
                description: 'Compliance Reports'
            }
        ]
    });


}

module.exports =  SubMenuSeeder;