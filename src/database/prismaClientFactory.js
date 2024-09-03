const { PrismaClient } = require('@prisma/client');
const { PrismaClient: PrismaClientDb1 } = require('../../prisma/generated/database1');
const { PrismaClient: PrismaClientDb2 } = require('../../prisma/generated/database2');
const logger = require(process.cwd() + '/src/utility/logger');

const dbConfig = require('../config/dbConfig');

class PrismaClientFactory {
    static createInstanceDB1(env = 'default') {

        function addPrismaLoggingMiddleware(prisma) {

            prisma.$on('query', (e) => {
                const logMessage = {
                    sql: e.query,          // SQL query yang dieksekusi
                    params: e.params,      // Parameter yang digunakan dalam query
                    duration: e.duration,  // Durasi eksekusi query
                    timestamp: new Date().toISOString(), // Timestamp
                };
                logger.info(JSON.stringify(logMessage));
            });
        }

        const config = dbConfig[env] || dbConfig.default;
        const connection1 =  new PrismaClientDb1(config);
        addPrismaLoggingMiddleware(connection1);
        return connection1

    }

    static createInstanceDB2(env = 'default') {
        function addPrismaLoggingMiddleware(prisma) {
            prisma.$on('query', (e) => {
                const logMessage = {
                    sql: e.query,          // SQL query yang dieksekusi
                    params: e.params,      // Parameter yang digunakan dalam query
                    duration: e.duration,  // Durasi eksekusi query
                    timestamp: new Date().toISOString(), // Timestamp
                };
                logger.info(JSON.stringify(logMessage));
            });
        }
        const config = dbConfig[env] || dbConfig.default;
        const connection2 = new PrismaClientDb2(config);
        addPrismaLoggingMiddleware(connection2);
        return connection2
    }



    


    
}

module.exports = PrismaClientFactory;
