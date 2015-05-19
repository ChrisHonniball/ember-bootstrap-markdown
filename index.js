/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-bootstrap-markdown',
  
  included: function(app) {
    this._super.included(app);
    
    // Import the javascript.
    app.import(app.bowerDirectory + '/markdown/lib/markdown.js');
    app.import(app.bowerDirectory + '/to-markdown/dist/to-markdown.js');
  }
};
