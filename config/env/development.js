'use strict';

var	StoreInDisk = require('sails-disk');
module.exports = {
  db: {
    waterline: {
      options: {
        adapters: {
          disk: StoreInDisk
        },
        connections: {
          simple: {
                 adapter: 'disk'
          }
        }
      }
    },
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT ||  6379,
      database: process.env.REDIS_DB || '',
      password: process.env.REDIS_PASSWORD || '',
      partition: process.env.REDIS_PARTITION || ''
    }
  },
  log: {
    enabled: true,
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      console: '*',
      stream: 'access.log'
    }
  },
  app: {
    title: '什么值得看 -- 每周十本书'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
