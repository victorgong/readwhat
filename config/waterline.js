'use strict';

var  Config     = require('./config'),
  _ = require('lodash'),
	Path       = require('path');
module.exports = function(){
	var models = [];
	Config.getGlobbedFiles('./api/models/**/*.js').forEach(function (modelPath) {
		models.push(require(Path.resolve(modelPath)));
	  });
	var waterline = {
			options: {
				models: models,
        defaults: {
          migrate: 'safe'
        }
			}
		};
  waterline =_.merge(Config.db.waterline,waterline);
	return waterline;
};
