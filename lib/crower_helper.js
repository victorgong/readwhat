'use strict';

var _ = require('lodash');
var EventEmitter = require('events');

module.exports = function(paral,option_cb){
  var parals = paral || 1;
  var currentIndex = -1;
  var myEvent = new EventEmitter();
  var eventName = 'start';
  return new CrowerHelper(parals,option_cb);
};

var CrowerHelper = function(paral,option_cb){
  this.parals = paral || 1;
  this.currentIndex = -1;
  this.myEvent = new EventEmitter();
  this.eventName = 'start';
  this.cb = option_cb;

};
CrowerHelper.prototype.run = function (data) {
  var _this = this;
  this.myEvent.on(this.eventName,function(){
    if (data.length>_this.currentIndex+1) {
        _this.currentIndex+=1;
      //	execFunc(eventName);
        var item = data[_this.currentIndex];
        var options = _this.cb(item);
        options = _.extend(options,{
            cb: function(){
                _this.myEvent.emit(_this.eventName);
            }
          });

        require('../lib/crower')(options);
    }
  });
  for(var i=0;i<this.parals;i++ ) {
    this.myEvent.emit(this.eventName);
  }
};
