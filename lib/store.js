'use strict';

var Waterline = require('waterline');
var Conf = require('../config/waterline')();
module.exports = function(done) {
  var waterline= new Waterline();
  Conf.options.models.forEach(function(model){
	waterline.loadCollection(Waterline.Collection.extend(model));
  });
  waterline.initialize({
        connections: Conf.options.connections,
        adapters: Conf.options.adapters,
        defaults: Conf.options.defaults
    },function waterlineReady (err, ontology) {
      if (err) throw err;
      done(waterline);
    }
  );
};
