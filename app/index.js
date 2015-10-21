var Generator = require('yeoman-generator');

module.export = Generator.Base.extend({
  constructor: function() {

  },

  method1: function() {
    console.log('method1 just ran');
  },

  method1: function() {
    console.log('method2 just ran');
  }
});
