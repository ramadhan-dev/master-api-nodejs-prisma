// src/helper/checkAttrCodeHelper.js
async function checkAttrCode(req, res, tenantService, companyService, divisionService) {
    const data = req.body;

    // Periksa apakah tenant ada
    const tenant = await tenantService.checkTenantExists(data.tenant_code);
    if (!tenant) {
         return {
            status: false,
             message: 'Invalid Tenant Code'
         }
    }

    // Periksa apakah company ada
    const company = await companyService.checkCompanyExists(data.company_code);
    if (!company) {
        return {
            status: false,
            message: 'Invalid Company Code'
        }
        
    }

    // Periksa apakah division ada
    const division = await divisionService.checkDivisionExists(data.division_code);
    if (!division) {
        return {
            status: false,
            message: 'Invalid Division Code'
        }
        
    }

    return {
        status: true
    }
}

module.exports = { checkAttrCode };
