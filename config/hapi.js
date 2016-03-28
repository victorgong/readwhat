'use strict';

/**
 * Module dependencies.
 */
var Fs         = require('fs'),
    Https      = require('https'),
    Hapi       = require('hapi'),
    Logger     = require('./logger'),
    Config     = require('./config'),
    Path       = require('path'),
	Dogwater   = require('dogwater'),

	waterline = require('./waterline.js'),
	_      = require('lodash');

module.exports = function () {

  var serverOptions = {

    connections: {
      router: {
        stripTrailingSlash: true
      }
    }
  };

  // Initialize hapi app
  var server = new Hapi.Server(serverOptions);


  server.connection({port: Config.port,address:'127.0.0.1'});

  // Setup global variables
  server.app.sessionName = Config.sessionName;
  server.state('session', {
    strictHeader:false
  });


  var plugins = [
    { register: require('bell') },
    { register: require('inert') },
    { register: require('vision') },
    {register: require('hapi-prerender')},
	_.extend({
      register: Dogwater},waterline())
  ];

  if (Config.log.enabled) {
    plugins.push({
      register: require('good'),
      options: {
        reporters: Logger.getLogReporters()
      }
    });
  }

  // Register plugins
  server.register(plugins, function (err) {
    if (err) {
      console.error(err);
    }
    server.views({
       engines: {
         'server.view.html': require('swig')
       },
       path: './api/views',
       isCached: process.env.NODE_ENV !== 'development',
       context: {
         title: Config.app.title,
         description: Config.app.description,
         keywords: Config.app.keywords,
         jsFiles: Config.getJavaScriptAssets(),
         cssFiles: Config.getCSSAssets()
       }
     });
    // Setting the app router and static folder
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          path: Path.resolve('./app'),
          listing: false,
          index: true
        }
      }
    });


    // Globbing routing files

    Config.getGlobbedFiles('./api/routes/**/*.js').forEach(function (routePath) {
      require(Path.resolve(routePath))(server);
    });

    // Hande 404 errors
    server.ext('onPreResponse', function (request, reply) {

      if (request.response.isBoom) {
        if(request.response.output.statusCode === 404)
          return reply('not found');
      }
      return reply.continue();
    });
	server.emit('pluginsLoaded');
  });
  // Return Hapi server instance
  return server;
};
