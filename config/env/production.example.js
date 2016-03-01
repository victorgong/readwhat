'use strict';

var	StoreInMongo = require('sails-mongo');
module.exports = {
  db: {
    waterline: {
      options: {
        adapters: {
          disk: StoreInMongo
        },
        connections: {
          simple: {
                 adapter: 'disk',
                 url: 'mongodb://root:victoria_123@dds-bp152222eb7d5ef42.mongodb.rds.aliyuncs.com:3717,dds-bp152222eb7d5ef41.mongodb.rds.aliyuncs.com:3717/booksdb?replicaSet=mgset-768527&authSource=admin'
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
    enabled: false,
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //console: '*',
      stream: 'access.log'
    }
  },
  assets: {
    lib: {
      css: [
        'app/bower_components/bootstrap/dist/css/bootstrap.min.css'
      ],
      js: [
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/jquery-bridget/jquery-bridget.js',
        'app/bower_components/get-size/get-size.js',
        'app/bower_components/ev-emitter/ev-emitter.js',
        'app/bower_components/desandro-matches-selector/matches-selector.js',
        'app/bower_components/fizzy-ui-utils/utils.js',
        'app/bower_components/outlayer/item.js',
        'app/bower_components/outlayer/outlayer.js',
        'app/bower_components/masonry/masonry.js',
        'app/bower_components/imagesloaded/imagesloaded.js',
        'app/bower_components/angular-masonry/angular-masonry.js'
      ]
    },
    css: [
      'app/css/app.css'
    ],
    js: [
      'app/js/*.js'
    ]
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
    clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
    callbackURL: '/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || 'APP_ID',
    clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
    callbackURL: '/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: '/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: '/auth/github/callback'
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
