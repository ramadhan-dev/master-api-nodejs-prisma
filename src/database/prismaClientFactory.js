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
                console.log("🚀 ~ PrismaClientFactory ~ prisma.$on ~ logMessage:", logMessage)

                // Log the query
                logger.info(JSON.stringify(logMessage));
            });
            // prisma.$use(async (params, next) => {
            //     const before = Date.now();

            //     const result = await next(params);

            //     const after = Date.now();
            //     const duration = after - before;
            //     const query = `${params.model}.${params.action}(${JSON.stringify(params.args)})`;
            //     console.log("🚀 ~ PrismaClientFactory ~ prisma.$use ~ params:", query)

            //     const logMessage = {
            //         query,
            //         params,
            //         duration,
            //         timestamp: new Date().toISOString(),
            //     };

            //     logger.info(JSON.stringify(logMessage));

            //     return result;
            // });
        }

        const config = dbConfig[env] || dbConfig.default;
        const connection1 =  new PrismaClientDb1(config);
        addPrismaLoggingMiddleware(connection1);
        return connection1

    }

    static createInstanceDB2(env = 'default') {
        function addPrismaLoggingMiddleware(prisma) {
            prisma.$use(async (params, next) => {
                const before = Date.now();

                const result = await next(params);

                const after = Date.now();
                const duration = after - before;

                const logMessage = {
                    query: params,
                    duration,
                    timestamp: new Date().toISOString(),
                };

                // Log the query
                logger.info(logMessage);

                return result;
            });
        }
        const config = dbConfig[env] || dbConfig.default;
        const connection2 = new PrismaClientDb2(config);
        addPrismaLoggingMiddleware(connection2);
        return connection2
    }

    


    
}

module.exports = PrismaClientFactory;
