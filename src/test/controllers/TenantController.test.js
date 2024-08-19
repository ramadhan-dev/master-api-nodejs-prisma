const TenantController = require('../../modules/master/tenant/controllers/TenantController');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const prisma = PrismaClientFactory.createInstanceTesting();
const TenantService = require('../../modules/master/tenant/services/TenantService');
const formatResponse = require('../../utility/responseFormatter');
const httpMocks = require('node-mocks-http');

const tenantService = new TenantService(prisma);
const tenantController = new TenantController(tenantService, formatResponse);

const defaultGetAllData = [
    { tenant_code: 'T005', name: 'Tenant 1' },
    { tenant_code: 'T006', name: 'Tenant 2' },
]




describe('TenantController', () => {
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

    describe('getAllTenan', () => {

        it('should mock tenantService methods correctly', () => {
            // Verify that the mocked service has the methods
            expect(tenantController.getAllTenants.bind(tenantController)).toBeDefined();
            expect(tenantController.getTenant.bind(tenantController)).toBeDefined();
            expect(tenantController.createTenant.bind(tenantController)).toBeDefined();
            expect(tenantController.updateTenant.bind(tenantController)).toBeDefined();
            expect(tenantController.deleteTenant.bind(tenantController)).toBeDefined();
            expect(formatResponse).toBeDefined();
            expect(tenantService).toBeDefined();
        });


        /**
         * 
         */
        it('should return all tenants', async () => {
            const req = { query: {} };
            const res = httpMocks.createResponse();
           
            const getAllTenantsSpy = jest.spyOn(tenantController, 'getAllTenants');
            const getAllTenantServicesSpy = jest.spyOn(tenantService, 'getAllTenants');

            await tenantController.getAllTenants(req, res);
            const data = res._getJSONData();

            const transformedData = {
                ...data,
                data: {
                    ...data.data,
                    data: data.data.data.map(item => {
                        const { createdAt, updatedAt, id,  ...sanitizedItem } = item;
                        return sanitizedItem;
                    })
                }
            };

            expect(getAllTenantsSpy).toHaveBeenCalled();
            expect(getAllTenantsSpy).toHaveBeenCalledTimes(1);

            expect(getAllTenantServicesSpy).toHaveBeenCalled();
            expect(getAllTenantServicesSpy).toHaveBeenCalledTimes(1)

            const expectedResult = {
                "status":200,
                "message": 'Success',
                "data": {
                    "data": defaultGetAllData,
                    "meta": {
                        "totalItems": 2,
                        "totalPages": 1,
                        "currentPage": 1,
                        "pageSize": 10
                    }
                }
            }

            expect(transformedData).toEqual(expectedResult);
        });
        
    });
});
