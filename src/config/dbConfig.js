const dbConfig = {
    default: {
        log: ['query', 'info', 'warn', 'error'],
    },
    production: {
        log: ['error'],
    },
};

module.exports = dbConfig;