/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-bootstrap-markdown',
  
  included: function(app) {
    this._super.included(app);
    
    // Import the javascript.
    app.import(app.bowerDirectory + '/marked/marked.min.js');
    app.import(app.bowerDirectory + '/bootbox/bootbox.js');
  },
  
  isDevelopingAddon: function() {
    return true;
  }
};
