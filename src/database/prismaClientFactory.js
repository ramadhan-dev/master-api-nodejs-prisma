const { PrismaClient } = require('@prisma/client');
const { PrismaClient: PrismaClientDb1 } = require('../../prisma/generated/database1');
const { PrismaClient: PrismaClientDb2 } = require('../../prisma/generated/database2');

const dbConfig = require('../config/dbConfig');

class PrismaClientFactory {
    static createInstanceDB1(env = 'default') {
        const config = dbConfig[env] || dbConfig.default;
        return new PrismaClientDb1(config);
    }

    static createInstanceDB2(env = 'default') {
        const config = dbConfig[env] || dbConfig.default;
        return new PrismaClientDb2(config);
    }
}

module.exports = PrismaClientFactory;
