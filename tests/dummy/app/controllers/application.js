import Ember from 'ember';

export default Ember.Controller.extend({
  test: "# You can edit this content\n\nSimply click on it to begin editing.\n\n> [Google](https://google.com)",
  
  actions: {
    save: function() {
      /* */
      console.log(
        "%c%s#save...",
        "color: purple", // http://www.w3schools.com/html/html_colornames.asp
        this.toString()
      );
      //*/
    }
  }
});
