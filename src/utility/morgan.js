'use strict';

var morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { getFormattedDate } = require('./../helper/helper');

// Ensure logs directory exists
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logPath = 'logs/morgan';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logPath);
}
// Create a write stream (in append mode) for Morgan logs
const fileName = `access_${getFormattedDate()}.log`;
const accessLogStream = fs.createWriteStream(path.join(logDir, fileName), { flags: 'a' });


/**
 * get Conversation-Id
 */
morgan.token('conversation-id', function getConversationId(req) {
    return req.conversationId;
});

/**
 * get Session-Id
 */
morgan.token('session-id', function getSessionId(req) {
    return req.sessionId;
});

/**
 * get Instance-Id
 */
morgan.token('instance-id', function getInstanceId(req) {
    return req.instanceId;
});

/**
 * get Hostname
 */
morgan.token('hostname', function getHostname() {
    return os.hostname();
});


/**
 * get PID
 */
morgan.token('pid', function getPid() {
    return process.pid;
});


/**
 * get response time 
 */
morgan.token('response-time-seconds', function getResponseTimeInSeconds(req, res) {
    return Math.ceil(this['response-time'](req, res))
})


/**
 * get payload
 */
morgan.token('payload', function getResponseTimeInSeconds(req, res) {
    return req.body
})


/**
 * get payload
 */
morgan.token('response-body', function getResponseTimeInSeconds(req, res) {
    if (res.locals.responseBody) {
        try {
            // Attempt to format response body as pretty JSON
            return JSON.parse(res.locals.responseBody);
        } catch (err) {
            // If response body is not JSON, return as is
            return res.locals.responseBody;
        }
    } else {
        return 'N/A';
    }
})

/**
 * 
 * @param {*} tokens 
 * @param {*} req 
 * @param {*} res 
 * @returns JSON
 * @description Cutom format LOG
 */
function jsonFormat(tokens, req, res) {
    return JSON.stringify({
        'remote-address': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
        'http-version': tokens['http-version'](req, res),
        'status-code': tokens['status'](req, res),
        'content-length': tokens['res'](req, res, 'content-length'),
        'referrer': tokens['referrer'](req, res),
        'user-agent': tokens['user-agent'](req, res),
        'conversation-id': tokens['conversation-id'](req, res),
        'session-id': tokens['session-id'](req, res),
        'hostname': tokens['hostname'](req, res),
        'instance': tokens['instance-id'](req, res),
        'pid': tokens['pid'](req, res),
        'response-time-seconds': tokens['response-time-seconds'](req, res),
        'payload': tokens['payload'](req, res),
        'response-body': tokens['response-body'](req, res) || 'N/A', // Add response body to log
    });
}



const morganMiddleware = morgan(jsonFormat, { stream: accessLogStream });



// Export logger and middleware
module.exports = {
    morganMiddleware
};