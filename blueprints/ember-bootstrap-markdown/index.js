module.exports = {
  description: '',
  
  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
    var that = this;
    
    return that.addBowerPackagesToProject([
      { name: 'marked' },
      { name: 'bootbox' }
    ]);
  }
};
