module.exports = {
  description: ''

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    var that = this;
 
    return this.addBowerPackageToProject('markdown').then(function() {
        return that.addBowerPackageToProject('to-markdown');
    });
  }
};
