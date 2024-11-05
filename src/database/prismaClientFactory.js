const { PrismaClient } = require('@prisma/client');
require(process.cwd() + '/src/database/prismaClientFactory');
const { PrismaClient: PrismaClientDb1 } = require('./../../prisma/generated/database1');
const { PrismaClient: PrismaClientDb2 } = require('./../../prisma/generated/database2');
const { PrismaClient: PrismaClientTesting } = require('../../prisma/generated/databaseTesting');
const logger = require(process.cwd() + '/src/utility/logger');

const dbConfig = require('../config/dbConfig');
const redis = require('redis');
let redisClient; // Mendefinisikan Redis client secara global

class PrismaClientFactory {

    // Fungsi untuk menambahkan middleware logging
    static addPrismaLoggingMiddleware(prisma) {
        prisma.$on('query', (e) => {
            const logMessage = {
                sql: e.query,
                params: e.params,
                duration: e.duration,
                timestamp: new Date().toISOString(),
            };
            logger.info(JSON.stringify(logMessage));
        });
    }


    static createInstanceDB1(env = 'default') {
        const config = dbConfig[env] || dbConfig.default;
        const connection1 =  new PrismaClientDb1(config);
        this.addPrismaLoggingMiddleware(connection1);
        return connection1

    }

    static createInstanceDB2(env = 'default') {
        const config = dbConfig[env] || dbConfig.default;
        const connection2 = new PrismaClientDb2(config);
        this.addPrismaLoggingMiddleware(connection2);
        return connection2
    }


    static createInstanceTesting(env = 'testing') {
        const config = dbConfig[env] || dbConfig.default;
        const connectionTesting = new PrismaClientTesting(config);
        return connectionTesting
    }


    static createRedisClient() {
        if (!redisClient) {
            redisClient = redis.createClient({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            });

            redisClient.on('error', (err) => console.error('Redis Error:', err));

            redisClient.on('connect', () => {
                console.log('Connected to Redis');
            });
        }
        return redisClient;
    }

    


    
}

module.exports = PrismaClientFactory;
