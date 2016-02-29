'use strict';

var fs = require('fs');
var _  = require('lodash');

module.exports = function(grunt) {
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: {
        src: '<%= applicationJavaScriptFiles %>',
        options: {
          jshintrc: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: '<%= applicationCSSFiles %>'
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'app/dist/application.min.js': 'app/dist/application.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/dist/application.min.css': '<%= applicationCSSFiles %>'
        }
      }
    },
    nodemon: {
      dev: {
        script: './api/server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html'
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    ngAnnotate: {
      production: {
        files: {
          'app/dist/application.js': '<%= applicationJavaScriptFiles %>'
        }
      }
    },
    concurrent: {
      default: ['nodemon'],
      debug: ['nodemon', 'node-inspector'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    },
    env: {
      development:{
        NODE_ENV: 'development'
      },
      production:{
        NODE_ENV: 'production'
      },
      test: {
        NODE_ENV: 'test'
      },
      secure: {
        NODE_ENV: 'secure'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    copy: {
        localConfig: {
              src: 'config/env/local.example.js',
              dest: 'config/env/local.js',
              filter: function() {
                return !fs.existsSync('config/env/local.js');
              }
        }
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // A Task for loading the configuration object
  grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
    var init = require('./config/init')();
    var config = require('./config/config');

    grunt.config.set('applicationJavaScriptFiles', _.union(config.assets.lib.js,config.assets.js));
    grunt.config.set('applicationCSSFiles', _.union(config.assets.lib.css,config.assets.css));
  });

  // Default task(s).
  grunt.registerTask('default', ['copy:localConfig', 'concurrent:default']);

  // Debug task.
  grunt.registerTask('debug', ['copy:localConfig', 'concurrent:debug']);

  // Secure task(s).
  grunt.registerTask('secure', ['env:secure', 'copy:localConfig', 'concurrent:default']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint']);

  // Build task(s).
  grunt.registerTask('build', ['env:production','lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']);

  // Test task.
  grunt.registerTask('test', ['copy:localConfig', 'test:server', 'test:client']);
  grunt.registerTask('test:server', ['env:test', 'mochaTest']);
  grunt.registerTask('test:client', ['env:test', 'karma:unit']);
};
