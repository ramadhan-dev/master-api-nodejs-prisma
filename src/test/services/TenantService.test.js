const TenantService = require('../../modules/master/tenant/services/TenantService');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prisma = PrismaClientFactory.createInstanceTesting();

const tenantService = new TenantService(prisma);
const defaultGetAllData = [
    { tenant_code: 'T001', name: 'Tenant 1' },
    { tenant_code: 'T002', name: 'Tenant 2' },
]




describe('TenantService', () => {

    beforeEach(async () => {
        await prisma.tenant.createMany({
            data: defaultGetAllData,
        });
    });


    /**
     * 
     */
    afterEach(async () => {
        await prisma.tenant.deleteMany({});
        // Rollback semua perubahan dengan membatalkan transaksi
        await prisma.$disconnect();
    });



    afterAll(async () => {
        await prisma.$disconnect();
    });



    it('should fetch all tenants', async () => {
        const result = await tenantService.getAllTenants(1, 10, '', 'asc', 'name');
        const transformedData = {
            ...result,
            data: result.data.map(({ id, createdAt, updatedAt, ...rest }) => rest)
        };
        expect(transformedData).toEqual({
            data: defaultGetAllData, meta: {
                totalItems: 2,
                totalPages: 1,
                currentPage: 1,
                pageSize: 10,
            },
        });
    });


    it('should fetch a tenant by ID', async () => {

        const result = await tenantService.getTenantById('T001');

        const {createdAt, updatedAt, id, ...response} = result 

        expect(response).toEqual({ tenant_code: 'T001', name: 'Tenant 1' });
    });



    it('should create a new tenant', async () => {
        const newTenant = { tenant_code: 'T003', name: 'Tenant 3' };

        const result = await tenantService.createTenant(newTenant);
        const { createdAt, updatedAt, id, ...response } = result 


        expect(response).toEqual(newTenant);
    });

    it('should update a tenant', async () => {
        const updatedTenant = { tenant_code: 'T003', name: 'Updated Tenant 1' };

        const result = await tenantService.updateTenant('T001', updatedTenant);
        const { createdAt, updatedAt, id, ...response } = result 

        expect(response).toEqual(updatedTenant);
    });

    it('should delete a tenant', async () => {
        const deletedTenant = { tenant_code: 'T002', name: 'Tenant 2' };
        const result = await tenantService.deleteTenant('T002');
        const { createdAt, updatedAt, id, ...response } = result 

        expect(response).toEqual(deletedTenant);
    });
});
