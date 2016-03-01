'use strict';

module.exports = {
  app: {
    title: '什么值得看 -- 每周十本书',
    description: '十本书',
    keywords: '本周看什么'
  },
  port: process.env.PORT || 3000,

  // The secret should be set to a non-guessable string that
  // is used to compute a session hash
  sessionSecret: 'HAPI',
  // The name of the MongoDB collection to store sessions in
  sessionCollection: 'sessions',
  // The session cookie settings
  sessionCookie: {
    path: '/',
    httpOnly: true,
    // If secure is set to true then it will cause the cookie to be set
    // only when SSL-enabled (HTTPS) is used, and otherwise it won't
    // set a cookie. 'true' is recommended yet it requires the above
    // mentioned pre-requisite.
    secure: false,
    // Only set the maxAge to null if the cookie shouldn't be expired
    // at all. The cookie will expunge when the browser is closed.
    maxAge: null,
    // To set the cookie in a specific domain uncomment the following
    // setting:
    // domain: 'yourdomain.com'
  },
  // The session cookie name
  sessionName: 'rw_',
  cron: {},
  log: {
    enabled: true,
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      console: '*',
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
  }
};
