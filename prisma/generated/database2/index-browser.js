
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.21.1
 * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
 */
Prisma.prismaVersion = {
  client: "5.21.1",
  engine: "bf0e5e8a04cada8225617067eaa03d041e2bba36"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TenantScalarFieldEnum = {
  id: 'id',
  tenant_code: 'tenant_code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  company_code: 'company_code',
  name: 'name',
  tenant_code: 'tenant_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DivisionScalarFieldEnum = {
  id: 'id',
  division_code: 'division_code',
  name: 'name',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  user_code: 'user_code',
  email: 'email',
  name: 'name',
  password: 'password',
  status: 'status',
  tenant_code: 'tenant_code',
  company_code: 'company_code',
  division_code: 'division_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserCompanyHistoryScalarFieldEnum = {
  id: 'id',
  user_code: 'user_code',
  company_code: 'company_code',
  division_code: 'division_code',
  tenant_code: 'tenant_code',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.UserDivisionHistoryScalarFieldEnum = {
  id: 'id',
  user_code: 'user_code',
  division_code: 'division_code',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.AttendanceLocationScalarFieldEnum = {
  id: 'id',
  company_code: 'company_code',
  attendance_location_code: 'attendance_location_code',
  tenant_code: 'tenant_code',
  name: 'name',
  lat: 'lat',
  lng: 'lng',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserAttendanceLocationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  user_attendance_loaction_code: 'user_attendance_loaction_code',
  user_code: 'user_code',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  attendance_location_code: 'attendance_location_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserAttendanceScalarFieldEnum = {
  id: 'id',
  status: 'status',
  clockInLat: 'clockInLat',
  clockInLng: 'clockInLng',
  clockOutLat: 'clockOutLat',
  clockOutLng: 'clockOutLng',
  clockIn: 'clockIn',
  clockOut: 'clockOut',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  user_code: 'user_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShiftTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  startTime: 'startTime',
  endTime: 'endTime',
  company_code: 'company_code',
  shift_code: 'shift_code',
  tenant_code: 'tenant_code'
};

exports.Prisma.UserShiftScalarFieldEnum = {
  id: 'id',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  user_code: 'user_code',
  shift_code: 'shift_code',
  date: 'date'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  role_code: 'role_code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  id: 'id',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  user_code: 'user_code',
  role_code: 'role_code',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterMenuScalarFieldEnum = {
  id: 'id',
  menu_code: 'menu_code',
  name: 'name',
  url: 'url',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterSubMenuScalarFieldEnum = {
  id: 'id',
  sub_menu_code: 'sub_menu_code',
  menu_code: 'menu_code',
  name: 'name',
  url: 'url',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterMenuActionScalarFieldEnum = {
  id: 'id',
  sub_menu_code: 'sub_menu_code',
  menu_code: 'menu_code',
  action_code: 'action_code',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyMenuScalarFieldEnum = {
  id: 'id',
  menu_code: 'menu_code',
  tenant_code: 'tenant_code',
  company_code: 'company_code',
  sub_menu_code: 'sub_menu_code'
};

exports.Prisma.UserMenuScalarFieldEnum = {
  id: 'id',
  menu_code: 'menu_code',
  sub_menu_code: 'sub_menu_code',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  user_code: 'user_code',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserMenuActionScalarFieldEnum = {
  id: 'id',
  sub_menu_code: 'sub_menu_code',
  action_code: 'action_code',
  company_code: 'company_code',
  tenant_code: 'tenant_code',
  division_code: 'division_code',
  user_code: 'user_code',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.EmployeeStatus = exports.$Enums.EmployeeStatus = {
  Active: 'Active',
  Inactive: 'Inactive'
};

exports.Prisma.ModelName = {
  Tenant: 'Tenant',
  Company: 'Company',
  Division: 'Division',
  User: 'User',
  UserCompanyHistory: 'UserCompanyHistory',
  UserDivisionHistory: 'UserDivisionHistory',
  AttendanceLocation: 'AttendanceLocation',
  UserAttendanceLocation: 'UserAttendanceLocation',
  UserAttendance: 'UserAttendance',
  ShiftType: 'ShiftType',
  UserShift: 'UserShift',
  Role: 'Role',
  UserRole: 'UserRole',
  MasterMenu: 'MasterMenu',
  MasterSubMenu: 'MasterSubMenu',
  MasterMenuAction: 'MasterMenuAction',
  CompanyMenu: 'CompanyMenu',
  UserMenu: 'UserMenu',
  UserMenuAction: 'UserMenuAction'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
